import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
}

const StyledButton = styled.button<Pick<ButtonProps, "variant">>`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = "primary" }) =>
    variant === "primary"
      ? `
    background-color: #528bff;
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: #4070dd;
    }
    `
      : `
    background-color: transparent;
    color: #528bff;
    border: 1px solid #528bff;
    
    &:hover:not(:disabled) {
      background-color: rgba(82, 139, 255, 0.1);
    }
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export default function Button({ children, onClick, disabled, variant }: ButtonProps) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} variant={variant}>
      {children}
    </StyledButton>
  );
}
