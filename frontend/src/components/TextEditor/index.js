import React, { useEffect, useState } from "react";
import styles from "./texteditor.module.css";
import { io } from "socket.io-client";
import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";

export default function TextEditor({
  contentsValue,
  setContentsValue,
  setUpdateContents,
  setPhoto,
}) {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });
  const { id } = useParams();
  const photo = auth?.currentUser?.photoURL;
  const user = auth?.currentUser?.uid;

  useEffect(() => {
    const s = io("http://localhost:3001", {
      query: { id, user },
    });
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [id, user]);

  socket?.emit("current-edit", photo);

  useEffect(() => {
    socket?.emit("current-edit", photo);

    socket?.on("receive-photo", (photo) => {
      if (setPhoto) {
        setPhoto(photo);
      }
    });
  }, [photo, setPhoto, socket]);

  useEffect(() => {
    socket?.on("receive-content", (content, top, left) => {
      if (setContentsValue) {
        setContentsValue(content);
      }

      setPosition({ top, left });
    });

    socket?.on("room-full", () => {
      alert("Sorry, the room is full");
      navigate("/");
    });
  }, [navigate, setContentsValue, socket]);

  function handleInput(e) {
    const newContent = e.target.innerHTML;
    const sanitizedValue = DOMPurify.sanitize(newContent);

    const editor = e.target;
    const spansToRemove = editor.querySelectorAll("span");
    spansToRemove.forEach((span) => span.remove());

    if (setUpdateContents) {
      setUpdateContents(sanitizedValue);
    }

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (selection.getRangeAt === 0) return;
    const rect = range?.getBoundingClientRect();
    const top = rect?.top;
    const left = rect?.left;

    socket.emit("edit-content", sanitizedValue, id, top, left);
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
        dangerouslySetInnerHTML={{
          __html:
            position.top > 0
              ? `<span
                  class="${styles.cursor}"
                  style="left: ${position.left}px;
                  top: ${position.top}px;"></span>${
                  (id && contentsValue) || ""
                }`
              : `${(id && contentsValue) || ""}`,
        }}
        className={styles.editor}
      ></div>
    </div>
  );
}
