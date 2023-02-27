import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextEditor from "../TextEditor";

export default function Docs() {
  const navigate = useNavigate();

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("jwt");

      const response = await fetch("http://localhost:8000/docs/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!data.user) {
        alert("No authorization");
        navigate("/auth/signin");
      }
    }

    verifyToken();
  }, [navigate]);

  return (
    <div id="container">
      <TextEditor />
    </div>
  );
}
