import React from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';

const StyledNavBar = styled.nav`
  background-color: white;
  border-radius: 10px;
  max-height: 1.75rem;
  padding:.25rem;
  position: absolute;
  bottom: 10px;
  right: 10%;
  width: max-content;
  min-width: max-content;

  @media (max-width: 600px) {
    overflow-x: scroll;
    max-width: calc(100vw - 160px - 30%);
    min-width: 0;
  }
`;

const NavButton = styled.button`
  background-color: var(--burnt-orange);
  color: #FFF;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin: 0 0.2rem;
  width: max-content;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledNavLink = styled(NavLink)`
  &.active {
    background-color: var(--burnt-orange);
    border-radius: 5px;
    box-shadow: 0 0 5px 2px var(--burnt-orange);
  }
`;

function NavBar() {
  return (
    <StyledNavBar className="flex row center">
      <StyledNavLink className="link" exact to="/">
        <NavButton>Dashboard</NavButton>
      </StyledNavLink>
      <StyledNavLink className="link" to="/journals/new">
        <NavButton>New Journal</NavButton>
      </StyledNavLink>
      <StyledNavLink className="link" to="/journals" exact>
        <NavButton>Past Journals</NavButton>
      </StyledNavLink>
      <StyledNavLink className="link" to="/forum">
        <NavButton>Community Forum</NavButton>
      </StyledNavLink>
      <StyledNavLink className="link" to="/about">
        <NavButton >About</NavButton>
      </StyledNavLink>
    </StyledNavBar>
  );
}

export default NavBar;
