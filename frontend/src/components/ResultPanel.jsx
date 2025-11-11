import React, { useState } from "react";
import { Download } from "./icons/Download";
import { Copy } from "./icons/Copy"; 
import "./ResultPanel.css";

const ResultPanel = ({ result, loading }) => {
  const [copied, setCopied] = useState(false);

  if (loading) return <p className="loading">Analyzing your code...</p>;

  if (!result) {
    return (
      <div className="result-panel empty-state">
        <p className="empty-text">AI result will appear here after analysis...</p>
      </div>
    );
  }

  // --- handle both plain JSON & raw_output string ---
  let parsed = result;
  if (result.raw_output) {
    try {
      const clean = result.raw_output.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      parsed = { raw_output: result.raw_output };
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(parsed.refactored_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);  // reset after 2 sec
  };

  const downloadRefactor = (code) => {
  const ext = result.language?.toLowerCase() === "python" ? "py"
            : result.language?.toLowerCase() === "javascript" ? "js"
            : result.language?.toLowerCase() === "java" ? "java"
            : "txt";

  const blob = new Blob([code], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `refactored_code.${ext}`;
  link.click();
};


  return (
    <div className="result-panel">
      <h3 className="title">AI Review Result</h3>

      {parsed.code_smells && (
        <div className="section">
          <h4>🧩 Code Smells:</h4>
          <ul>
            {parsed.code_smells.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {parsed.time_complexity && (
        <div className="section">
          <h4>⏱️ Time Complexity:</h4>
          <p>{parsed.time_complexity}</p>
        </div>
      )}

      {parsed.space_complexity && (
        <div className="section">
          <h4>💾 Space Complexity:</h4>
          <p>{parsed.space_complexity}</p>
        </div>
      )}

      {parsed.refactored_code && (
        <div className="compare-wrapper">
          <div className="compare-box original-box">
            <h4>Original Code</h4>
            <pre className="code-block">{result.input_code}</pre>
          </div>

          <div className="compare-box refactor-box">
            <h4>Refactored Code</h4>
            <pre className="code-block">{parsed.refactored_code}</pre>
           <div className="actions-top-right">
            <div onClick={() => navigator.clipboard.writeText(parsed.refactored_code)}>
              <Copy width={22} height={22} stroke="#ffffff" />
            </div>


            <div onClick={() => downloadRefactor(parsed.refactored_code)}>
              <Download width={22} height={22} stroke="#ffffff" />
            </div>
          </div>


          </div>
        </div>
      )}


      {parsed.test_cases && (
        <div className="section">
          <h4>🧪 Suggested Test Cases:</h4>
          <ul>
            {parsed.test_cases.map((t, i) => (
              <li key={i}>{t.description ? t.description : t}</li>
            ))}
          </ul>
        </div>
      )}

      {parsed.raw_output && <pre className="code-block">{parsed.raw_output}</pre>}
    </div>
  );
};

export default ResultPanel;
