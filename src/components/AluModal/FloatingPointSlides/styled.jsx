import styled from "styled-components";

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  align-items: center;
  padding: 30px;
  margin-right: 20px;
  justify-content: center;
  color: var(--im-lightgray);
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 10px;
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 5px;
  margin-bottom: 8px;
  font-size: 16px;
`;

export const Line = styled.div`
  background-color: var(--im-lightgray);
  height: 2px;
  margin: 10px 0;
  width: 100%;
`;

export const BitsRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RowOperation = styled(Row)`
  margin-bottom: 15px;
  align-items: center;
`;

export const InitialSignBit = styled.span`
  color: var(--im-lightgreen);
  cursor: help;
  position: relative;

  &::after {
    content: "Bit de signo";
    visibility: hidden;
    width: 150px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  &:hover::after {
    visibility: visible;
    opacity: 75%;
  }
`;

export const SignBit = styled.span`
  color: var(--im-lightgreen);
`;

export const InitialExponentBits = styled.span`
  color: var(--im-teal);
  cursor: help;
  position: relative;

  &::after {
    content: "Bits de exponente";
    visibility: hidden;
    width: 150px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  &:hover::after {
    visibility: visible;
    opacity: 75%;
  }
`;

export const ExponentBits = styled.span`
  color: var(--im-teal);
`;

export const InitialMantissaBits = styled.span`
  color: var(--im-lightblue);
  cursor: help;
  position: relative;

  &::after {
    content: "Bits de mantisa";
    visibility: hidden;
    width: 150px;
    background-color: black;
    color: white;
    text-align: center;
    border-radius: 10px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -75px;
    opacity: 0;
    transition: opacity 0.3s;
    white-space: nowrap;
  }

  &:hover::after {
    visibility: visible;
    opacity: 75%;
  }
`;

export const MantissaBits = styled.span`
  color: var(--im-lightblue);
`;

export const Ball = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
`;

export const ResultRows = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const OperationName = styled.div`
  border-radius: 15px;
  background-color: var(--im-white);
  padding: 5px 10px;
  color: var(--im-primary);
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

export const SlidesButtonsContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const SlidesContainer = styled.div`
  min-height: 170px;
`;

export const Slide = styled.div``;
