import styled from "styled-components";
import { Colors } from "../shared/Color";
import { PythonIcon } from "../shared/PythonIcon";
import { CIcon } from "../shared/CIcon";
import { JavaIcon } from "../shared/JavaIcon";
import { KotlinIcon } from "../shared/KotlinIcon";
import { TypescriptIcon } from "../shared/TypescriptIcon";
import { CppIcon } from "../shared/CppIcon";
import { JavascriptIcon } from "../shared/JavascriptIcon";

export type Language = "c" | "cpp" | "python" | "java" | "kotlin" | "javascript" | "typescript";

interface ContainerProps {
  children: React.ReactNode;
}

interface LanguageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  children: React.ReactNode;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  background-color: ${Colors.background.secondary};
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
`;

const LanguageButton = styled.button<LanguageButtonProps>`
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

interface LanguageSelectProps {
  value: Language;
  onChange: (language: Language) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ value, onChange }) => {
  const handleLanguageChange = (language: Language): void => {
    onChange(language);
  };

  return (
    <Container>
      <LanguageButton active={value === "c"} onClick={() => handleLanguageChange("c")}>
        <CIcon />
      </LanguageButton>
      <LanguageButton active={value === "cpp"} onClick={() => handleLanguageChange("cpp")}>
        <CppIcon />
      </LanguageButton>
      <LanguageButton active={value === "python"} onClick={() => handleLanguageChange("python")}>
        <PythonIcon />
      </LanguageButton>
      <LanguageButton active={value === "java"} onClick={() => handleLanguageChange("java")}>
        <JavaIcon />
      </LanguageButton>
      <LanguageButton active={value === "kotlin"} onClick={() => handleLanguageChange("kotlin")}>
        <KotlinIcon />
      </LanguageButton>
      <LanguageButton active={value === "javascript"} onClick={() => handleLanguageChange("javascript")}>
        <JavascriptIcon />
      </LanguageButton>
      <LanguageButton active={value === "typescript"} onClick={() => handleLanguageChange("typescript")}>
        <TypescriptIcon />
      </LanguageButton>
    </Container>
  );
};

export default LanguageSelect;
