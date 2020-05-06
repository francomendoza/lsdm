import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateSearch from "./pages/TemplateSearch";
import TemplateInstanceViewer from "./pages/TemplateInstanceViewer";
import styled from "styled-components";

const AppContainer = styled.div`
  text-align: left;
  margin: auto 50px;
`;

const Header = styled.header`
  background-color: #8eb69b;
  min-height: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

function App(props) {
  return (
    <div>
      <Header></Header>
      <AppContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TemplateSearch />} />
            <Route
              path="/template_instances/:templateInstanceId"
              element={<TemplateInstanceViewer />}
            />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </div>
  );
}

export default App;
