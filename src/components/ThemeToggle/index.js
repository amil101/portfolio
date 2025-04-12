import React from 'react';
import styled from 'styled-components';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0.5rem;
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 999;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <ToggleButton onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
    </ToggleButton>
  );
};

export default ThemeToggle; 