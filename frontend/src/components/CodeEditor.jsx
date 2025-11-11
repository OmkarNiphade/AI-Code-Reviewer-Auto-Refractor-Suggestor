import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ code, setCode }) {
  return (
    <Editor
      height="100%"
      defaultLanguage="java"
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value)}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,

        // IMPORTANT FOR MOBILE CURSOR
        accessibilitySupport: "on",
        cursorBlinking: "blink",
        cursorStyle: "line",
        smoothScrolling: true,
      }}
    />
  );
}

export default CodeEditor;
