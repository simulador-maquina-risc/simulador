import { ReactFlow, Controls, Background } from "@xyflow/react";
import {
  onNodesChange,
  onEdgesChange,
  onConnect,
} from "../../slices/applicationSlice";
import "@xyflow/react/dist/style.css";
import { useState } from "react";
import { Container } from "./styled";
import { nodeTypes, edgeTypes } from "./components";
import { useSelector, useDispatch } from "react-redux";
import { AluModal } from "../../components/AluModal";
import { ControlUnitModal } from "../../components/ControlUnitModal";
import MainMemoryModal from "../../components/MainMemoryModal";
import { InstructionsModal } from "../../components/InstructionsModal";
import { Tutorial } from "../../components/Tutorial";
import CalculatorModal from "../../components/CalculatorModal";

export const SimulatorContainer = () => {
  const nodes = useSelector((state) => state.application.nodes);
  const edges = useSelector((state) => state.application.edges);
  const proOptions = { hideAttribution: true };
  const dispatch = useDispatch();

  return (
    <Container>
      <ReactFlow
        id="simulatorContainer"
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(changes) => dispatch(onNodesChange(changes))}
        onEdgesChange={(changes) => dispatch(onEdgesChange(changes))}
        onConnect={(connection) => dispatch(onConnect(connection))}
        onNodeClick={() => {}} // permite que se pueda hacer click al nodo
        onEdgeMouseEnter={() => {}}
        proOptions={proOptions}
        nodesDraggable={false}
        elementsSelectable={true}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        fitView
        minZoom={0.4}
        colorMode="dark"
      >
        <Controls showInteractive={false} />
        <Background gap={20} />
      </ReactFlow>
      <AluModal />
      <ControlUnitModal />
      <MainMemoryModal />
      <InstructionsModal />
      <Tutorial />
      <CalculatorModal />
    </Container>
  );
};
