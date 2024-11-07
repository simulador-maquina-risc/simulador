import React from "react";
import {
  InfoContainer,
  RowOperation,
  OperationName,
  SlidesContainer,
  Slide,
  Row,
  Line,
  BitsRow,
  SignBit,
  ExponentBits,
  MantissaBits,
  SlidesButtonsContainer,
  Ball,
  InfoRow,
  InitialSignBit,
  InitialMantissaBits,
  InitialExponentBits,
} from "./styled";
import { Button } from "../../Button";
import {
  alignMantissas,
  parseRegister,
  addBinary,
  normalizeMantissa,
  toBiasBinary,
  floatingPointSum,
  twosComplementMantissa,
  hasCarry,
} from "../../../interpreter/instructions/FloatingPointSum";

import { IoArrowForward, IoArrowBack, IoArrowDown } from "react-icons/io5";

const initialSlide = 0;
const lastSlide = 6;
const underflowLimit = -3;
const overflowLimit = 4;
const exponentBias = 3;

export const FloatingPointSlides = ({
  aluOperation,
  registerSbits,
  registerTbits,
  currentSlide,
  prevSlide,
  nextSlide,
}) => {
  let binaryToDecimalWithBias = (binaryStr) => {
    const decimalValue = parseInt(binaryStr, 2);
    const result = decimalValue - exponentBias;
    return result;
  };

  // Slide 0: Interpretar registros
  let parsedS = parseRegister(registerSbits);
  let parsedT = parseRegister(registerTbits);

  let resultSign = parsedS.sign;

  // Slide 1: Alinear registros
  let alignedRegisters = alignMantissas(parsedS, parsedT);

  // Slide 2: if diffSign --> comp2 mantisa
  let registerToComplement = null;
  let complementedRegister = null;

  const diffSigns = parsedS.sign !== parsedT.sign;
  if (diffSigns) {
    if (alignedRegisters.register2.sign === 1) {
      registerToComplement = alignedRegisters.register2.mantissa.implied;
      complementedRegister = twosComplementMantissa(registerToComplement);
      alignedRegisters.register2.mantissa.implied = complementedRegister;
    } else {
      registerToComplement = alignedRegisters.register1.mantissa.implied;
      complementedRegister = twosComplementMantissa(registerToComplement);
      alignedRegisters.register1.mantissa.implied = complementedRegister;
    }
  }

  // Slide 3: Suma de registros
  let sumResultMantissa = addBinary(
    alignedRegisters.register1.mantissa.implied,
    alignedRegisters.register2.mantissa.implied
  );

  const sumResultMantissaFull = sumResultMantissa;

  let carry = false;
  // Slide 4: Solo si hay diffSign, revisar si hay carry y actualizar resultado de mantisa
  if (diffSigns) {
    if (hasCarry(sumResultMantissa)) {
      carry = true;
      resultSign = 0;
      sumResultMantissa = sumResultMantissa.slice(1);
    } else {
      resultSign = 1;
      sumResultMantissa = twosComplementMantissa(sumResultMantissa);
    }
  }

  const resultSignStr = resultSign === 0 ? "+" : "-";

  // Slide 5: Normalizar mantisa y chequear underflow
  let [normalizedMantissa, placesMoved] = normalizeMantissa(sumResultMantissa);

  const resultExponentInt =
    alignedRegisters.register1.exponent.decimal - placesMoved;

  let isUnderflow = false;
  if (resultExponentInt < underflowLimit) {
    //console.log("Underflow");
    isUnderflow = true;
  } else if (resultExponentInt > overflowLimit) {
    //console.log("Overflow");
  }

  // Slide 6: almacenar el resultado final.
  const resultExponent = toBiasBinary(
    resultExponentInt,
    exponentBias,
    exponentBias
  );
  const finalResult = floatingPointSum(registerSbits, registerTbits);
  //console.log(finalResult);

  return (
    <InfoContainer>
      <RowOperation>
        Operación
        <OperationName>{aluOperation.operation}</OperationName>
      </RowOperation>

      <SlidesContainer>
        {currentSlide === 0 && (
          <Slide>
            <Row>{"Interpretación de registros:"}</Row>
            <InfoRow>
              <Ball style={{ backgroundColor: "var(--im-lightgreen)" }} />
              <span> Signo |</span>
              <Ball style={{ backgroundColor: "var(--im-teal)" }} />
              <span> Exponente |</span>
              <Ball style={{ backgroundColor: "var(--im-lightblue)" }} />
              <span> Mantisa </span>
            </InfoRow>
            <Row>
              {"S: "}
              {registerSbits}
              <IoArrowForward />
              <BitsRow>
                <InitialSignBit>{registerSbits.slice(0, 1)}</InitialSignBit>
                <InitialExponentBits>
                  {registerSbits.slice(1, 4)}
                </InitialExponentBits>
                <InitialMantissaBits>
                  {registerSbits.slice(4)}
                </InitialMantissaBits>
              </BitsRow>
            </Row>
            <Row>
              {"S ="}
              <BitsRow>
                <SignBit>
                  {registerSbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerSbits.slice(1, 4))}
              </ExponentBits>
            </Row>
            <Line />

            <Row>
              {"T: "}
              {registerTbits}
              <IoArrowForward />
              <BitsRow>
                <InitialSignBit>{registerTbits.slice(0, 1)}</InitialSignBit>
                <InitialExponentBits>
                  {registerTbits.slice(1, 4)}
                </InitialExponentBits>
                <InitialMantissaBits>
                  {registerTbits.slice(4)}
                </InitialMantissaBits>
              </BitsRow>
            </Row>
            <Row>
              {"T ="}
              <BitsRow>
                <SignBit>
                  {registerTbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerTbits.slice(1, 4))}
              </ExponentBits>
            </Row>
          </Slide>
        )}
        {currentSlide === 1 && (
          <Slide>
            <Row>{"Alineación de mantisas:"}</Row>

            <Row>
              {"S: "}
              <BitsRow>
                <SignBit>
                  {registerSbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerSbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerSbits.slice(1, 4))}
              </ExponentBits>
            </Row>

            <Row>
              {"T: "}
              <BitsRow>
                <SignBit>
                  {registerTbits.slice(0, 1) === "0" ? "+" : "-"}
                </SignBit>
                {"1."}
                <MantissaBits>{registerTbits.slice(4)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {binaryToDecimalWithBias(registerTbits.slice(1, 4))}
              </ExponentBits>
            </Row>

            <IoArrowDown></IoArrowDown>

            {binaryToDecimalWithBias(registerTbits.slice(1, 4)) ===
            binaryToDecimalWithBias(registerSbits.slice(1, 4)) ? (
              <Row>{"Las mantisas ya están alineadas."}</Row>
            ) : parseInt(
                binaryToDecimalWithBias(registerTbits.slice(1, 4)),
                10
              ) >
              parseInt(
                binaryToDecimalWithBias(registerSbits.slice(1, 4)),
                10
              ) ? (
              <Slide>
                <Row>
                  {"S: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register2.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register2.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register2.exponent.decimal}
                  </ExponentBits>
                </Row>
                <Row>
                  {"T: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register1.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register1.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register1.exponent.decimal}
                  </ExponentBits>
                </Row>
              </Slide>
            ) : (
              <Slide>
                <Row>
                  {"S: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register1.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register1.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register1.exponent.decimal}
                  </ExponentBits>
                </Row>
                <Row>
                  {"T: "}
                  <BitsRow>
                    <SignBit>
                      {alignedRegisters.register2.sign === 0 ? "+" : "-"}
                    </SignBit>
                    <MantissaBits>
                      {alignedRegisters.register2.mantissa.implied}
                    </MantissaBits>
                  </BitsRow>
                  {"*2^"}
                  <ExponentBits>
                    {alignedRegisters.register2.exponent.decimal}
                  </ExponentBits>
                </Row>
              </Slide>
            )}
          </Slide>
        )}
        {currentSlide === 2 && (
          <Slide>
            <Row>{"Manejo de Signo:"}</Row>

            {diffSigns ? (
              <>
                <Row>
                  {
                    "Aplicación de complemento a 2 al registro con signo negativo."
                  }
                </Row>
                <Row>{registerToComplement}</Row>
                <IoArrowDown></IoArrowDown>
                <Row>{complementedRegister}</Row>
              </>
            ) : (
              <>
                <IoArrowDown></IoArrowDown>

                <Row>{"Los registros tienen el mismo signo, "}</Row>
                <Row>{"no debemos aplicar complemento a 2."}</Row>
              </>
            )}
          </Slide>
        )}
        {currentSlide === 3 && (
          <Slide>
            <Row>{"Suma:"}</Row>
            <br></br>
            <Row>
              <BitsRow>{alignedRegisters.register1.mantissa.implied}</BitsRow>
              {"*2^"}
              {alignedRegisters.register1.exponent.decimal}
            </Row>
            <Row>
              <BitsRow>{alignedRegisters.register2.mantissa.implied}</BitsRow>
              {"*2^"}
              {alignedRegisters.register2.exponent.decimal}
            </Row>
            <Line />
            <Row>
              <BitsRow>{sumResultMantissaFull}</BitsRow>
              {"*2^"}
              {alignedRegisters.register2.exponent.decimal}
            </Row>
          </Slide>
        )}
        {currentSlide === 4 && (
          <Slide>
            <Row>{"Manejo de Acarreo:"}</Row>

            {diffSigns ? (
              <>
                {carry ? (
                  <>
                    <Row>{"Descarte del acarreo por signos diferentes."}</Row>
                    <Row>{sumResultMantissaFull}</Row>
                    <IoArrowDown />
                    <Row>{sumResultMantissa}</Row>
                  </>
                ) : (
                  <>
                    <Row>
                      {`Bit más significativo =  ${sumResultMantissaFull[0]} (sin acarreo)`}
                    </Row>
                    <Row>{"Complemento a 2 el resultado:"}</Row>
                    <Row>{sumResultMantissaFull}</Row>
                    <IoArrowDown />
                    <Row>{sumResultMantissa}</Row>
                  </>
                )}
              </>
            ) : (
              <>
                <IoArrowDown />
                <Row>{"Los registros tienen el mismo signo,"} </Row>
                <Row>{"saltamos el control de acarreo."}</Row>
              </>
            )}
          </Slide>
        )}
        {currentSlide === 5 && (
          <Slide>
            <Row>{"Normalización y redondeo:"}</Row>
            <Row>
              <BitsRow>{sumResultMantissa}</BitsRow>
              {"*2^"}

              {alignedRegisters.register2.exponent.decimal}
            </Row>
            <IoArrowDown></IoArrowDown>
            <Row>
              <BitsRow>
                {"1."}
                <MantissaBits>{normalizedMantissa.slice(2, 6)}</MantissaBits>
              </BitsRow>
              {"*2^"}
              <ExponentBits>
                {alignedRegisters.register2.exponent.decimal - placesMoved}
              </ExponentBits>
            </Row>
            {isUnderflow && (
              <>
                <Row>{"Underflow detectado"}</Row>
              </>
            )}
          </Slide>
        )}
        {currentSlide === 6 && (
          <Slide>
            <>
              <Row>{"Almacenamiento del resultado:"}</Row>
              {isUnderflow ? (
                <>
                  <Row>
                    <BitsRow>
                      <SignBit>{resultSignStr}</SignBit>
                      {"1."}
                      <MantissaBits>
                        {normalizedMantissa.slice(2, 6)}
                      </MantissaBits>
                    </BitsRow>
                    {"*2^ "}
                    <ExponentBits>{resultExponentInt}</ExponentBits>
                  </Row>

                  <IoArrowDown></IoArrowDown>
                  <Row>
                    <BitsRow>
                      <SignBit>0</SignBit>
                      <ExponentBits>000</ExponentBits>
                      <MantissaBits>0000</MantissaBits>
                    </BitsRow>
                  </Row>
                  <Row>Resultado por consecuencia del underflow.</Row>
                </>
              ) : (
                <>
                  <Row>
                    <BitsRow>
                      <SignBit>{resultSignStr}</SignBit>
                      {"1."}
                      <MantissaBits>
                        {normalizedMantissa.slice(2, 6)}
                      </MantissaBits>
                    </BitsRow>
                    {"*2^ "}
                    <ExponentBits>{resultExponentInt}</ExponentBits>
                  </Row>
                  <IoArrowDown></IoArrowDown>
                  <Row>
                    <BitsRow>
                      <SignBit>{resultSignStr}</SignBit>
                      {"1."}
                      <MantissaBits>
                        {normalizedMantissa.slice(2, 6)}
                      </MantissaBits>
                    </BitsRow>
                    {"*2^ "}
                    <ExponentBits>{resultExponent}</ExponentBits>
                  </Row>
                  <IoArrowDown></IoArrowDown>
                  <Row>
                    <BitsRow>
                      <SignBit>{resultSign}</SignBit>
                      <ExponentBits>{resultExponent}</ExponentBits>
                      <MantissaBits>
                        {normalizedMantissa.slice(2, 6)}
                      </MantissaBits>
                    </BitsRow>
                  </Row>
                </>
              )}
            </>
          </Slide>
        )}
      </SlidesContainer>

      <SlidesButtonsContainer>
        {currentSlide != initialSlide && (
          <Button lightColor={true} onClick={prevSlide}>
            <IoArrowBack />
          </Button>
        )}
        {currentSlide != lastSlide && (
          <Button lightColor={true} onClick={nextSlide}>
            <IoArrowForward />
          </Button>
        )}
      </SlidesButtonsContainer>
    </InfoContainer>
  );
};
