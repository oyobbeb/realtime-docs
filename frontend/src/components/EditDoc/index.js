import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TextEditor from "../TextEditor";
import styles from "./editDocs.module.css";

export default function EditDocs() {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    description: "",
    contents: "",
  });
  const [updateContents, setUpdateContents] = useState("");
  const { title, description, contents } = data;

  useEffect(() => {
    async function handleData() {
      const response = await fetch(`http://localhost:8000/docs/${id}`, {
        mode: "cors",
      });

      const data = await response.json();

      data.document && setData({
        title: data.document.title,
        description: data.document.description,
        contents: data.document.contents,
      });
    }

    handleData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`http://localhost:8000/docs/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ title, updateContents, description }),
    });

    const data = await response.json();

    console.log(data);
  }

  function handleInput(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.container}>
        <div className={styles["text-form"]}>
          <input
            className={styles.input}
            value={title}
            name="title"
            onChange={handleInput}
            required
          ></input>
          <input
            className={styles.input}
            value={description}
            onChange={handleInput}
            name="description"
            required
          />
        </div>
        <div className={styles["text-editor"]}>
          <TextEditor onContentChange={setUpdateContents} contentsValue={contents} className={styles["text-box"]} />
        </div>
        <div>
          <button className={styles.submit} type="submit">Save Document</button>
        </div>
      </div>
    </form>
  );
}
