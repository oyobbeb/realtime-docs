import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../Auth/Signin";
import Main from "../Main";
import Docs from "../Docs";
import NewDocs from "../Docs/NewDocs";
import NotFound from "../NotFound";
import Loading from "../Loading";

import { auth } from '../../features/api/firebaseApi';
import { useAuthState } from 'react-firebase-hooks/auth';
import Headers from "../layouts/Headers";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Headers />
      <Routes>
        <Route path="/" element={user ? <Main /> : <Loading />} />
        <Route path="/docs/:id" element={<Docs />} />
        <Route path="new" element={<NewDocs />} />
        <Route path="my-docs" element={<Docs />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
