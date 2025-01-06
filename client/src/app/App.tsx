import { useState } from "react";
import styled from "styled-components";
import { Colors } from "../shared/Color";
import "./Global.css";
import Router from "./Routes.tsx";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 20px;
  height: 90vh;
  box-sizing: border-box;
  background-color: ${Colors.background.darkened};
`;

export default function App() {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  );
}
