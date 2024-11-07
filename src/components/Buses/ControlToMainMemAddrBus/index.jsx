import { useSelector } from "react-redux";
import { BaseEdge, EdgeLabelRenderer } from "@xyflow/react";
import {
  controlUnitId,
  mainMemoryId,
  controlUnitMainMemAddrId,
} from "../../../containers/SimulatorSection/components";
import { useEffect, useMemo, useState } from "react";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { typeSimulations } from "../../../interpreter/constants";
import { toHexaPadStart } from "../../../interpreter/utils";
import { textAddressTitle } from "../utils";

export const ControlToMainMemAddrBus = ({ id }) => {
  const [animateInterminently, setAnimateInterminently] = useState(false);
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

  const animationDataFetch = useMemo(() => {
    return animations.find((anim) => anim.id === controlUnitMainMemAddrId);
  }, [animations, executeAnimations]);

  const animationDataExecute = useMemo(() => {
    return executeAnimations.find(
      (anim) => anim.id === controlUnitMainMemAddrId
    );
  }, [executeAnimations]);

  const animationFetch = animationDataFetch && !animationDataExecute;
  const animationExecute = animationDataExecute && !animationDataFetch;
  const animationBoth = animationDataFetch && animationDataExecute;

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: controlUnitId,
    targetComponentId: mainMemoryId,
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
            transform: `translate(-50%, 40%) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {animationFetch && (
            <Globe
              arrowPosition={"top"}
              title={textAddressTitle("Dirección (Fetch)", typeSimulation)}
              color={fetchColor}
            >
              {parseInt(animationDataFetch.address, 10)
                .toString(16)
                .toUpperCase()
                .padStart(2, "0")}
            </Globe>
          )}
          {animationExecute && (
            <Globe
              arrowPosition={"top"}
              title={textAddressTitle("Dirección (Execute)", typeSimulation)}
              color={executeColor}
            >
              {parseInt(animationDataExecute.address, 10)
                .toString(16)
                .toUpperCase()
                .padStart(2, "0")}
            </Globe>
          )}
          {animationBoth && (
            <div className="row">
              <Globe
                arrowPosition={"top"}
                title={"Dirección (Fetch)"}
                color={fetchColor}
              >
                {parseInt(animationDataFetch.address, 10)
                  .toString(16)
                  .toUpperCase()
                  .padStart(2, "0")}
              </Globe>
              <Globe
                arrowPosition={"top"}
                title={"Dirección (Execute)"}
                color={executeColor}
              >
                {parseInt(animationDataExecute.address, 10)
                  .toString(16)
                  .toUpperCase()
                  .padStart(2, "0")}
              </Globe>
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
      {animationFetch && (
        <BusAnimation edgePath={edgePath} id={id} color={fetchColor} />
      )}
      {animationExecute && (
        <BusAnimation edgePath={edgePath} id={id} color={executeColor} />
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
