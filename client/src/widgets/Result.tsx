import styled from "styled-components";

const ResultContainer = styled.div`
  width: 100%;
  padding: 20px;
`;

const ResultOutput = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 12px;
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #181a1f;
  border-radius: 4px;
  background-color: #282c34;
  color: #abb2bf;
  white-space: pre-wrap;
  overflow-y: auto;
`;

interface ResultProps {
  output?: string;
}

export default function Result({ output = "" }: ResultProps) {
  return (
    <ResultContainer>
      <ResultOutput>{output}</ResultOutput>
    </ResultContainer>
  );
}
