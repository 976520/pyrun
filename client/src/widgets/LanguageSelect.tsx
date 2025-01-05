import styled from "styled-components";
import { Colors } from "../shared/Color";
import { PythonIcon } from "../shared/PythonIcon";
import { CIcon } from "../shared/CIcon";
import { JavaIcon } from "../shared/JavaIcon";
import { KotlinIcon } from "../shared/KotlinIcon";
import { TypescriptIcon } from "../shared/TypescriptIcon";
import { CppIcon } from "../shared/CppIcon";
import { JavascriptIcon } from "../shared/JavascriptIcon";

export type Language = "python" | "c" | "java" | "kotlin" | "typescript" | "cpp" | "javascript";

const Container = styled.div`
  display: flex;
  background-color: ${Colors.background.secondary};
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
`;

const LanguageButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (props.active ? Colors.background.darkened : "transparent")};
  transition: all 0.2s ease;

  svg {
    opacity: ${(props) => (props.active ? 1 : 0.5)};
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

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <Container>
      <LanguageButton active={value === "c"} onClick={() => onChange("c")}>
        <CIcon />
      </LanguageButton>
      <LanguageButton active={value === "cpp"} onClick={() => onChange("cpp")}>
        <CppIcon />
      </LanguageButton>
      <LanguageButton active={value === "python"} onClick={() => onChange("python")}>
        <PythonIcon />
      </LanguageButton>
      <LanguageButton active={value === "java"} onClick={() => onChange("java")}>
        <JavaIcon />
      </LanguageButton>
      <LanguageButton active={value === "kotlin"} onClick={() => onChange("kotlin")}>
        <KotlinIcon />
      </LanguageButton>
      <LanguageButton active={value === "javascript"} onClick={() => onChange("javascript")}>
        <JavascriptIcon />
      </LanguageButton>
      <LanguageButton active={value === "typescript"} onClick={() => onChange("typescript")}>
        <TypescriptIcon />
      </LanguageButton>
    </Container>
  );
}
