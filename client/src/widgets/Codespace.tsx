import { useState } from "react";
import styled from "styled-components";

const CodespaceContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const CodeInput = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #181a1f;
  border-radius: 4px;
  resize: vertical;
  background-color: #282c34;
  color: #abb2bf;

  &::placeholder {
    color: #5c6370;
  }

  &:focus {
    outline: none;
    border-color: #528bff;
    box-shadow: 0 0 0 2px rgba(82, 139, 255, 0.2);
  }
`;

interface CodespaceProps {
  value?: string;
  onChange?: (code: string) => void;
}

export default function Codespace({ value = "", onChange }: CodespaceProps) {
  const [code, setCode] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  };

  return (
    <CodespaceContainer>
      <CodeInput value={code} onChange={handleChange} placeholder="코드 입력" spellCheck={false} />
    </CodespaceContainer>
  );
}
