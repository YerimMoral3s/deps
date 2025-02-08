import React, { HTMLAttributes } from "react";
import styled from "styled-components";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  padding?: string;
  isWide?: boolean;
};

// Styled Component
const StyledContainer = styled.div<ContainerProps>`
  width: 100%;
  max-width: ${({ isWide }) => (isWide ? "1400px" : "1200px")};
  margin: 0 auto;
  padding: ${({ padding }) => padding || "1rem"};

  /* Media Queries */
  @media (min-width: 576px) {
    max-width: ${({ isWide }) => (isWide ? "700px" : "540px")};
  }

  @media (min-width: 768px) {
    max-width: ${({ isWide }) => (isWide ? "900px" : "720px")};
  }

  @media (min-width: 992px) {
    max-width: ${({ isWide }) => (isWide ? "1100px" : "960px")};
  }

  @media (min-width: 1200px) {
    max-width: ${({ isWide }) => (isWide ? "1240px" : "1140px")};
  }
`;

export const Container: React.FC<ContainerProps> = ({
  padding,
  isWide,
  children,
  ...props
}) => {
  return (
    <StyledContainer padding={padding} isWide={isWide} {...props}>
      {children}
    </StyledContainer>
  );
};
