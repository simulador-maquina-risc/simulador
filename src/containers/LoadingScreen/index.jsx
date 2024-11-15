import React, { useState, useEffect } from "react";
import {
  LoadingContainer,
  Icon,
  Title,
  Subtitle,
  StartButton,
  Credits,
} from "./styled";
import favicon from "/favicon.png";

export const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("appLoaded");
    if (!hasLoadedBefore) {
      setIsVisible(true);
    }
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleStartClick = () => {
    setFadeOut(true);
    setTimeout(() => setIsVisible(false), 750);
    sessionStorage.setItem("appLoaded", "true");
  };

  return (
    <LoadingContainer className={fadeOut ? "fade-out" : ""}>
      {" "}
      <Icon src={favicon} fadeOut={fadeOut} />
      <Title>Intérprete Máquina Ideal RISC</Title>
      <Subtitle>
        Una mirada interactiva a la arquitectura de una computadora en
        funcionamiento
      </Subtitle>
      {<StartButton onClick={handleStartClick}>Comenzar</StartButton>}
      <Credits>
        <p>
          Trabajo Profesional de Ingeniería en Informática - 2024 <br />
          Integrantes: Balmaceda, Fernando - Bocaccio, Agustina - Grati, Lucas -
          Pinto, Nicolás <br />
          Tutor: Prof. Arturo Carlos Servetto
        </p>
      </Credits>
    </LoadingContainer>
  );
};
