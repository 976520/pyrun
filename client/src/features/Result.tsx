import styled from "styled-components";
import { Colors } from "../shared/Color";

const ResultOutput = styled.div`
  width: 100%;
  height: 50%;
  min-height: 300px;
  padding: 12px;
  margin: 20px -20px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid ${Colors.border.primary};
  border-radius: 4px;
  background-color: ${Colors.background.primary};
  color: ${Colors.text.primary};
  white-space: pre-wrap;
  overflow-y: auto;
`;

interface ResultProps {
  output?: string;
}

export default function Result({ output = "" }: ResultProps) {
  return (
    <>
      <ResultOutput>{output}</ResultOutput>
    </>
  );
}
