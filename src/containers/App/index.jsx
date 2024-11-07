import React, { useEffect } from "react";
import { AppContainer, MainContainer } from "./styled";
import { EditorSection } from "../EditorSection";
import { SimulatorContainer } from "../SimulatorSection";
import { Header } from "../../components/Header";
import { HelpButton } from "../../components/HelpButton";
import { ErrorModal } from "../../components/ErrorModal";
import { InputPortModal } from "../../components/InputPortModal";
import { OverflowErrorModal } from "../../components/OverflowErrorModal";
import { OutputPortModal } from "../../components/OutputPortModal";
import { LoadingScreen } from "../LoadingScreen";

export const App = () => {
  return (
    <>
      {" "}
      <LoadingScreen />
      <MainContainer>
        <Header />
        <AppContainer>
          <EditorSection />
          <SimulatorContainer />
        </AppContainer>
        <HelpButton />
        <ErrorModal />
        <InputPortModal />
        <OverflowErrorModal />
        <OutputPortModal />
      </MainContainer>
    </>
  );
};
