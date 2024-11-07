import React from "react";

export const INTRODUCTION = 0;
export const SIMULATOR = 1;
export const TEXT_EDITOR = 2;
export const EXECUTION_OPTIONS = 3;
export const END = 4;

const introTutorial = (
  <>
    <p>
      Este simulador te permite explorar y experimentar con los principios
      fundamentales de una arquitectura de computadora RISC (Reduced Instruction
      Set Computer).
    </p>
    <p>
      Podrás ejecutar programas, observar el funcionamiento de los distintos
      componentes de la computadora y ver en tiempo real cómo se procesan las
      instrucciones.
    </p>
  </>
);

const simulatorTutorial = (
  <>
    <p>
      En esta sección encontrarás el simulador de la computadora, donde podrás
      observar cómo se ejecutan las instrucciones de un programa, cómo
      interactúan los distintos componentes de la máquina y cómo fluye la
      información a través de los buses.
    </p>
    <p>
      Durante la simulación, también podrás hacer clic en algunos de los
      componentes de la computadora para ver más detalles sobre su
      funcionamiento.
    </p>
  </>
);

const textEditorTutorial = (
  <>
    <p>
      En esta sección podrás ver el editor de texto, donde puedes cargar o crear
      programas para que sean interpretados por el simulador.
    </p>
    <p>
      En la parte superior de la pantalla encontrarás botones para subir un
      programa, limpiar el editor, descargar el programa del editor y acceder a
      un atajo con la lista de instrucciones interpretadas por el simulador.
    </p>
    <p>
      En la parte inferior están los controles para iniciar la simulación,
      ejecutar paso a paso, avanzar o retroceder al inicio o fin, y detener la
      ejecución.
    </p>
    <p>
      Para comenzar la simulación, carga un programa en el editor y haz clic en
      el botón "Simular". Para finalizar la simulación o cambiar de programa,
      haz clic en "Editar".
    </p>
  </>
);

const simulationOptionsTutorial = (
  <>
    <p>En esta sección encontrarás diversas opciones para la simulación.</p>
    <p>
      Primero, podrás seleccionar la base numérica para mostrar los valores de
      los datos de la simulación: binaria o hexadecimal.
    </p>
    <p>
      También tendrás la opción de elegir el modo de ejecución del programa: sin
      ciclos de ejecución, con ciclos de ejecución o con ciclos utilizando
      pipelining.
    </p>
  </>
);

const endTutorial = (
  <>
    <p>¡Eso es todo! Ahora puedes comenzar a simular.</p>
    <p>
      Para volver a ver este tutorial, siempre podrás encontrar el botón de
      Ayuda en la parte inferior derecha de la pantalla.
    </p>
    <p>¡Disfruta de la experiencia!</p>
  </>
);

export const tutorialTexts = {
  [INTRODUCTION]: {
    title: "Bienvenido al Tutorial",
    content: introTutorial,
    arrow: "none",
    position: { top: "35%", left: "35%", maxWidth: "500px" },
  },
  [SIMULATOR]: {
    title: "Simulador",
    content: simulatorTutorial,
    arrow: "right",
    position: { top: "25%", left: 0, maxWidth: "400px" },
    highlight: "simulatorContainer",
  },
  [TEXT_EDITOR]: {
    title: "Editor de texto",
    content: textEditorTutorial,
    arrow: "left",
    position: { top: "25%", left: "17%", maxWidth: "500px" },
    highlight: "editorContainer",
  },
  [EXECUTION_OPTIONS]: {
    title: "Opciones de simulación",
    content: simulationOptionsTutorial,
    arrow: "top",
    position: { top: "5%", left: "70%", maxWidth: "500px" },
    highlight: "headerContainer",
  },
  [END]: {
    title: "Fin del tutorial",
    content: endTutorial,
    arrow: "none",
    position: { top: "35%", left: "35%", maxWidth: "500px" },
  },
};
