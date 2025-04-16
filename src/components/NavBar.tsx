import React from "react";
import styled from "styled-components";
import { Container } from "./Container";
import { NavLink } from "react-router-dom";

const StyledNavbar = styled.nav`
  width: 100%;
  z-index: 90;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .nav-container {
    display: flex;
  }
`;

const StyledNavContent = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledNavItem = styled.div`
  a {
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 10px 15px;
    color: ${({ theme }) => theme.colors.text};
    transition: color 0.3s ease-in-out, border-bottom 0.3s ease-in-out;
    border-bottom: 3px solid transparent;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }

    &.active {
      color: ${({ theme }) => theme.colors.accent};
      border-bottom: 3px solid ${({ theme }) => theme.colors.accent};
    }
  }
`;

export const Navbar: React.FC = () => {
  return (
    <StyledNavbar>
      <Container className="nav-container">
        <StyledNavContent>
          <StyledNavItem>
            <NavLink
              to="/buildings"
              aria-label="Casas"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Casas
            </NavLink>
            <NavLink
              to="/tenants"
              aria-label="Tenants"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Inquilinos
            </NavLink>
          </StyledNavItem>
        </StyledNavContent>
      </Container>
    </StyledNavbar>
  );
};
