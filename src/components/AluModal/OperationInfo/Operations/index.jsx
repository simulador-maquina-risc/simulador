import React from "react";
import { FaArrowDown } from "react-icons/fa";
import { Line } from "../styled";

export const AddTwoComplement = () => {
  return (
    <div className="row">
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>1</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "orange" }}>10</div>
      </div>
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>0</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>1</div>
      </div>
      <div className="column">
        <div>0</div>
        <div>0</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>0</div>
      </div>
    </div>
  );
};

export const OrOperation = () => {
  return (
    <div className="row">
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>1</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>1</div>
      </div>
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>0</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>1</div>
      </div>
      <div className="column">
        <div>0</div>
        <div>0</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>0</div>
      </div>
    </div>
  );
};

export const AndOperation = () => {
  return (
    <div className="row">
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>1</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>1</div>
      </div>
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>0</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>0</div>
      </div>
      <div className="column">
        <div>0</div>
        <div>0</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>0</div>
      </div>
    </div>
  );
};

export const XorOperation = () => {
  return (
    <div className="row">
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>1</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>0</div>
      </div>
      <div className="column" style={{ paddingRight: "20px" }}>
        <div>0</div>
        <div>1</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>1</div>
      </div>
      <div className="column">
        <div>0</div>
        <div>0</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>0</div>
      </div>
    </div>
  );
};

export const RotateOperation = () => {
  return (
    <div className="row">
      <div className="column">
        <div className="row">
          <div style={{ color: "green" }}>1010</div>
          <div style={{ color: "orange" }}>1100</div>
        </div>
        <FaArrowDown />
        <div>Rotar 4 bits</div>
        <FaArrowDown />
        <div className="row">
          <div style={{ color: "orange" }}>1100</div>
          <div style={{ color: "green" }}>1010</div>
        </div>
      </div>
    </div>
  );
};

export const EqualOperation = () => {
  return (
    <div className="row">
      <div className="column" style={{ paddingLeft: "5px" }}>
        <div>11011010</div>
        <div>11011010</div>
        <FaArrowDown />
        <div style={{ color: "green" }}>Iguales</div>
      </div>
      <div className="column" style={{ paddingLeft: "30px" }}>
        <div>10101100</div>
        <div>11000011</div>
        <FaArrowDown />
        <div style={{ color: "red" }}>Distintos</div>
      </div>
    </div>
  );
};