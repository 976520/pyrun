import { Language } from "../features/LanguageSelect";
import axios from "axios";

interface ExecuteResponse {
  output: string;
  error?: string;
}

export const executeCode = async (code: string, language: Language): Promise<ExecuteResponse> => {
  try {
    const response = await axios.post<ExecuteResponse>("http://localhost:8000/api/execute", {
      code,
      language,
    });
    console.log(`${code} \n ${language}`);

    return response.data;
  } catch (error: unknown) {
    return {
      output: "",
      error: axios.isAxiosError(error) ? error.message : "?",
    };
  }
};
