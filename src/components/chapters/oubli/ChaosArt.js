import React, { useState, useEffect, useRef } from "react";

export default function ChaosArt() {
  const [elements, setElements] = useState([]);
  const containerRef = useRef(null);

  const randomGreen = () => {
    const g = Math.floor(Math.random() * 155) + 100;
    return `rgb(${Math.floor(Math.random() * 50)}, ${g}, ${Math.floor(
      Math.random() * 50
    )})`;
  };

  const createRandomShape = (x, y) => {
    const size = Math.random() * 120 + 20;
    const shapeType = Math.random();
    let style = {
      position: "absolute",
      left: x - size / 2,
      top: y - size / 2,
      width: size,
      height: size,
      backgroundColor: randomGreen(),
      opacity: 0.8,
      pointerEvents: "none",
    };

    if (shapeType < 0.33) {
      style.borderRadius = "50%";
    } else if (shapeType < 0.66) {
      style.transform = `rotate(${Math.random() * 360}deg)`;
    } else {
      style.clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)";
    }

    return <div key={Math.random()} style={style}></div>;
  };

  const createRandomChar = (char) => {
    const container = containerRef.current;
    if (!container) return null;

    const { clientWidth, clientHeight } = container;
    const x = Math.random() * clientWidth;
    const y = Math.random() * clientHeight;
    const size = (Math.random() * 3.8 + 0.2).toFixed(2) + "em";

    const style = {
      position: "absolute",
      left: x,
      top: y,
      color: randomGreen(),
      fontSize: size,
      pointerEvents: "none",
      fontFamily: "monospace",
    };

    return (
      <span key={Math.random()} style={style}>
        {char}
      </span>
    );
  };

  const handleClick = (e) => {
    setElements((prev) => [
      ...prev,
      createRandomShape(e.clientX, e.clientY),
    ]);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (containerRef.current) {
        setElements((prev) => [...prev, createRandomChar(e.key)]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="leurre"
      ref={containerRef}
      onClick={handleClick}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        visibility: "visible",
      }}
    >
      {elements}
    </div>
  );
}