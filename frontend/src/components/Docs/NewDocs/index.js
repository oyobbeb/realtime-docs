import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextEditor from "../../TextEditor";
import styles from "./newDocs.module.css";

export default function NewDocs() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    content: "",
    description: "",
  });
  const { title, content, description } = data;

  const handleSubmit = useCallback(() => {
    async function verifyToken() {
      const token = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:8000/docs/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (!data.user) {
        alert("No authorization");
        navigate("/auth/signin");
      }
    }

    verifyToken();
  }, [content, navigate, title]);

  function handleInput(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  const handleContentChange = useCallback((newContent) => {
    setData({
      ...data,
      content: newContent,
    });
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles["text-form"]}>
          <input
            className={styles.input}
            value={title}
            placeholder="title"
            name="title"
            onChange={handleInput}
            required
          ></input>
          <input
            className={styles.input}
            value={description}
            placeholder="description"
            onChange={handleInput}
            name="description"
            required
          />
        </div>
        <div className={styles["text-editor"]}>
          <TextEditor onContentChange={handleContentChange} className={styles["text-box"]} />
        </div>
        <div>
          <button className={styles.submit} type="submit">Make New Document</button>
        </div>
      </div>
    </form>
  );
}
