import { controlUnitId } from "../../containers/SimulatorSection/components";
import {
  BodyContainer,
  CustomHandle,
  CustomText,
  HeaderText,
  IndicatorText,
  MainContainer,
  SpecialRegisterContainer,
  SpecialRegisterValue,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { setOpenControlUnitZoom } from "../../slices/modalsSlice";
import { typeSimulations } from "../../interpreter/constants";

export const ControlUnit = () => {
  const dispatch = useDispatch();

  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );
  const programCounter = useSelector(
    (state) => state.application.decode.programCounter
  );

  const instructionRegister = useSelector(
    (state) => state.application.decode.instructionRegister
  );

  const fetchId = useSelector((state) => state.application.fetch.instructionId);
  const decodeId = useSelector(
    (state) => state.application.decode.instructionId
  );
  const executeId = useSelector(
    (state) => state.application.execute.instructionId
  );

  const decodeColor = useSelector((state) => state.application.decode.color);

  const texts = {
    fetch: "Buscando instrucción",
    decode: "Decodificando instrucción",
    execute: "Ejecutando instrucción",
  };

  const textToShow = () => {
    if (typeSimulation == typeSimulations.CYCLES) {
      if (fetchId !== null) {
        return texts.fetch;
      } else if (decodeId !== null) {
        return texts.decode;
      } else if (executeId !== null) {
        return texts.execute;
      }
    }
    return "";
  };

  return (
    <MainContainer
      id={controlUnitId}
      $operating={decodeId !== null}
      $color={decodeColor}
      onClick={() => dispatch(setOpenControlUnitZoom(true))}
    >
      <HeaderText>Unidad de Control</HeaderText>
      <BodyContainer>
        <SpecialRegisterContainer>
          <CustomText>Contador de programa</CustomText>
          <SpecialRegisterValue id="PC">
            {programCounter !== null
              ? programCounter.toString(16).padStart(2, "0")
              : "00"}
          </SpecialRegisterValue>
        </SpecialRegisterContainer>
        <SpecialRegisterContainer>
          <CustomText>Registro de instrucción</CustomText>
          <SpecialRegisterValue id="IR">
            {instructionRegister || "-"}
          </SpecialRegisterValue>
        </SpecialRegisterContainer>
      </BodyContainer>
      {/* main memory to control unit*/}
      <CustomHandle type="target" position="right" />
      {/* main memory to control unit*/}
      <CustomHandle type="source" position="bottom" />
      {/* main memory to control unit*/}
      <CustomHandle type="source" position="right" />
      {/* cache to control unit */}
      <CustomHandle type="target" position="bottom" />
      <IndicatorText animate={false}>{textToShow()}</IndicatorText>
    </MainContainer>
  );
};
