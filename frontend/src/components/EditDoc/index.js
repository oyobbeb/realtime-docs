import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";
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
  const [contents, setContents] = useState("");
  const [photo, setPhoto] = useState("");
  const { title, description } = data;

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    async function handleData() {
      const response = await fetch(`http://localhost:8000/docs/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
      });

      const data = await response.json();

      data.document && setData({
        title: data.document.title,
        description: data.document.description,
      });

      setContents(data?.document?.contents);
    }

    handleData();
  }, [id]);

  useEffect(() => {
    if (!updateContents) {
      setUpdateContents(contents);
    }
  }, [updateContents, contents]);

  const handleSubmit = useCallback(async(e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwt");

      const response = await fetch(`http://localhost:8000/docs/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        mode: "cors",
        body: JSON.stringify({ title, updateContents, description }),
      });

      const data = await response.json();

      console.log(data);
    } catch(err) {
      console.error(err);
    }
  }, [description, id, title, updateContents]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 20000);

    return () => clearInterval(interval);
  }, [handleSubmit]);

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
          <div className={styles.inputs}>
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
          <div className={styles.userlist}>
            <div className={styles.editors}>Now Editing:</div>
            <img className={styles.profile} src={auth?.currentUser?.photoURL} alt="Profile" />
            {photo ? <img className={styles.profile} src={photo} alt="someone" /> : null}
          </div>
        </div>
        <div className={styles["text-editor"]}>
          <TextEditor
            setUpdateContents={setUpdateContents}
            setContentsValue={setContents}
            contentsValue={contents}
            setPhoto={setPhoto}
            className={styles["text-box"]}
          />
          <div>
            <button className={styles.submit} type="submit">Save Document</button>
          </div>
        </div>
      </div>
    </form>
  );
}
