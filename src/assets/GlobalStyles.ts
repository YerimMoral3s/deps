import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Global Body Styles */
  body {
    background-color: ${({ theme }) => theme.colors.background};
  }


  /* Specific header styles */
  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.accent};
  }

  h2 {
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
  }

  h3 {
    font-size: 1.75rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }


  /* Links */
  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.colors.accentHover};
    }
  }

  /* Paragraphs */
  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
  }

  /* Span */
  span {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 400;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  /* Primary Button */
  button {
    background-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.accent};
    border-radius: 4px;
    padding: 10px 15px;
    transition: background-color 0.3s ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.colors.accentHover};
    }
      
    &:disabled {
      background-color: ${({ theme }) => theme.colors.textSecondary};
      color: ${({ theme }) => theme.colors.background};
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* Secondary Button */
  .secondary-button {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    border-radius: 4px;
    padding: 10px 15px;
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
      border-color: ${({ theme }) => theme.colors.accent};
    }

    &:disabled {
      background-color: ${({ theme }) => theme.colors.textSecondary};
      border-color: ${({ theme }) => theme.colors.textSecondary};
      color: ${({ theme }) => theme.colors.background};
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  /* Inputs and Textareas */
  input, textarea, select {
    background-color: ${({ theme }) => theme.colors.secondaryBackground};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.textSecondary};
    padding: 10px;
    border-radius: 4px;
    transition: border-color 0.3s ease-in-out;
    width: 100%;
    &:focus {
      border-color: ${({ theme }) => theme.colors.accent};
      outline: none;
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.accent};
    }
  }

  label {
    display: block; 
    font-size: 14px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 5px;
    transition: color 0.3s ease-in-out;
  }
`;

export default GlobalStyles;
