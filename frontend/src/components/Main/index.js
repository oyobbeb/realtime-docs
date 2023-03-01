import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import { auth } from "../../features/api/firebaseApi";
import styles from "./main.module.css";

export default function Main() {
  const [docs, setDocs] = useState([]);
  const [currentEditingUsers, setCurrentEditingUsers] = useState({});
  const [userArray, setUserArray] = useState([]);
  const [socket, setSocket] = useState(null);
  const { displayName, accessToken, email, uid, photoURL } =
    auth?.currentUser || {};

  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.emit("edit-users");

    socket?.on("receive-users", (users) => {
      setCurrentEditingUsers(users);
    });
  }, [socket]);

  useEffect(() => {
    async function setJWTTokenAfterLogin() {
      if (!auth.currentUser) return;

      try {
        const response = await fetch("http://localhost:8000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            email,
            accessToken,
            displayName,
            uid,
            photoURL,
          }),
        });

        const data = await response.json();
        localStorage.setItem("jwt", data.token);

        setUserArray(data?.allUsers);
      } catch (err) {
        alert("User is not authorized");
        console.error(err);
      }
    }

    setJWTTokenAfterLogin();
  }, [accessToken, displayName, email, photoURL, uid]);

  useEffect(() => {
    async function getAllDocuments() {
      try {
        const response = await fetch("http://localhost:8000/", {
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        });

        const data = await response.json();

        data && setDocs(data.docs);
      } catch (err) {
        alert(
          "Sorry, we couldn't load your documents at this time. Please try again later."
        );
        console.error(err);
      }
    }

    getAllDocuments();
  }, []);

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
            <div className={styles.description}>{doc.description}</div>
            <div className={styles.contents}>{doc.contents}</div>
            <div>
              {doc._id &&
                Object.entries(currentEditingUsers)
                  .filter(([key, value]) => key === doc._id)
                  .map(([key, value]) => (
                    <div key={key} className={styles.bottom}>
                      Now editing:
                      {value.users.map((user) => {
                        const currentUser = userArray.find(
                          (u) => u.uid === user
                        );
                        return (
                          currentUser && (
                            <img
                              key={currentUser.uid}
                              src={currentUser.photoURL}
                              alt={currentUser.name}
                              className={styles["user-avatar"]}
                            />
                          )
                        );
                      })}
                    </div>
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
