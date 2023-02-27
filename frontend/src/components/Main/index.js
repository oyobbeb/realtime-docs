import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../features/api/firebaseApi";

export default function Main() {
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

  return (
    <div>
      <Link to={"/new"}>Make New Docs</Link>
      <div className="docs-grid">
        {[1.2].forEach((doc, index) => {
          <div className="vote">
            <h3>{doc.title}</h3>
            <h3>{doc.description}</h3>
            <div className="right-section">
              <div className="right-bottom">
                <div className="name-container">{doc.createdBy}</div>
                <Link to={`/doc/${doc._id}`} className="edit-button">Edit</Link>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}
