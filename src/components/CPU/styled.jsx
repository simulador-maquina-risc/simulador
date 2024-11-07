import styled from "styled-components";
import CPU_BACKGROUND from '../../assets/cpu_simple.jpg'

export const Container = styled.div`
  align-self: center;
  color: white;
  text-align: left;
  justify-content: start;
  display: flex;
  justify-content: center;
  padding-top: 20px;
  background-color: var(--im-gray);
  border-radius: 10px;
  width: 1300px;
  height: 1100px;
  overflow: hidden;
  background-image: url(${CPU_BACKGROUND});
  background-blend-mode: multiply;
  opacity: 0.7;
  background-size: 125%;
  background-position: -65px -40px;
  box-shadow: rgba(118, 148, 148, 0.25) 10px 50px 50px -90px,
    rgba(139, 139, 139, 0.3) 0px 30px 60px -30px,
    rgba(170, 142, 142, 0.263) 0px 0px 20px 2px;
  z-index: -1;
`;
