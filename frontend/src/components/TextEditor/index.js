import React, { useCallback, useEffect, useState } from "react";
import styles from "./texteditor.module.css"
import { io } from "socket.io-client";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";

export default function TextEditor({ contentsValue, setContentsValue, setUpdateContents }) {
  const [content, setContent] = useState("");
  const [socket, setSocket] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const s = io("http://localhost:3001", {
      query: { id }
    });
    setSocket(s);

    return () => {
      s.disconnect();
    }
  }, [id]);

  useEffect(() => {
    socket?.on("receive-content", content => {
      if (setContentsValue) {
        setContentsValue(content);
      }
    });
  }, [setContentsValue, socket]);

  function handleInput(e) {
    const newContent = e.target.innerHTML;
    const selectionStart = e.target.selectionStart;
    const selectionEnd = e.target.selectionEnd;
    const sanitizedValue = DOMPurify.sanitize(newContent);
    setContent((prev) => prev);

    if (setUpdateContents) {
      setUpdateContents(sanitizedValue);
    }

    socket.emit("edit-content", sanitizedValue, id, selectionStart, selectionEnd);
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      document.execCommand("insertLineBreak");
    }
  }

  return (
    <div>
      <div className={styles["text-header"]}>Text Editor</div>
      <div
        contentEditable={true}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{__html: id ? contentsValue : content}}
        className={styles.editor}
      ></div>
    </div>
  );
}
