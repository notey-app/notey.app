import styled from "styled-components";
import { PRIMARY, WHITE, GREEN, DARK_GRAY_2 } from "../../styles/colors";
import { SIDEBAR_WIDTH_FULL, DEFAULT_MIN_WIDTH } from "../../styles/constants";

export const SidebarContainer = styled.div`
  grid-area: aside;
  width: ${SIDEBAR_WIDTH_FULL};
  height: 100%;
  display: none;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: block;
  }
`;

export const SidebarActive = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: none;
  pointer-events: none;

  &.active {
    display: block;
    pointer-events: all;
  }

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    &.active {
      display: none;
      pointer-events: none;
    }
  }
`;

export const SidebarStyle = styled.div`
  z-index: 25;
  position: fixed;
  width: ${SIDEBAR_WIDTH_FULL};
  max-width: 95%;
  padding: 10px;
  background-color: ${PRIMARY};
  top: 0;
  left: -${SIDEBAR_WIDTH_FULL};
  bottom: 0;
  overflow-x: hidden;
  transition: left 200ms;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 30px auto 50px;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    left: 0;
    width: ${SIDEBAR_WIDTH_FULL};
  }

  &.active {
    left: 0;
    transition: left 0.3s;
  }
`;

export const SidebarHeader = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: calc(${SIDEBAR_WIDTH_FULL} - 55px) auto;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    grid-template-columns: auto;
  }
`;

export const CloseSidebarBtn = styled.button`
  border: none;
  background: none;
  font-size: 2rem;
  cursor: pointer;
  display: flex;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    display: none;
  }

  & svg {
    fill: ${GREEN};
  }
`;

export const SearchForm = styled.form`
  display: flex;
`;

export const SearchInput = styled.input`
  width: 80%;
  padding: 5px;
  font-size: 1.2rem;
  border: 2px solid ${GREEN};
  border-right: none;
  background-color: ${DARK_GRAY_2};
  color: ${GREEN};
  border-radius: 0;

  @media (min-width: ${DEFAULT_MIN_WIDTH}) {
    width: 90%;
  }
`;

export const SearchBtn = styled.button`
  padding: 5px 10px;
  border: 1px solid ${GREEN};
  background-color: ${GREEN};
  color: ${WHITE};
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 0;
`;

export const SidebarBody = styled.div`
  margin-top: 10px;
  width: calc(${SIDEBAR_WIDTH_FULL} - 20px);
`;

export const SidebarNote = styled.a`
  cursor: pointer;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${GREEN};
  transition: background 200ms, color 0.1s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${PRIMARY};
  border: 1px solid ${PRIMARY};
  border-radius: 0;

  @media (hover: hover) {
    &:hover {
      color: ${PRIMARY};
      background-color: ${GREEN};
    }
  }

  &.active {
    color: ${PRIMARY};
    background-color: ${GREEN};
  }
`;

export const OpenOptionsModalBtn = styled.button`
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: ${PRIMARY};
  color: ${GREEN};
  border: solid ${GREEN};
  border-width: 2px 0px 2px 0px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  @media (hover: hover) {
    &:hover {
      background-color: ${GREEN};
      color: ${PRIMARY};
    }
  }
`;