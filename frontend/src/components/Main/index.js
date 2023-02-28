import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";
import styles from "./main.module.css";

export default function Main() {
  const [docs, setDocs] = useState([]);
  const email = auth?.currentUser?.email;
  const accessToken = auth?.currentUser?.accessToken;
  const displayName = auth?.currentUser?.displayName;

  useEffect(() => {
    async function setToken() {
      try {
        const response = await fetch("http://localhost:8000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({ email, accessToken, displayName }),
        });

        const data = await response.json();
        localStorage.setItem("jwt", data.token);

        if (data.token) {
          console.log("Token set Successfully");
        }
      } catch(err) {
        alert(err.message);
        console.error(err);
      }
    }

    setToken();
  }, [accessToken, displayName, email]);

  useEffect(() => {
    async function getDocs() {
      try {
        const response = await fetch("http://localhost:8000/", {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        const data = await response.json();

        data && setDocs(data.docs);
      } catch(err) {
        alert(err.message);
      }
    }

    getDocs();
  }, []);

  return (
    <div>
      <div className={styles.grid}>
        {docs.length > 2 && docs.map((doc) =>
          <div key={doc._id} className={styles.doc}>
            <div className={styles.title}>
              <h3>{doc.title}</h3>
              <div className={styles["right-top"]}>
                <div className={styles["name-container"]}>{doc.createdBy}</div>
                <Link to={`/docs/${doc._id}`} className={styles["edit-button"]}>편집</Link>
              </div>
            </div>
            <div className={styles.description}>{doc.description}</div>
            <div className={styles.contents}>{doc.contents}</div>
          </div>
        )}
      </div>
    </div>
  );
}
