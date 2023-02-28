import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../Signin";
import Main from "../Main";
import Docs from "../Docs";
import NewDocs from "../NewDocs";
import EditDocs from "../EditDoc";
import NotFound from "../NotFound";
import Loading from "../Loading";
import Headers from "../Headers";
import "./app.css";

import { auth } from '../../features/api/firebaseApi';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Headers />
      <Routes>
        <Route path="/" element={user ? <Main /> : <Loading />} />
        <Route path="new" element={<NewDocs />} />
        <Route path="mydocs" element={<Docs />} />
        <Route path="/docs/:id" element={<EditDocs />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
