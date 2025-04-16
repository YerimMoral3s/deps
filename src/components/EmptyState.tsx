import styled from "styled-components";
import { MagnifyingVector } from "./MagnifyingVector";

const StyledEmptyState = styled.div`
  text-align: center;
  margin: 3rem auto;

  max-width: 40rem;
  h2 {
    color: ${({ theme }) => theme.colors.accentHover};
  }

  svg {
    width: 15rem;
    margin: 0 0 2rem 0;
  }
`;

export default function EmptyState(props: { copy: string }) {
  return (
    <StyledEmptyState>
      <MagnifyingVector />
      <h2>{props.copy}</h2>
    </StyledEmptyState>
  );
}
