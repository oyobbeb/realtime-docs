import React, { useEffect, useState } from "react";
import styles from "./loading.module.css";

export default function Loading({ speed = 300, text = "Loading" }) {
  const [content, setContent] = useState(text);

  useEffect(() => {
    const loading = setInterval(() => {
      content === text + "..." ? setContent(text) : setContent((text) => text + "." );
    }, speed);

    return () => clearInterval(loading);
  }, [content, speed, text]);

  return (
    <div className={styles["loading-container"]}>
      {content}
    </div>
  );
}
