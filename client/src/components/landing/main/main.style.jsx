import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { DEFAULT_MIN_WIDTH } from "../../../styles/constants";
import { DEFAULT_BTN_STYLES } from "../../../styles/Global";

export const MainContainer = styled.main`
  display: flex;
  justify-content: center;
`;

export const MainStyle = styled.div`
  --height: 150px;
  width: 90%;
  min-height: calc(100vh - var(--height));
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-top: 75px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: 85%;
    height: calc(100vh - var(--height));
  }
`;

export const ShowCase = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 50px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ShowCaseTitle = styled.h1`
  font-size: clamp(3rem, 5vw, 4.5rem);
  color: white;
  margin-bottom: 10px;
`;

export const ShowCaseParaph = styled.p`
  margin-bottom: 20px;
  color: #f9f9f9;
  font-size: 1.5rem;
`;

export const ShowCaseLink = styled(Link)`
  ${DEFAULT_BTN_STYLES}
  padding: 10px 40px !important;
  text-decoration: none;
  font-weight: 600;
`;

export const ShowCaseInfo = styled.p`
  color: #f2f2f2;
  font-size: 1.2rem;
  margin-left: 20px;
  display: none;

  @media (min-width: 450px) {
    display: block;
  }
`;

export const ShowCaseImg = styled.img`
  width: 100%;
`;
