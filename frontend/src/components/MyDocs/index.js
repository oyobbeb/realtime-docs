import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";
import styles from "./mydocs.module.css";

export default function Docs() {
  const navigate = useNavigate();
  const [docs, setDocs] = useState([]);
  const email = auth?.currentUser?.email;

  useEffect(() => {
    if (!auth.currentUser) {
      alert("User is not authorized");
      return navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    async function getMyDocs() {
      const token = localStorage.getItem("jwt");

      try {
        const response = await fetch("http://localhost:8000/docs/mydocs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        data && setDocs(data.mydocs);
      } catch (err) {
        alert(err.message || "We couldn't loaded your documents");
        console.error(err);
      }
    }

    getMyDocs();
  }, [email]);

  return (
    <div>
      <div className={styles.grid}>
        {docs.map((doc) => (
          <div key={doc._id} className={styles.doc}>
            <div className={styles.title}>
              <h3>{doc.title}</h3>
              <div className={styles["right-top"]}>
                <div className={styles["name-container"]}>{doc.createdBy}</div>
                <Link to={`/docs/${doc._id}`} className={styles["edit-button"]}>
                  편집
                </Link>
              </div>
            </div>
            <div className={styles.contents}>{doc.contents}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
