import { useSelector } from "react-redux";
import { BaseEdge, EdgeLabelRenderer } from "@xyflow/react";
import {
  controlUnitId,
  controlUnitCacheAddrBusId,
  cacheMemoryId,
} from "../../../containers/SimulatorSection/components";
import { useEffect, useMemo, useState } from "react";
import { usePosition } from "../../../hooks/usePosition";
import { BusAnimation } from "../BusAnimation";
import { Globe } from "../../Globe";
import { toHexaPadStart } from "../../../interpreter/utils";
import { typeSimulations } from "../../../interpreter/constants";
import { textAddressTitle } from "../utils";

export const ControlToCacheAddrBus = ({ id }) => {
  const typeSimulation = useSelector(
    (state) => state.application.typeSimulations
  );
  const [animateInterminently, setAnimateInterminently] = useState(false);

  const animations = useSelector(
    (state) => state.application.fetch.edgeAnimation
  );

  const executeAnimations = useSelector(
    (state) => state.application.execute.edgeAnimation
  );

  const fetchColor = useSelector((state) => state.application.fetch.color);
  const executeColor = useSelector((state) => state.application.execute.color);

  const animationDataFetch = useMemo(() => {
    return animations.find((anim) => anim.id === controlUnitCacheAddrBusId);
  }, [animations]);

  const animationDataExecute = useMemo(() => {
    return executeAnimations.find(
      (anim) => anim.id === controlUnitCacheAddrBusId
    );
  }, [executeAnimations]);

  const animationFetch = animationDataFetch && !animationDataExecute;
  const animationExecute = animationDataExecute && !animationDataFetch;
  const animationBoth = animationDataFetch && animationDataExecute;

  const [edgePath, labelX, labelY] = usePosition({
    edgeId: id,
    sourceComponentId: controlUnitId,
    targetComponentId: cacheMemoryId,
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
            transform: `translate(30px, -30px) translate(${labelX}px,${labelY}px)`,
          }}
          className="nodrag nopan"
        >
          {animationFetch && (
            <Globe
              arrowPosition={"left"}
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
              arrowPosition={"left"}
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
            <div className="column" style={{ marginTop: "-40px" }}>
              <Globe
                arrowPosition={"left"}
                title={"Dirección (Fetch)"}
                color={fetchColor}
              >
                {parseInt(animationDataFetch.address, 10)
                  .toString(16)
                  .toUpperCase()
                  .padStart(2, "0")}
              </Globe>
              <Globe
                arrowPosition={"left"}
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
        <BusAnimation
          edgePath={edgePath}
          id={id}
          color={fetchColor}
          reverse={animationDataFetch.reverse}
        />
      )}
      {animationExecute && (
        <BusAnimation
          edgePath={edgePath}
          id={id}
          color={executeColor}
          reverse={animationDataExecute.reverse}
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
