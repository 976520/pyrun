import { useState } from "react";
import Codespace from "./widgets/Codespace";
import Button from "./widgets/Button";
import Result from "./widgets/Result";
import { executePython } from "./service/Python";

export default function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExecute = async () => {
    setIsLoading(true);
    try {
      const result = await executePython(code);
      if (result.error) {
        setOutput(result.error);
      } else {
        setOutput(result.output);
      }
    } catch (error) {
      setOutput(error instanceof Error ? error.message : "Failed to execute code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <Codespace value={code} onChange={setCode} />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleExecute} disabled={isLoading}>
          {isLoading ? "실행 중..." : "실행"}
        </Button>
      </div>
      <Result output={output} />
    </div>
  );
}
