import styled from "styled-components";

export const Container = styled.div`
  align-self: center;
  color: var(--im-lightgray);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--im-primary);
  border-radius: 10px;
  width: 270px;
  gap: 5px;
  height: 80px;
  padding: 10px 15px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  cursor: grab;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 17px;
  display: flex;
  flex: 1;
`;

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 10px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--im-shadow);
`;

export const TableRow = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const TableCell = styled.div`
  padding: 2px;
  text-align: center;
  color: black;
  background-color: var(--im-white);
  border-left: 1px solid var(--im-gray);
  border-bottom: 1px solid var(--im-gray);
  display: flex;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  flex: 1.5;
`;
