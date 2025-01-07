import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Colors } from "../shared/Color";
import { PythonIcon } from "../shared/PythonIcon";
import { CIcon } from "../shared/CIcon";
import { JavaIcon } from "../shared/JavaIcon";
import { KotlinIcon } from "../shared/KotlinIcon";
import { TypescriptIcon } from "../shared/TypescriptIcon";
import { CppIcon } from "../shared/CppIcon";
import { JavascriptIcon } from "../shared/JavascriptIcon";
import LanguageSelectButton from "./LanguageSelectButton";
import { RootState } from "../store/store";
import { setLanguage } from "../store/codeSlice";

export type Language = "c" | "cpp" | "python" | "java" | "kotlin" | "javascript" | "typescript";

interface ContainerProps {
  children: React.ReactNode;
}

const LanguageSelectContainer = styled.div<ContainerProps>`
  display: flex;
  background-color: ${Colors.background.secondary};
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
`;

const LanguageSelect: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.code.language);

  const handleLanguageChange = (newLanguage: Language) => {
    dispatch(setLanguage(newLanguage));
  };

  return (
    <LanguageSelectContainer>
      <LanguageSelectButton active={language === "c"} onClick={() => handleLanguageChange("c")}>
        <CIcon />
      </LanguageSelectButton>
      <LanguageSelectButton active={language === "cpp"} onClick={() => handleLanguageChange("cpp")}>
        <CppIcon />
      </LanguageSelectButton>
      <LanguageSelectButton active={language === "python"} onClick={() => handleLanguageChange("python")}>
        <PythonIcon />
      </LanguageSelectButton>
      <LanguageSelectButton active={language === "java"} onClick={() => handleLanguageChange("java")}>
        <JavaIcon />
      </LanguageSelectButton>
      <LanguageSelectButton active={language === "kotlin"} onClick={() => handleLanguageChange("kotlin")}>
        <KotlinIcon />
      </LanguageSelectButton>
      <LanguageSelectButton active={language === "javascript"} onClick={() => handleLanguageChange("javascript")}>
        <JavascriptIcon />
      </LanguageSelectButton>
      <LanguageSelectButton active={language === "typescript"} onClick={() => handleLanguageChange("typescript")}>
        <TypescriptIcon />
      </LanguageSelectButton>
    </LanguageSelectContainer>
  );
};

export default LanguageSelect;
