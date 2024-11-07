import React, { useState } from "react";
import {
  InfoContainer,
  OperationName,
  ButtonContainer,
  Row,
  RowOperation,
} from "../styled";
import {
  Line,
  Slide,
  SlidesContainer,
  OperationDescription,
  SlidesButtonsContainer,
  TooltipText,
} from "./styled";
import { IoArrowBack } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa";
import { FaTable } from "react-icons/fa";
import { BsPlusSlashMinus } from "react-icons/bs";
import { CiCalculator2 } from "react-icons/ci";
import { AiFillCalculator } from "react-icons/ai";
import { Button } from "../../Button";
import {
  AddTwoComplement,
  AndOperation,
  EqualOperation,
  OrOperation,
  RotateOperation,
  XorOperation,
} from "./Operations";

const firstSlide = 0;
const secondSlide = 1;
const thirdSlide = 2;

const operationCodeMapByName = {
  "Suma en complemento a 2": "5",
  "Suma en punto flotante": "6",
  OR: "7",
  AND: "8",
  XOR: "9",
  "Rotar a la derecha": "A",
  EQUAL: "B",
};

const operationDescMapByCode = {
  5: "En esta operación se realiza la suma binaria bit a bit representando a los negativos en complemento a 2.",
  7: "En esta operación cada bit del resultado es 1 si al menos uno de los bits correspondientes en los números de entrada es 1.",
  8: "En esta operación cada bit del resultado es 1 solo si ambos bits correspondientes en los números de entrada son 1.",
  9: "En esta operación cada bit del resultado es 1 si los bits correspondientes en los números de entrada son diferentes (uno es 1 y el otro es 0).",
  A: "En esta operación todos los bits se desplazan la cantidad de lugares indicados hacia la derecha, y el bit que sale del extremo derecho se mueve al extremo izquierdo.",
  B: "En esta operación se comparan ambos números bit a bit. El resultado es 1 si todos los bits son iguales, y 0 si hay alguna diferencia.",
};

const OperationInfo = ({
  aluOperationName,
  registerSbits,
  registerTbits,
  firstEightBits,
  showResult,
  result,
  handleShowResult,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const setFirstSlide = () => {
    setCurrentSlide(firstSlide);
  };
  const setSecondSlide = () => {
    setCurrentSlide(secondSlide);
  };
  const setThirdSlide = () => {
    setCurrentSlide(thirdSlide);
  };

  const aluOpCode = operationCodeMapByName[aluOperationName];
  const aluOpDesc = operationDescMapByCode[aluOpCode];

  return (
    <InfoContainer>
      <RowOperation>
        Operación
        <OperationName>
          {aluOperationName === "EQUAL"
            ? "Comparar registros"
            : aluOperationName}
        </OperationName>
      </RowOperation>
      <SlidesContainer>
        <Slide>
          {currentSlide == firstSlide && (
            <>
              {aluOperationName === "Rotar a la derecha" ? (
                <>
                  <Row>{registerSbits}</Row>
                  <Row>Rotaciones: {parseInt(registerTbits, 2)}</Row>
                  <Line />
                  {showResult ? (
                    <Row>
                      <span>{firstEightBits}</span>
                    </Row>
                  ) : (
                    <ButtonContainer>
                      <Button lightColor={true} onClick={handleShowResult}>
                        Realizar operación
                      </Button>
                    </ButtonContainer>
                  )}
                </>
              ) : aluOperationName === "EQUAL" ? (
                <>
                  <Row>{registerSbits}</Row>
                  <Row>{registerTbits}</Row>
                  <Line />
                  {showResult ? (
                    <Row>
                      {result ? "Registros iguales" : "Registros diferentes"}
                    </Row>
                  ) : (
                    <ButtonContainer>
                      <Button lightColor={true} onClick={handleShowResult}>
                        Realizar operación
                      </Button>
                    </ButtonContainer>
                  )}
                </>
              ) : (
                <>
                  <Row>{registerSbits}</Row>
                  <Row>{registerTbits}</Row>
                  <Line />
                  {showResult ? (
                    <Row>
                      <span>{firstEightBits}</span>
                    </Row>
                  ) : (
                    <ButtonContainer>
                      <Button lightColor={true} onClick={handleShowResult}>
                        Realizar operación
                      </Button>
                    </ButtonContainer>
                  )}
                </>
              )}
            </>
          )}
        </Slide>
        <Slide>
          {currentSlide == secondSlide && (
            <>
              <OperationDescription>{aluOpDesc}</OperationDescription>
            </>
          )}
        </Slide>
        <Slide>
          {currentSlide == thirdSlide && (
            <>
              {aluOpCode == "5" ? (
                <AddTwoComplement />
              ) : aluOpCode == "7" ? (
                <OrOperation />
              ) : aluOpCode == "8" ? (
                <AndOperation />
              ) : aluOpCode == "9" ? (
                <XorOperation />
              ) : aluOpCode == "A" ? (
                <RotateOperation />
              ) : (
                aluOpCode == "B" && <EqualOperation />
              )}
            </>
          )}
        </Slide>
      </SlidesContainer>
      <SlidesButtonsContainer>
        {currentSlide == firstSlide && (
          <>
            <Button lightColor={true} onClick={setSecondSlide}>
              <FaQuestion
                onMouseEnter={(e) =>
                  (e.currentTarget.nextSibling.style.visibility = "visible")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.nextSibling.style.visibility = "hidden")
                }
              />
              <TooltipText>Descripción</TooltipText>
            </Button>
            <Button lightColor={true} onClick={setThirdSlide}>
              <AiFillCalculator
                size="25"
                onMouseEnter={(e) =>
                  (e.currentTarget.nextSibling.style.visibility = "visible")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.nextSibling.style.visibility = "hidden")
                }
              />
              <TooltipText>Operación bit a bit</TooltipText>
            </Button>
          </>
        )}
        {(currentSlide == secondSlide || currentSlide == thirdSlide) && (
          <Button lightColor={true} onClick={setFirstSlide}>
            <IoArrowBack />
          </Button>
        )}
      </SlidesButtonsContainer>
    </InfoContainer>
  );
};

export default OperationInfo;
