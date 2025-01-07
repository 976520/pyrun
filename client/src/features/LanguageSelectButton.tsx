import { Colors } from "../shared/Color";
import styled from "styled-components";

interface LanguageSelectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  children: React.ReactNode;
}

const LanguageSelectButton = styled.button<LanguageSelectButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${({ active }) => (active ? Colors.background.darkened : "transparent")};
  transition: all 0.2s ease;

  svg {
    opacity: ${({ active }) => (active ? 1 : 0.5)};
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: ${Colors.background.darkened};
    svg {
      opacity: 0.8;
    }
  }
`;

export default LanguageSelectButton;
