import { useState } from "react";
import Codespace from "../features/Codespace";
import Button from "../features/Button";
import Result from "../features/Result";
import LanguageSelect, { Language } from "../features/LanguageSelect";
import { executeCode } from "../service/Code";
import styled from "styled-components";
import "../app/Global.css";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Content = styled.main`
  display: flex;
  gap: 24px;
  flex: 1;

  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

const CodeSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ResultSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

const ActionBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export default function Home() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>("python");

  const handleExecute = async () => {
    setIsLoading(true);
    try {
      const result = await executeCode(code, language);
      if (result.error) {
        setOutput(result.error);
      } else {
        setOutput(result.output);
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "ㅗ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header>
        <Controls>
          <LanguageSelect value={language} onChange={setLanguage} />
        </Controls>
      </Header>
      <Content>
        <CodeSection>
          <Codespace value={code} onChange={setCode} />
          <ActionBar>
            <Button onClick={handleExecute} disabled={isLoading} variant="primary">
              {isLoading ? "실행 중..." : "실행"}
            </Button>
          </ActionBar>
        </CodeSection>
        <ResultSection>
          <Result output={output} />
        </ResultSection>
      </Content>
    </>
  );
}
