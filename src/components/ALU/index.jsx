import { useDispatch, useSelector } from "react-redux";
import { aluId } from "../../containers/SimulatorSection/components";
import { AluTitle, Container, CustomHandle } from "./styled";
import { setOpenAluZoom } from "../../slices/modalsSlice";
import { Button } from "../Button";

export const ALU = () => {
  const dispatch = useDispatch();

  const aluOperation = useSelector(
    (state) => state.application.execute.aluOperation
  );

  const isSimulating = useSelector((state) => state.application.isSimulating);

  const color = useSelector((state) => state.application.execute.color);

  return (
    <>
      <Container
        id={aluId}
        $operating={aluOperation}
        $color={color}
        onClick={aluOperation ? () => dispatch(setOpenAluZoom(true)) : () => {}}
      >
        <CustomHandle
          type="target"
          position="left"
          style={{ background: "#555" }}
        />
        <CustomHandle
          type="target"
          position="left"
          style={{ background: "#555" }}
        />
        <div
          className="column"
          style={{ marginTop: aluOperation ? "25px" : "0px" }}
        >
          <AluTitle>ALU</AluTitle>
          {aluOperation && (
            <Button
              lightColor={true}
              onClick={() => dispatch(setOpenAluZoom(true))}
            >
              Ver detalle
            </Button>
          )}
        </div>
        <CustomHandle
          type="source"
          position="right"
          style={{ background: "#555" }}
        />
      </Container>
      {/* {aluOperation && (
        <ButtonContainer>
          <Button
            lightColor={true}
            onClick={() => dispatch(setOpenAluZoom(true))}
          >
            Ver detalle
          </Button>
        </ButtonContainer>
      )} */}
    </>
  );
};
