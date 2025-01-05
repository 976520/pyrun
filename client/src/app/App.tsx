import { useState } from "react";
import Codespace from "../widgets/Codespace";
import Button from "../widgets/Button";
import Result from "../widgets/Result";
import LanguageSelect, { Language } from "../widgets/LanguageSelect";
import { executeCode } from "../service/Code";
import styled from "styled-components";
import { Colors } from "../shared/color";
import "./Global.css";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 20px;
  height: 90vh;
  box-sizing: border-box;
  background-color: ${Colors.background.darkened};
`;

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

const MainContent = styled.main`
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

export default function App() {
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
    <AppContainer>
      <Header>
        <Controls>
          <LanguageSelect value={language} onChange={setLanguage} />
        </Controls>
      </Header>
      <MainContent>
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
      </MainContent>
    </AppContainer>
  );
}
