import { useMemo, useState } from "react";
import {
  Container,
  TableContainer,
  TableRow,
  Title,
  ButtonsContainer,
  PaginationButton,
  CustomHandle,
  CellNumeration,
  CellValue,
  PaginationControls,
  CurrentPage,
  ViewAllButton,
  WrapperContainer,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import { mainMemoryId } from "../../containers/SimulatorSection/components";
import { setOpenMainMemoryModal } from "../../slices/modalsSlice";
import { convertValue } from "../../interpreter/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

export const MainMemory = () => {
  const dispatch = useDispatch();

  const mainMemoryCells = useSelector(
    (state) => state.application.execute.mainMemoryCells
  );
  const numericBase = useSelector((state) => state.application.numericBase);
  const mainMemryCellsToShow = useMemo(() => {
    return mainMemoryCells?.map((value) => convertValue(value, numericBase));
  }, [numericBase, mainMemoryCells]);

  const rowsPerPage = 32;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useMemo(
    () => Math.ceil(mainMemoryCells.length / rowsPerPage),
    [mainMemoryCells.length, rowsPerPage]
  );
  const currentData = useMemo(
    () =>
      mainMemryCellsToShow.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [mainMemryCellsToShow, currentPage, rowsPerPage]
  );
  const offset = useMemo(
    () => currentData.length * (currentPage - 1),
    [currentData.length, currentPage]
  );

  const openModal = () => dispatch(setOpenMainMemoryModal(true));

  return (
    <>
      <Container id={mainMemoryId}>
        <Title>Memoria principal</Title>
        <TableContainer>
          {currentData.map((cellValue, index) => (
            <TableRow key={index + offset} colSpan="2">
              <CellNumeration>
                {(index + offset).toString(16).toUpperCase().padStart(2, "0")}
              </CellNumeration>
              <CellValue>{cellValue}</CellValue>
            </TableRow>
          ))}
        </TableContainer>
        <WrapperContainer>
          <ButtonsContainer>
            <PaginationControls>
              <PaginationButton
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon
                  icon={faAngleDoubleLeft}
                  style={{ color: "var(--im-white)" }}
                />
              </PaginationButton>
              <PaginationButton
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  style={{ color: "var(--im-white)" }}
                />
              </PaginationButton>
              <CurrentPage>{currentPage}</CurrentPage>
              <PaginationButton
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ color: "var(--im-white)" }}
                />
              </PaginationButton>
              <PaginationButton
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon
                  icon={faAngleDoubleRight}
                  style={{ color: "var(--im-white)" }}
                />
              </PaginationButton>
            </PaginationControls>
          </ButtonsContainer>

          <ViewAllButton onClick={openModal} title="Ver todo">
            <FontAwesomeIcon icon={faExpand} />
          </ViewAllButton>
        </WrapperContainer>

        <CustomHandle type="source" position="left" />
        <CustomHandle type="target" position="left" />
      </Container>
    </>
  );
};
