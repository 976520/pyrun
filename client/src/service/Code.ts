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

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // 코드 컴파일 실패 한 경우 = 400

    return await response.json();
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
