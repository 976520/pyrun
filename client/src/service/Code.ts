import { Language } from "../widgets/LanguageSelect";

interface ExecuteResponse {
  output: string;
  error?: string;
}

export const executeCode = async (code: string, language: Language): Promise<ExecuteResponse> => {
  try {
    const response: Response = await fetch("http://localhost:8000/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, language }),
    });
    console.log(`${code} \n ${language}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const result: ExecuteResponse = await response.json();
    return result;
  } catch (error: unknown) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
