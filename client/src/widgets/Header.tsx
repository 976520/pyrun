import { useState } from "react";
import LanguageSelect, { Language } from "../features/LanguageSelect";
import styled from "styled-components";
import "../app/Global.css";
import { executeCode } from "../service/Code";

const HeaderContainer = styled.header`
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

export default function Header() {
  const [language, setLanguage] = useState<Language>("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <HeaderContainer>
        <Controls>
          <LanguageSelect value={language} onChange={setLanguage} />
        </Controls>
      </HeaderContainer>
    </>
  );
}
