import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { setOpenControlUnitZoom } from "../../slices/modalsSlice";
import { getInstructionLog } from "../../interpreter/instruction_descriptor";
import { InstructionFactory } from "../../interpreter/InstructionFactory";
import { useMemo } from "react";
import {
  ControlUnitContainer,
  Bus,
  StartBusContainer,
  CloseButton,
  ModalBg,
  ModalBoxSetup,
  ModalContainer,
  ModalWrapper,
  EndBusContainer,
  AddrBus,
  DataBus,
  InfoContainer,
  InfoTile,
  InfoBox,
  AdditionalInfoCard,
  InfoRow,
  InfoLabel,
  InfoValue,
  InfoDescription,
  InfoSubtitle,
  DescriptionTitle,
  BlankDataBox,
} from "./styled";

export const ControlUnitModal = () => {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.modals.controlUnitZoom);
  const decodeId = useSelector(
    (state) => state.application.decode.instructionId
  );
  const instructionRegister = useSelector(
    (state) => state.application.decode.instructionRegister
  );
  const programCounter = useSelector(
    (state) => state.application.decode.programCounter
  );

  const controlUnitInfo = useMemo(() => {
    return {
      instruction: instructionRegister ? instructionRegister.toUpperCase() : "",
      instructionDescription: instructionRegister
        ? getInstructionLog(instructionRegister[0], instructionRegister)
        : "",
      programCounter: programCounter
        ? programCounter.toString(16).padStart(2, "0").toUpperCase()
        : "",
    };
  }, [decodeId, instructionRegister, programCounter]);

  const marginMapping = {
    1: "72px",
    2: "50px",
    3: "35px",
    4: "0px",
  };

  const instructions =
    InstructionFactory.createInstruction(
      controlUnitInfo.instruction,
      0
    )?.toString() || [];
  const instructionCount = instructions.length;

  const marginTop = marginMapping[instructionCount] || "0px";

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <InfoContainer>
              <InfoTile>{"Unidad de control"}</InfoTile>

              <InfoBox>
                <InfoRow>
                  <InfoLabel>Contador de programa:</InfoLabel>
                  <InfoValue>{controlUnitInfo.programCounter}</InfoValue>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Registro de instrucción:</InfoLabel>
                  <InfoValue>{controlUnitInfo.instruction}</InfoValue>
                </InfoRow>
              </InfoBox>
              <InfoSubtitle>{"Decodificación de instrucción:"}</InfoSubtitle>
              <AdditionalInfoCard>
                {InstructionFactory.createInstruction(
                  controlUnitInfo.instruction,
                  0
                )
                  ?.toString()
                  .map((instructionData, i) => (
                    <InfoRow key={i}>
                      <InfoLabel>{instructionData[0]}</InfoLabel>
                      <BlankDataBox>{instructionData[1]}</BlankDataBox>
                    </InfoRow>
                  ))}

                <DescriptionTitle style={{ marginTop }}>
                  Descripción:
                </DescriptionTitle>

                <InfoDescription>
                  {controlUnitInfo.instructionDescription}
                </InfoDescription>
              </AdditionalInfoCard>
            </InfoContainer>

            <StartBusContainer>
              <Bus>Bus hacia los registros</Bus>
            </StartBusContainer>
            <ControlUnitContainer>
              <InfoContainer></InfoContainer>
            </ControlUnitContainer>
            <EndBusContainer>
              <DataBus>Bus de datos</DataBus>
              <AddrBus>Bus de direcciones</AddrBus>
            </EndBusContainer>
          </ModalContainer>
          <CloseButton onClick={() => dispatch(setOpenControlUnitZoom(false))}>
            Cerrar
            <IoClose />
          </CloseButton>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};
