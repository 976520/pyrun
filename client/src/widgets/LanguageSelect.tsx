import styled from "styled-components";
import { Colors } from "../shared/color";

export type Language = "python" | "c" | "java";

const Select = styled.select`
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid ${Colors.border.primary};
  background-color: ${Colors.background.primary};
  color: ${Colors.text.primary};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${Colors.accent.blue};
    box-shadow: 0 0 0 2px rgba(${Colors.accent.blue}, 0.2);
  }
`;

interface LanguageSelectProps {
  value: Language;
  onChange: (language: Language) => void;
}

export default function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value as Language)}>
      <option value="python">Python</option>
      <option value="c">C</option>
      <option value="java">Java</option>
    </Select>
  );
}
