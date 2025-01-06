import { Language } from "../widgets/LanguageSelect";

interface ExecuteResponse {
  output: string;
  error?: string;
}

export async function executeCode(code: string, language: Language): Promise<ExecuteResponse> {
  try {
    const response = await fetch("http://localhost:8000/api/execute", {
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

    return await response.json();
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
