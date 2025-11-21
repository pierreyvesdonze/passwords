import React, { useEffect, useRef } from "react";

export default function TerminalDisplay({ history }) {
  const lastLineRef = useRef(null);

  useEffect(() => {
    lastLineRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      style={{
        background: "black",
        color: "#0f0",
        fontFamily: "monospace",
        padding: "1rem",
        overflowY: "auto",
        whiteSpace: "pre-wrap",
      }}
    >
      {history.map((line, i) => {
        const isLast = i === history.length - 1;
        return (
          <div
            key={i}
            ref={isLast ? lastLineRef : null}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        );
      })}
    </div>
  );
}
