import { BaseEdge, EdgeLabelRenderer } from "@xyflow/react";
import {
  controlUnitId,
  registersControlUnitId,
  registersId,
} from "../../../containers/SimulatorSection/components";
import { usePosition } from "../../../hooks/usePosition";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { Title } from "./styled";
import { convertValue, toHexaPadStart } from "../../../interpreter/utils";
import { textAddressTitle, textDataTitle } from "../utils";

export const RegistersToUCBus = ({ id }) => {
  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );

  const color = useSelector((state) => state.application.execute.color);

  const numericBase = useSelector((state) => state.application.numericBase);

  const animationData = useMemo(
    () => animations.find((anim) => anim.id === registersControlUnitId),
    [animations, registersControlUnitId]
  );

  const animationDataToShow = useMemo(() => {
    return convertValue(animationData?.data, numericBase);
  }, [animationData, numericBase]);

  const edgeAnimation = !!animationData;

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: registersControlUnitId,
    sourceComponentId: registersId,
    targetComponentId: controlUnitId,
  });

  return (
    <g>
      <BaseEdge
        path={edgePath}
        interactionWidth={20}
        style={{
          stroke: "var(--im-gray-lighter)",
          strokeWidth: 30,
          filter: "drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))",
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(50%, -135%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {edgeAnimation && (
            <Globe arrowPosition={"bottom"}>
              <div className="row">
                <Title $color={color}>
                  {textAddressTitle("Dirección (Execute)", typeSimulation)}
                </Title>
                {parseInt(animationData?.address, 10)
                  .toString(16)
                  .toUpperCase()}
              </div>
              <div className="row">
                <Title $color={color}>
                  {textDataTitle("Datos (Execute)", typeSimulation)}
                </Title>
                {animationDataToShow}
              </div>
            </Globe>
          )}
        </div>
      </EdgeLabelRenderer>
      {edgeAnimation && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          reverse={animationData.reverse}
          color={color}
        />
      )}
    </g>
  );
};
