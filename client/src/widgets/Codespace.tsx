import { useState, useRef, KeyboardEvent } from "react";
import styled from "styled-components";

const CodespaceContainer = styled.div`
  width: 100%;
  padding: 20px;
  position: relative;
  background-color: #282c34;
  border-radius: 4px;
`;

const LineNumbers = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  bottom: 20px;
  width: 40px;
  padding: 12px 0;
  background-color: #21252b;
  border-right: 1px solid #181a1f;
  color: #495162;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  text-align: right;
  user-select: none;
`;

const CodeInput = styled.textarea`
  width: 90%;
  min-height: 300px;
  padding: 12px 12px 12px 55px;
  font-family: "Hack", "Consolas", monospace;
  font-size: 14px;
  line-height: 1.5;
  border: 0px;
  border-radius: 4px;
  resize: vertical;
  background-color: #282c34;
  color: #abb2bf;
  tab-size: 2;

  &::placeholder {
    color: #5c6370;
  }

  &:focus {
    outline: none;
  }
`;

interface CodespaceProps {
  value?: string;
  onChange?: (code: string) => void;
}

export default function Codespace({ value = "", onChange }: CodespaceProps) {
  const [code, setCode] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onChange?.(newCode);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;

      const newCode = code.substring(0, start) + "  " + code.substring(end);
      setCode(newCode);
      onChange?.(newCode);

      // 커서 위치 조정
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const renderLineNumbers = () => {
    const lines = code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => <div key={i + 1}>{i + 1}</div>);
  };

  return (
    <CodespaceContainer>
      <LineNumbers>{renderLineNumbers()}</LineNumbers>
      <CodeInput
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="코드 입력"
        spellCheck={false}
      />
    </CodespaceContainer>
  );
}
