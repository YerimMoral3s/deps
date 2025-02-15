import { PropsWithChildren } from "react";
import styled from "styled-components";

type KebabMenuProps = PropsWithChildren & {
  isOpen: boolean;
  toggleOpen: () => void;
  items: { copy: string; onClick: () => void }[];
};

const KebabContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const Menu = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background || "#fff"};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.secondaryBackground || "#fff"};
  border-radius: 8px;
  overflow: hidden;
  z-index: 80;
  min-width: 100px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MenuItem = styled.div`
  border: none;
  cursor: pointer;
  background: none;
  text-align: left;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text || "#333"};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondaryBackground};
  padding: 0 0 5px 0;
`;

export const KebabMenu: React.FC<KebabMenuProps> = ({
  isOpen,
  toggleOpen,
  items,
}) => {
  return (
    <KebabContainer>
      <button onClick={toggleOpen}>Menu</button>
      {isOpen && (
        <Menu>
          {items.map((item, idx) => (
            <MenuItem key={idx} onClick={item.onClick}>
              <p>{item.copy}</p>
            </MenuItem>
          ))}
        </Menu>
      )}
    </KebabContainer>
  );
};
