import { Colors } from "../shared/Color";
import styled from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const ButtonView = styled.button<Pick<ButtonProps, "variant">>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = "primary" }) =>
    variant === "primary"
      ? `
    background-color: ${Colors.accent.blue};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: #4070dd;
    }
    `
      : `
    background-color: transparent;
    color: ${Colors.accent.blue};
    border: 1px solid ${Colors.accent.blue};
    
    &:hover:not(:disabled) {
      background-color: rgba(${Colors.accent.blue}, 0.1);
    }
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Button({ children, onClick, disabled, variant }: ButtonProps) {
  return (
    <ButtonView onClick={onClick} disabled={disabled} variant={variant}>
      {children}
    </ButtonView>
  );
}
