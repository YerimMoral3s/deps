import React, { useMemo } from "react";
import styled from "styled-components";
import { Container } from "./Container";
import { NavLink } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { FaMap } from "react-icons/fa";

const StyledNavbar = styled.nav`
  position: static;
  width: 100%;
  z-index: 1000;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
  }

  .nav-container {
    display: flex;

    .nav-content {
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: 15px; /* Espaciado entre los ítems */
      background-color: ${({ theme }) => theme.colors.accent};
      border-radius: 15px;
      padding: 10px 20px;
    }
  }
`;

const StyledNavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 10px;
  transition: background-color 0.3s ease;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    svg {
      color: ${({ theme }) => theme.colors.accentHover};
      font-size: 2rem;
      transition: color 0.3s ease;
    }

    &:hover svg {
      color: ${({ theme }) => theme.colors.secondaryBackground};
    }

    &.active svg {
      color: ${({ theme }) => theme.colors.secondaryBackground};
    }
  }
`;

export const Navbar: React.FC = () => {
  return (
    <StyledNavbar>
      <Container isWide className="nav-container">
        <div className="nav-content">
          <StyledNavItem>
            <NavLink to={"/"} aria-label="Home">
              <HiHome />
            </NavLink>
          </StyledNavItem>
          <StyledNavItem>
            <NavLink to={"/map"} aria-label="Map">
              <FaMap />
            </NavLink>
          </StyledNavItem>
        </div>
      </Container>
    </StyledNavbar>
  );
};
