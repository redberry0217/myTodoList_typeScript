import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import WriteTodo from "../components/WriteTodo";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<WriteTodo />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
