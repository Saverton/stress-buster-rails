import React from "react";
import NavBar from "./NavBar";
import logo from "../assets/Logo.jpg";
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: var(--light-seafoam-green);
  max-height: 10em;
  width: 100%;
`;

const Title = styled.div`
  line-height: 1px;

  @media (max-width: 650px) {
    font-size: 10px;
  }
`;

const MainTitle = styled.h1`
  font-size: 3em;
  text-shadow: 3px 5px 5px white;
  margin-left: 1rem;
  width: max-content;
`;

const SubTitle = styled.h3`
  font-size: 1.25em;
  text-shadow: 3px 3px 5px white;
  margin-left: 3rem;
  width: max-content;

  @media (max-width: 500px) {
    width: fit-content;
    line-height: 1.5em;
  }
`;

const Logo = styled.img`
  max-height: 10em;
`;

const Username = styled.div`
  position: absolute;
  right: 10rem;
  z-index: 1;

  @media (max-width: 1150px) {
    right: 1rem;
  }

  @media (max-width: 750px) {
    left: -100vw;
  }
`;

function Header({currentUser, onUsername, onSetCurrentUser}) {
  return (
    <StyledHeader className= "flex row">
      <div>
        <Logo src={logo} alt="logo"></Logo>
      </div>
      <Title className="flex column">
        <MainTitle>Stress Buster</MainTitle>
        <SubTitle> Helping you cope with stress, one day at a time</SubTitle>
      </Title>

      <Username>
        {!currentUser ? '' :
        <p>Welcome: {onUsername.username}</p>}
      </Username>

      <div style={{position: 'relative', width: '100%'}}>
        <NavBar currentUser={currentUser} onSetCurrentUser={onSetCurrentUser} />
      </div>
    </StyledHeader>
  );
}

export default Header;
