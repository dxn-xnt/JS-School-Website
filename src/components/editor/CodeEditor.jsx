import React, { useState, useEffect, useRef } from "react";
import { Play, RotateCcw, Trash2, Copy, Check, Terminal, AlertTriangle } from "lucide-react";

export function CodeEditor({
  initialCode = "",
  title = "Try It Yourself Editor",
  subtitle = "Run and edit JavaScript live in your browser",
  height = "320px",
  onCodeChange = null,
  showReset = true,
  showClear = true,
  runLabel = "Run Code",
  className = "",
}) {
  const [code, setCode] = useState(initialCode);
  const [outputs, setOutputs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setCode(initialCode);
    setOutputs([]);
    setExecutionTime(null);
  }, [initialCode]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const val = e.target.value;
      const updated = val.substring(0, start) + "  " + val.substring(end);
      handleCodeChange(updated);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  };

  const runCode = () => {
    setIsRunning(true);
    const logs = [];
    const startTime = performance.now();

    // Create a safe console interceptor
    const customConsole = {
      log: (...args) => {
        logs.push({
          type: "log",
          text: args
            .map((arg) => {
              if (arg === null) return "null";
              if (arg === undefined) return "undefined";
              if (typeof arg === "object") {
                try {
                  return JSON.stringify(arg, null, 2);
                } catch {
                  return String(arg);
                }
              }
              return String(arg);
            })
            .join(" "),
        });
      },
      warn: (...args) => {
        logs.push({
          type: "warn",
          text: args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "),
        });
      },
      error: (...args) => {
        logs.push({
          type: "error",
          text: args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "),
        });
      },
      info: (...args) => {
        logs.push({
          type: "info",
          text: args.map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a))).join(" "),
        });
      },
    };

    try {
      // Execute in isolated function context with console mapped to customConsole
      const runFn = new Function("console", `"use strict";\n${code}`);
      const result = runFn(customConsole);

      if (logs.length === 0) {
        if (result !== undefined) {
          logs.push({
            type: "return",
            text: typeof result === "object" ? JSON.stringify(result, null, 2) : String(result),
          });
        } else {
          logs.push({
            type: "info",
            text: "Code executed successfully with no console output. (Tip: Use console.log() to print values)",
          });
        }
      }
    } catch (err) {
      logs.push({
        type: "error",
        text: `${err.name}: ${err.message}`,
      });
    }

    const elapsed = (performance.now() - startTime).toFixed(1);
    setExecutionTime(elapsed);
    setOutputs(logs);
    setIsRunning(false);
  };

  const resetCode = () => {
    handleCodeChange(initialCode);
    setOutputs([]);
    setExecutionTime(null);
  };

  const clearOutput = () => {
    setOutputs([]);
    setExecutionTime(null);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineNumbers = code.split("\n").map((_, i) => i + 1);

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-lg flex flex-col ${className}`}>
      {/* Editor Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs font-mono font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
            JS Sandbox
          </span>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">{title}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={copyCode}
            title="Copy Code"
            className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
          </button>

          {showReset && (
            <button
              onClick={resetCode}
              title="Reset starter code"
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{runLabel}</span>
            <span className="text-[10px] opacity-70 hidden md:inline font-mono">(Ctrl+Enter)</span>
          </button>
        </div>
      </div>

      {/* Code Textarea with Line Numbers */}
      <div className="relative flex font-mono text-sm bg-slate-900 overflow-hidden" style={{ minHeight: "160px" }}>
        {/* Line Numbers */}
        <div className="select-none py-3 px-3 text-right bg-slate-950/40 text-slate-600 border-r border-slate-800 text-xs leading-6 min-w-[2.75rem]">
          {lineNumbers.map((num) => (
            <div key={num}>{num}</div>
          ))}
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck="false"
          placeholder="// Type your JavaScript code here..."
          className="w-full h-full p-3 font-mono text-sm leading-6 bg-transparent text-emerald-300 resize-y focus:outline-none placeholder-slate-600 min-h-[160px]"
          style={{ tabSize: 2 }}
        />
      </div>

      {/* Output / Console Section */}
      <div className="border-t border-slate-800 bg-slate-950">
        <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/60 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-mono font-medium text-slate-300">Console Output</span>
            {executionTime && (
              <span className="text-[11px] text-slate-500 font-mono">({executionTime}ms)</span>
            )}
          </div>

          {outputs.length > 0 && showClear && (
            <button
              onClick={clearOutput}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="p-3 font-mono text-xs max-h-48 overflow-y-auto space-y-1.5 bg-slate-950/90 min-h-[70px]">
          {outputs.length === 0 ? (
            <div className="text-slate-600 italic flex items-center gap-2 py-1">
              <span>Click "Run Code" above to execute JavaScript and view console logs here.</span>
            </div>
          ) : (
            outputs.map((out, idx) => (
              <div
                key={idx}
                className={`p-1.5 rounded whitespace-pre-wrap break-all ${
                  out.type === "error"
                    ? "bg-red-950/50 text-red-300 border-l-2 border-red-500 pl-2"
                    : out.type === "warn"
                    ? "bg-amber-950/50 text-amber-300 border-l-2 border-amber-500 pl-2"
                    : out.type === "return"
                    ? "bg-sky-950/40 text-sky-300 border-l-2 border-sky-500 pl-2"
                    : out.type === "info"
                    ? "text-slate-400 italic"
                    : "text-slate-100 flex items-start gap-2"
                }`}
              >
                {out.type === "log" && <span className="text-slate-500 select-none">{">"}</span>}
                {out.type === "error" && <AlertTriangle className="w-3.5 h-3.5 text-red-400 inline mr-1" />}
                <span>{out.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
