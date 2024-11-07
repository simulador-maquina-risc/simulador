import { React, useMemo } from "react";
import { setOpenMainMemoryModal } from "../../slices/modalsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalWrapper,
  ModalBoxSetup,
  ModalContainer,
  InfoContainer,
  Title,
  IconContainer,
  ModalBg,
  Table,
  CellData,
  CellDirection,
  Cell,
} from "./styled";
import { convertValue } from "../../interpreter/utils";

const MainMemoryModal = () => {
  const dispatch = useDispatch();

  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );
  const numericBase = useSelector((state) => state.application.numericBase);
  const showModal = useSelector((state) => state.modals.mainMemoryModal);
  const closeModal = () => dispatch(setOpenMainMemoryModal(false));

  const toHexa = (value, offset) => {
    return (value + offset).toString(16).toUpperCase().padStart(2, "0");
  };

  const mainMemoryCellsToShow = useMemo(() => {
    return mainMemoryCells?.map((value) => convertValue(value, numericBase));
  }, [numericBase, mainMemoryCells]);

  return (
    showModal && (
      <ModalWrapper>
        <ModalBoxSetup>
          <ModalContainer>
            <InfoContainer>
              <Title>Memoria principal</Title>
              <IconContainer onClick={closeModal}></IconContainer>
            </InfoContainer>

            <Table>
              {Array.from({ length: 8 }).map((_, columnIndex) =>
                mainMemoryCellsToShow
                  .slice(columnIndex * 32, (columnIndex + 1) * 32)
                  .map((value, rowIndex) => (
                    <Cell
                      key={`${columnIndex}-${rowIndex}`}
                      style={{
                        gridColumn: columnIndex + 1,
                        gridRow: rowIndex + 1,
                      }}
                    >
                      <CellDirection>
                        {toHexa(rowIndex, columnIndex * 32)}
                      </CellDirection>
                      <CellData>{value}</CellData>
                    </Cell>
                  ))
              )}
            </Table>
          </ModalContainer>
        </ModalBoxSetup>
        <ModalBg />
      </ModalWrapper>
    )
  );
};

export default MainMemoryModal;
