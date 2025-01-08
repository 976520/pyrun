import styled from "styled-components";
import { Colors } from "../shared/Color";

const LineNumbersContainer = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 40px;
  padding: 12px 10px;
  background-color: ${Colors.background.secondary};
  border-right: 1px solid ${Colors.border.primary};
  color: ${Colors.text.secondary};
  font-family: monospace;
  font-size: 14px;
  line-height: 1.5;
  text-align: right;
  user-select: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  overflow: hidden;
`;

const LineNumbersContent = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
  left: 10px;
`;

interface LineNumbersProps {
  code: string;
}

export default function LineNumbers({ code }: LineNumbersProps) {
  const renderLineNumbers = () => {
    const lines = code.split("\n").length;
    return Array.from({ length: lines }, (_, i) => <div key={i + 1}>{i + 1}</div>);
  };

  return (
    <LineNumbersContainer>
      <LineNumbersContent className="line-numbers-content">{renderLineNumbers()}</LineNumbersContent>
    </LineNumbersContainer>
  );
}
