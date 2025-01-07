import { useDispatch, useSelector } from "react-redux";
import Codespace from "../features/Codespace";
import Button from "../features/Button";
import Result from "../features/Result";
import { executeCode } from "../service/Code";
import styled from "styled-components";
import "../app/Global.css";
import { RootState } from "../store/store";
import { setCode, setOutput, setIsLoading } from "../store/codeSlice";

const ContentContainer = styled.main`
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

export default function Content() {
  const dispatch = useDispatch();
  const { code, output, language, isLoading } = useSelector((state: RootState) => state.code);

  const handleCodeChange = (newCode: string) => {
    dispatch(setCode(newCode));
  };

  const handleExecute = async () => {
    dispatch(setIsLoading(true));
    try {
      const result = await executeCode(code, language);
      if (result.error) {
        dispatch(setOutput(result.error));
      } else {
        dispatch(setOutput(result.output));
      }
    } catch (error) {
      dispatch(setOutput(error instanceof Error ? error.message : "ㅗ"));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return (
    <>
      <ContentContainer>
        <CodeSection>
          <Codespace value={code} onChange={handleCodeChange} />
          <ActionBar>
            <Button onClick={handleExecute} disabled={isLoading} variant="primary">
              {isLoading ? "실행 중..." : "실행"}
            </Button>
          </ActionBar>
        </CodeSection>
        <ResultSection>
          <Result output={output} />
        </ResultSection>
      </ContentContainer>
    </>
  );
}
