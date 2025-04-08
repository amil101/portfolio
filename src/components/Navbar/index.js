import React from 'react';
import { Nav, NavLink, NavbarContainer, Span, NavLogo, NavItems, GitHubButton, ButtonContainer, MobileIcon, MobileMenu, MobileLink } from './NavbarStyledComponent';
import { DiCssdeck } from 'react-icons/di';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Bio } from '../../data/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo>
          <Link to="/" style={{ display: "flex", alignItems: "center", color: "white", marginBottom: '20;', cursor: 'pointer', textDecoration: 'none' }}>
            <DiCssdeck size="3rem" color="#854CE6" /> 
            <Span>
              <span style={{ color: "black", WebkitTextStroke: "1px white" }}>Amil</span> 
              <span style={{ color: "white", WebkitTextStroke: "1px black" }}> Vithanage</span>
            </Span>
          </Link>
        </NavLogo>
        <MobileIcon>
          <FaBars onClick={() => setIsOpen(!isOpen)} />
        </MobileIcon>
        <NavItems>
          <NavLink as={Link} to="/skills">Skills</NavLink>
          <NavLink as={Link} to="/experience">Experience</NavLink>
          <NavLink as={Link} to="/certifications">Certifications</NavLink>
          <NavLink as={Link} to="/education">Education</NavLink>
          <NavLink as={Link} to="/projects">Projects</NavLink>
        </NavItems>
        <ButtonContainer>
          <GitHubButton as={Link} to="/contact">Contact Me</GitHubButton>
        </ButtonContainer>
        {isOpen && (
          <React.Fragment>
            <MobileMenu isOpen={isOpen}>
              <MobileLink as={Link} to="/skills" onClick={() => setIsOpen(false)}>Skills</MobileLink>
              <MobileLink as={Link} to="/experience" onClick={() => setIsOpen(false)}>Experience</MobileLink>
              <MobileLink as={Link} to="/projects" onClick={() => setIsOpen(false)}>Projects</MobileLink>
              <MobileLink as={Link} to="/education" onClick={() => setIsOpen(false)}>Education</MobileLink>
              <MobileLink as={Link} to="/certifications" onClick={() => setIsOpen(false)}>Certifications</MobileLink>
              <MobileLink as={Link} to="/contact" onClick={() => setIsOpen(false)}>Contact Me</MobileLink>
            </MobileMenu>
          </React.Fragment>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
