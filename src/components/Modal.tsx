import React, { HTMLAttributes, ReactNode, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";

type ModalProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean; // ✅ Changed `isopen` to `isOpen` (React boolean prop convention)
  onClose: () => void;
  children: ReactNode;
  width?: string;
  height?: string;
};

// ✅ Styled components for Modal
const Overlay = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalWrapper = styled.div<{ width?: string; height?: string }>`
  background: white;
  width: ${({ width = "600px" }) => width};
  height: ${({ height = "auto" }) => height};
  min-height: 400px;
  max-height: 90%;
  max-width: 90%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: fadeIn 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.background};
  overflow: auto;
  display: flex;
  flex-direction: column;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CloseButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.accent};

  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  align-self: self-end;

  &:hover {
    background: transparent;
  }
`;

// ✅ Modal Component
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  width,
  height,
  ...rest
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"; // ✅ Disable scrolling when modal is open
    if (!isOpen) document.body.style.overflow = ""; // ✅ Disable scrolling when modal is open

    return () => {
      document.body.style.overflow = ""; // ✅ Ensure scroll is re-enabled when unmounting
    };
  }, [isOpen]);
  return (
    <Overlay $isOpen={isOpen} data-isopen={isOpen} onClick={onClose} {...rest}>
      {/* ✅ Added `data-isopen` for debugging */}
      <ModalWrapper
        width={width}
        height={height}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose}>
          <IoMdClose />
        </CloseButton>
        {children}
      </ModalWrapper>
    </Overlay>
  );
};
