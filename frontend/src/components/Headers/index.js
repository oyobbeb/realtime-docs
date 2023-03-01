import React, { useEffect, useState } from "react";
import styles from "./headers.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";

export default function Headers() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const { displayName, email, photoURL } = auth?.currentUser || {};

  useEffect(() => {
    async function getPhotos() {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const photo = await fetch(proxyUrl + photoURL);
      const blob = await photo.blob();
      const urls = URL.createObjectURL(blob);

      setPhoto(urls);
    }

    getPhotos();
  }, [photoURL]);

  function logout() {
    localStorage.removeItem("jwt");
    auth.signOut();
    navigate("/auth/signin");
  }

  return (
    <header className={styles.header}>
      <div className={styles["left-header"]}>
        <Link className={styles.a} to={"/"}>
          Docs
        </Link>
      </div>
      <div className={styles["right-header"]}>
        <div className={styles["header-component"]}>
          {auth.currentUser ? (
            <>
              <div>{email}</div>
              <div>{displayName}</div>
              <img className={styles.profile} src={photo} alt="Profile" />
            </>
          ) : null
          }
          <Link className={styles.a} to={"docs/new"}>
            New Docs
          </Link>
          <Link className={styles.a} to={"docs/mydocs"}>
            My Docs
          </Link>
          {auth.currentUser ? (
            <button className={styles["logout-button"]} onClick={logout}>
              Logout
            </button>
          ) : (
            <button
              className={styles["logout-button"]}
              onClick={() => navigate("/auth/signin")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
