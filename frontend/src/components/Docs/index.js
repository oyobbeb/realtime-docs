import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";
import styles from "./mydocs.module.css";

export default function Docs() {
  const [docs, setDocs] = useState([]);
  const email = auth?.currentUser?.email;

  useEffect(() => {
    async function getMyDocs() {
      try {
        const response = await fetch("http://localhost:8000/docs/mydocs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        data && setDocs(data.mydocs);
      } catch(err) {
        alert(err.message);
      }
    }

    getMyDocs();
  }, [email]);

  return (
    <div>
      <div className={styles.grid}>
        {docs.map((doc) =>
          <div key={doc._id} className={styles.doc}>
            <h3>{doc.title}</h3>
            <h4>{doc.description}</h4>
            <div className={styles.contents}>{doc.contents}</div>
            <div className={styles["right-section"]}>
              <div className={styles["right-bottom"]}>
                <div className={styles["name-container"]}>{doc.createdBy}</div>
                <Link to={`/docs/${doc._id}`} className={styles["edit-button"]}>편집</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
