import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";
import styles from "./main.module.css";

export default function Main() {
  const [docs, setDocs] = useState([]);
  const { email, accessToken, displayName } = auth?.currentUser;

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
          console.log("set token");
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

  console.log(docs);

  return (
    <div>
      <div className={styles.grid}>
        {docs.length > 2 && docs.map((doc, index) => 
          <div key={doc._id} className={styles.doc}>
            <h3>{doc.title}</h3>
            <h3>{doc.description}</h3>
            <div>문서: {doc.contents}</div>
            <div className={styles["right-section"]}>
              <div className={styles["right-bottom"]}>
                <div className={styles["name-container"]}>{doc.createdBy}</div>
                <Link to={`/docs/${doc._id}`} className={styles["edit-button"]}>Edit</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
