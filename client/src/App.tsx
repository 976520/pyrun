import Codespace from "./widgets/Codespace";
import Button from "./widgets/Button";
import Result from "./widgets/Result";

export default function App() {
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
      <Codespace />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button>Run</Button>
      </div>
      <Result />
    </div>
  );
}
