import React from "react";
import { BaseEdge } from "@xyflow/react";

export const BusAnimation = ({ edgePath, id, reverse, color }) => {
  return (
    <>
      <BaseEdge id={id} path={edgePath} style={{ stroke: "none" }} />
      <g>
        <path
          d={edgePath}
          stroke={"black"} // Color del contorno
          strokeWidth={9} // Grosor del contorno, mayor que el de la línea principal
          strokeDasharray="20,15"
          strokeLinecap="round"
          fill="none"
          style={{
            animation: `dash 15s linear infinite ${reverse ? "" : "reverse"}`,
          }}
        />
        <path
          d={edgePath}
          stroke={color || "black"}
          strokeWidth={7}
          strokeDasharray="20,15"
          strokeDashoffset="0"
          strokeLinecap="round"
          fill="none"
          style={{
            animation: `dash 15s linear infinite ${reverse ? "" : "reverse"}`,
          }}
        />
      </g>
    </>
  );
};
