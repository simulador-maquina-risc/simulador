import { getSmoothStepPath, Position } from "@xyflow/react";
import { useSelector } from "react-redux";
import {
  aluRegistersId,
  registerAluTopId,
  registerAluBottomId,
  controlUnitCacheId,
  mainMemControlUnitDataId,
  controlUnitMainMemAddrId,
  registersControlUnitId,
  controlUnitCacheAddrBusId,
} from "../containers/SimulatorSection/components";
import { useMemo } from "react";

export const usePosition = ({
  edgeId,
  sourceComponentId,
  targetComponentId,
  position,
}) => {
  const nodes = useSelector((state) => state.application.nodes);

  const getComponentInfo = (id) => {
    return {
      height: document.getElementById(id)?.offsetHeight,
      width: document.getElementById(id)?.offsetWidth,
      position: nodes.find((node) => node.id === id).position,
    };
  };

  const sourceComponent = useMemo(
    () => getComponentInfo(sourceComponentId),
    [sourceComponentId, nodes]
  );
  const targetComponent = useMemo(
    () => getComponentInfo(targetComponentId),
    [targetComponentId, nodes]
  );

  const positions = useMemo(() => {
    switch (edgeId) {
      case aluRegistersId:
        return {
          sourceX: sourceComponent.position.x + sourceComponent.width,
          sourceY: sourceComponent.position.y + sourceComponent.height / 2,
          targetX: targetComponent.position.x + targetComponent.width / 2,
          targetY: targetComponent.position.y + targetComponent.height,
          offset: 60,
          sourcePosition: Position.Right,
          targetPosition: Position.Bottom,
        };
      case registerAluBottomId:
      case registerAluTopId:
        return {
          sourceX: sourceComponent.position.x + sourceComponent.width,
          sourceY: sourceComponent.position.y + sourceComponent.height / 2,
          targetX: targetComponent.position.x,
          targetY:
            targetComponent.position.y +
            (position === "top"
              ? targetComponent.height / 6
              : targetComponent.height / 1.2),
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        };
      case controlUnitCacheId:
        return {
          sourceX: targetComponent.position.x + targetComponent.width / 3,
          sourceY: sourceComponent.position.y,
          targetX: targetComponent.position.x + targetComponent.width / 3,
          targetY: targetComponent.position.y + targetComponent.height,
          sourcePosition: Position.Top,
          targetPosition: Position.Bottom,
        };
      case mainMemControlUnitDataId:
        return {
          sourceX: sourceComponent.position.x,
          sourceY: targetComponent.position.y + targetComponent.height / 2.5,
          targetX: targetComponent.position.x + targetComponent.width,
          targetY: targetComponent.position.y + targetComponent.height / 2.5,
          sourcePosition: Position.Left,
          targetPosition: Position.Right,
        };
      case controlUnitMainMemAddrId:
        return {
          sourceX: sourceComponent.position.x + sourceComponent.width,
          sourceY: sourceComponent.position.y + sourceComponent.height / 1.5,
          targetX: targetComponent.position.x,
          targetY: sourceComponent.position.y + sourceComponent.height / 1.5,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        };
      case registersControlUnitId:
        return {
          sourceX: sourceComponent.position.x + 10,
          sourceY: sourceComponent.height / 3.1,
          targetX: targetComponent.position.x,
          targetY: sourceComponent.height / 3.1,
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
        };
      case controlUnitCacheAddrBusId:
        return {
          sourceX: targetComponent.position.x + targetComponent.width / 1.5,
          sourceY: sourceComponent.position.y + sourceComponent.height,
          targetX: targetComponent.position.x + targetComponent.width / 1.5,
          targetY: targetComponent.position.y,
          sourcePosition: Position.Top,
          targetPosition: Position.Bottom,
        };

      default:
        console.log("ERROR", edgeId);
    }
  }, [sourceComponent, targetComponent, position, sourceComponentId]);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: positions.sourceX,
    sourceY: positions.sourceY,
    targetX: positions.targetX,
    targetY: positions.targetY,
    offset: positions.offset,
    sourcePosition: positions.sourcePosition,
    targetPosition: positions.targetPosition,
  });

  return [edgePath, labelX, labelY];
};
