import styled from "styled-components";

const StyledDots = styled.div`
  display: flex;
  justify-content: center;
  .loader {
    width: 60px;
    aspect-ratio: 4;
    background: radial-gradient(
        circle closest-side,
        ${({ theme }) => theme.colors.accent} 90%,
        #0000
      )
      0 / calc(100% / 3) 100% space;
    clip-path: inset(0 100% 0 0);
    animation: l1 1s steps(4) infinite;
  }
  @keyframes l1 {
    to {
      clip-path: inset(0 -34% 0 0);
    }
  }
`;

export function Dots() {
  return (
    <StyledDots>
      <div className="loader"></div>
    </StyledDots>
  );
}
