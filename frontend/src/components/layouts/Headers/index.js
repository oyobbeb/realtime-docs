import React from "react";
import styles from "./headers.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../features/api/firebaseApi";

export default function Headers() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("jwt");
    auth.signOut();
    navigate("/auth/signin");
  }

  return (
    <header className={styles.header}>
      <div className={styles["left-header"]}>
        <Link className={styles.a} to={"/"}>Docs</Link>
      </div>
      <div className={styles["right-header"]}>
        <div className={styles["header-component"]}>
          <div>{auth?.currentUser?.email}</div>
          <Link className={styles.a} to={"/new"}>New Docs</Link>
          <Link className={styles.a} to={"/"}>My Docs</Link>
          <button className={styles["logout-button"]} onClick={logout}>Logout</button>
        </div>
      </div>
    </header>
  );
}
