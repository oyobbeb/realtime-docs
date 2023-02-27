import React, { useCallback, useEffect, useState } from "react";
import styles from "./texteditor.module.css"
import { io } from "socket.io-client";

export default function TextEditor() {
  const [content, setContent] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    }
  }, []);

  useEffect(() => {
    socket?.on("receive-content", content => {
      console.log(content);
      setContent(content);
    });
  }, [socket]);

  const handleInput = useCallback((e) => {
    const newContent = e.target.innerHTML;
    setContent((prev) => prev);
    socket.emit("edit-content", newContent);
  }, [socket]);

  return (
    <div>
      <div className={styles["text-header"]}>Text Editor</div>
      <div
        contentEditable={true}
        onInput={handleInput}
        dangerouslySetInnerHTML={{__html: content}}
        className={styles.editor}
      ></div>
    </div>
  );
}
