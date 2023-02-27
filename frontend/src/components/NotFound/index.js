import React from "react";
import styles from "./notFound.module.css";

export default function NotFound() {
  return(
    <div className={styles["error-form"]}>
      <h1>404 Not Found</h1>
      <p>The requested resource could not be found.</p>
    </div>
  );
}
