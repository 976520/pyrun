import { useState, useRef, KeyboardEvent } from "react";
import { Colors } from "../shared/Color";
import styled from "styled-components";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import LineNumbers from "./LineNumbers";

const CodespaceContainer = styled.div`
  width: 95%;
  min-height: 500px;
  position: relative;
  background-color: ${Colors.background.primary};
  border-radius: 4px;
  padding: 0;
  margin: 20px auto;
  overflow: hidden;
`;

const CommonCodeStyles = () => `
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  min-height: 300px;
  padding: 12px 12px 12px 70px;
  font-family: "Hack", "Consolas", monospace;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  box-sizing: border-box;
`;

const CodeInput = styled.textarea`
  ${CommonCodeStyles()}
  padding: 12px 20px 12px 70px;
  border: 0px;
  border-radius: 4px;
  resize: none;
  background-color: transparent;
  color: transparent;
  caret-color: ${Colors.text.primary};
  tab-size: 2;
  overflow-y: auto;

  &::placeholder {
    color: ${Colors.text.placeholder};
  }

  &:focus {
    outline: none;
  }
`;

const CodeDisplay = styled.pre`
  ${CommonCodeStyles()}
  margin: 0;
  pointer-events: none;
  overflow-y: auto;
  background: transparent;
  color: ${Colors.text.primary};

  & .token.keyword {
    color: ${Colors.syntax.keyword};
  }
  & .token.string {
    color: ${Colors.syntax.string};
  }
  & .token.number {
    color: ${Colors.syntax.number};
  }
  & .token.comment {
    color: ${Colors.syntax.comment};
  }
  & .token.operator {
    color: ${Colors.syntax.operator};
  }
  & .token.function {
    color: ${Colors.syntax.function};
  }
  & .token.variable {
    color: ${Colors.syntax.variable};
  }
  & .token.type {
    color: ${Colors.syntax.type};
  }
`;

interface CodespaceProps {
  value?: string;
  onChange?: (code: string) => void;
}

export default function Codespace({ value = "", onChange }: CodespaceProps) {
  const [code, setCode] = useState(value);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const displayRef = useRef<HTMLPreElement>(null);

  const syncScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (textareaRef.current && displayRef.current) {
      if (target === textareaRef.current || target === displayRef.current) {
        displayRef.current.scrollTop = target.scrollTop;
        const lineNumbers = document.querySelector<HTMLElement>(".line-numbers-content");
        if (lineNumbers) {
          lineNumbers.style.transform = `translateY(-${target.scrollTop}px)`;
        }
      }
    }
  };

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

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const highlightCode = (code: string) => {
    return highlight(code, languages.typescript, "typescript");
  };

  return (
    <CodespaceContainer>
      <LineNumbers code={code} />
      <CodeInput
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onScroll={syncScroll}
        placeholder="코드 입력"
        spellCheck={false}
      />
      <CodeDisplay ref={displayRef} onScroll={syncScroll} dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </CodespaceContainer>
  );
}
