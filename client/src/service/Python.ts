interface ExecuteResponse {
  output: string;
  error?: string;
}

export async function executePython(code: string): Promise<ExecuteResponse> {
  try {
    const response = await fetch("http://localhost:8000/api/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Failed to execute code");
    }

    return await response.json();
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
