import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { BaseEdge, EdgeLabelRenderer } from "@xyflow/react";
import { usePosition } from "../../../hooks/usePosition";
import { mainMemControlUnitDataId } from "../../../containers/SimulatorSection/components";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { typeSimulations } from "../../../interpreter/constants";
import { textDataTitle } from "../utils";
import { convertValue } from "../../../interpreter/utils";

export const MainMemControlDataBus = ({ id, source, target }) => {
  const numericBase = useSelector((state) => state.application.numericBase);

  const [animateInterminently, setAnimateInterminently] = useState(false);
  const instructionRegister = useSelector(
    (state) => state.application.fetch.instructionRegister
  );

  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );

  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const fetchColor = useSelector((state) => state.application.fetch.color);
  const executeColor = useSelector((state) => state.application.execute.color);

  const instructionRegisterToShow = useMemo(() => {
    return convertValue(instructionRegister, numericBase);
  }, [instructionRegister, numericBase]);

  const animationDataFetch = useMemo(() => {
    return animations.find((anim) => anim.id === mainMemControlUnitDataId);
  }, [animations, mainMemControlUnitDataId]);

  const animationDataExecute = useMemo(() => {
    return executeAnimations.find(
      (anim) => anim.id === mainMemControlUnitDataId
    );
  }, [executeAnimations, mainMemControlUnitDataId]);

  const animationDataFetchToShow = useMemo(() => {
    return convertValue(animationDataFetch?.data, numericBase);
  }, [animationDataFetch, numericBase]);

  const animationDataExecuteToShow = useMemo(() => {
    return convertValue(animationDataExecute?.data, numericBase);
  }, [animationDataExecute, numericBase]);

  const animationFetch = animationDataFetch && !animationDataExecute;
  const animationExecute = animationDataExecute && !animationDataFetch;
  const animationBoth = animationDataFetch && animationDataExecute;

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: source,
    targetComponentId: target,
  });

  // Timer to animate interminently the bus when fetch and execute are active
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateInterminently((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [animateInterminently]);

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
            transform: `translate(-50%, -140%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {animationFetch && (
            <Globe
              arrowPosition={"bottom"}
              title={textDataTitle("Datos (Fetch)", typeSimulation)}
              color={fetchColor}
            >
              {instructionRegisterToShow}
            </Globe>
          )}
          {animationExecute && (
            <Globe
              arrowPosition={"bottom"}
              title={textDataTitle("Datos (Execute)", typeSimulation)}
              color={executeColor}
            >
              {animationDataExecuteToShow}
            </Globe>
          )}
          {animationBoth && (
            <div className="row">
              <Globe
                arrowPosition={"bottom"}
                title={"Datos (Fetch)"}
                color={fetchColor}
              >
                {animationDataFetchToShow}
              </Globe>
              <Globe
                arrowPosition={"bottom"}
                title={"Datos (Execute)"}
                color={executeColor}
              >
                {animationDataExecuteToShow}
              </Globe>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
      {animationFetch && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          reverse={animationDataFetch.reverse}
          color={fetchColor}
        />
      )}
      {animationExecute && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          reverse={animationDataExecute.reverse}
          color={executeColor}
        />
      )}
      {animationBoth && (
        <>
          {animateInterminently ? (
            <BusAnimation
              edgePath={edgePath}
              id={id}
              reverse={animationDataFetch.reverse}
              color={fetchColor}
            />
          ) : (
            <BusAnimation
              edgePath={edgePath}
              id={id}
              reverse={animationDataExecute.reverse}
              color={executeColor}
            />
          )}
        </>
      )}
    </g>
  );
};
