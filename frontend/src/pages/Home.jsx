import React, { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import ResultPanel from "../components/ResultPanel";
import { analyzeCode } from "../utils/api";
import "./Home.css";

function Home() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("editor"); // "editor" | "result"
  

  const handleAnalyze = async () => {
    if (!code.trim()) return alert("Please paste or type code first!");
    setLoading(true);
    const data = await analyzeCode(code);
    data.input_code = code;
    setResult(data);
    setLoading(false);
    setActiveTab("result");
  };


  return (
    <div className={`home-container ${activeTab === "result" ? "mobile-output" : ""}`}>
      {/* MOBILE: Tabs at the very top */}
      <div className="mobile-tabs">
        <button
          className={activeTab === "editor" ? "active" : ""}
          onClick={() => setActiveTab("editor")}
        >
          Main.js
        </button>
        <button
          className={activeTab === "result" ? "active" : ""}
          onClick={() => setActiveTab("result")}
        >
          Output
        </button>
      </div>

      {/* MOBILE: Analyze button only on Editor tab */}
      {activeTab === "editor" && (
        <div className="mobile-analyze-row">
          <button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Code"}
          </button>
        </div>
      )}

      {/* DESKTOP VIEW */}
      <div className="panels">
        <div className="left-panel">
          <div className="left-header">
            <h3>Original Code</h3>
            <button onClick={handleAnalyze} disabled={loading}>
              {loading ? "Analyzing..." : "Analyze Code"}
            </button>
          </div>
          <div className="editor-area">
            <CodeEditor code={code} setCode={setCode} />
          </div>
        </div>

        <div className="right-panel">
          <h3>AI Review Result</h3>
          <ResultPanel result={result} loading={loading} />
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="mobile-fullscreen">
        {activeTab === "editor" && (
          <div className="mobile-editor">
            <CodeEditor code={code} setCode={setCode} />
          </div>
        )}

        {activeTab === "result" && (
          <div className="result-area-mobile">
            <ResultPanel result={result} loading={loading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
