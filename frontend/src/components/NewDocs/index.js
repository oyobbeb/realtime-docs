import React, { useState } from "react";
import { auth } from "../../features/api/firebaseApi";
import TextEditor from "../TextEditor";
import styles from "./newDocs.module.css";

export default function NewDocs() {
  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [contents, setContents] = useState("");
  const { title, description } = data;
  const displayName = auth?.currentUser?.displayName;
  const email = auth?.currentUser?.email;

  async function handleSubmit() {
    const token = localStorage.getItem("jwt");

    const response = await fetch("http://localhost:8000/docs/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, contents, description, displayName, email }),
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
          <TextEditor onContentChange={setContents} className={styles["text-box"]} />
        </div>
        <div>
          <button className={styles.submit} type="submit">Make New Document</button>
        </div>
      </div>
    </form>
  );
}
