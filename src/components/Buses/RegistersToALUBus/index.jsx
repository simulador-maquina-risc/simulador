import { useSelector } from "react-redux";
import { BaseEdge, EdgeLabelRenderer } from "@xyflow/react";
import { usePosition } from "../../../hooks/usePosition";
import { useMemo } from "react";
import {
  aluId,
  registerAluTopId,
  registerAluBottomId,
  registersId,
} from "../../../containers/SimulatorSection/components";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { Title } from "./styled";
import { convertValue, toHexaPadStart } from "../../../interpreter/utils";
import { textAddressTitle, textDataTitle } from "../utils";

export const RegistersToALUBus = ({ id, data }) => {
  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );
  const color = useSelector((state) => state.application.execute.color);

  const animations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const numericBase = useSelector((state) => state.application.numericBase);

  const animationDataTop = useMemo(() => {
    const data = animations.find((anim) => anim.id === registerAluTopId);
    return data;
  }, [animations, registerAluTopId]);

  const animationDataBottom = useMemo(() => {
    const data = animations.find((anim) => anim.id === registerAluBottomId);
    return data;
  }, [animations, registerAluBottomId]);

  const animationDataTopToShow = useMemo(() => {
    const value = convertValue(animationDataTop?.data, numericBase);
    if (value === "-") {
      return convertValue(0, numericBase);
    } else {
      return value;
    }
  }, [animationDataTop, numericBase]);

  const animationDataBottomToShow = useMemo(() => {
    const value = convertValue(animationDataBottom?.data, numericBase);
    if (value === "-") {
      return convertValue(0, numericBase);
    } else {
      return value;
    }
  }, [animationDataBottom, numericBase]);

  const edgeAnimationAluTop = !!animationDataTop;
  const edgeAnimationAluBottom = !!animationDataBottom;

  const [edgePathTop, labelXTop, labelYTop] = usePosition({
    edgeId: id,
    sourceComponentId: registersId,
    targetComponentId: aluId,
    position: "top",
  });

  const [edgePathBottom, labelXBottom, labelYBottom] = usePosition({
    edgeId: id,
    sourceComponentId: registersId,
    targetComponentId: aluId,
    position: "bottom",
  });

  return (
    <>
      <defs>
        {/* Filtro para la arista inferior */}
        <filter
          id="drop-shadow-bottom"
          x="-10%"
          y="0%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="-2"
            dy="-2"
            stdDeviation="4"
            floodColor="rgba(0, 0, 0, 0.5)"
          />
        </filter>

        {/* Filtro para la arista superior */}
        <filter
          id="drop-shadow-top"
          x="-20%"
          y="-50%"
          width="140%"
          height="150%"
        >
          <feDropShadow
            dx="-2"
            dy="-2"
            stdDeviation="6"
            floodColor="rgba(0, 0, 0, 0.5)"
          />
        </filter>
      </defs>

      <g>
        {/* Background Edges */}
        <BaseEdge
          path={edgePathTop}
          interactionWidth={20}
          style={{
            stroke: "var(--im-gray-lighter)",
            strokeWidth: 30,
            filter: "url(#drop-shadow-top)",
          }}
        />
        <BaseEdge
          path={edgePathBottom}
          interactionWidth={20}
          style={{
            stroke: "var(--im-gray-lighter)",
            strokeWidth: 30,
            filter: "url(#drop-shadow-bottom)",
          }}
        />
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(0%, -180%) translate(${labelXTop}px,${labelYTop}px)`,
            }}
            className="nodrag nopan"
          >
            {edgeAnimationAluTop && (
              <Globe arrowPosition={"bottom"} color={color}>
                <div className="row">
                  <Title $color={color}>
                    {textAddressTitle("Dirección (Execute)", typeSimulation)}
                  </Title>
                  {parseInt(animationDataTop.address, 10)
                    .toString(16)
                    .toUpperCase()}
                </div>
                <div className="row">
                  <Title $color={color}>
                    {textDataTitle("Datos (Execute)", typeSimulation)}
                  </Title>
                  {animationDataTopToShow}
                </div>
              </Globe>
            )}
          </div>
        </EdgeLabelRenderer>
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(0%, 90%) translate(${labelXBottom}px,${labelYBottom}px)`,
            }}
            className="nodrag nopan"
          >
            {edgeAnimationAluBottom && (
              <Globe arrowPosition={"top"} color={color}>
                <div className="row">
                  <Title $color={color}>Dirección</Title>
                  {parseInt(animationDataBottom.address, 10)
                    .toString(16)
                    .toUpperCase()}
                </div>
                <div className="row">
                  <Title $color={color}>Datos</Title>
                  {animationDataBottomToShow}
                </div>
              </Globe>
            )}
          </div>
        </EdgeLabelRenderer>
        {edgeAnimationAluTop && (
          <BusAnimation edgePath={edgePathTop} id={id} color={color} />
        )}
        {edgeAnimationAluBottom && (
          <BusAnimation edgePath={edgePathBottom} id={id} color={color} />
        )}
      </g>
    </>
  );
};
