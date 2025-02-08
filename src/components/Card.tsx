import { HTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

type CardProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren;

const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  background-color: ${({ theme }) =>
    theme.colors.background}; /* Asegura fondo */
`;

export const Card = ({ children, ...rest }: CardProps) => {
  return <StyledCard {...rest}>{children}</StyledCard>;
};
