import React, { useRef, useState } from "react";
import { FaPen, FaEraser } from "react-icons/fa";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [context, setContext] = useState(null);
  const [eraserPosition, setEraserPosition] = useState(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 60;
    const ctx = canvas.getContext("2d");
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    setContext(ctx);
  }, []);

  const handleMouseDown = (e) => {
    if (!context) return;
    if (tool === "pen") {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    } else if (tool === "eraser") {
      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!context) return;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (tool === "pen" && isDrawing) {
      context.strokeStyle = "black";
      context.lineTo(x, y);
      context.stroke();
    } else if (tool === "eraser" && isDrawing) {
      context.clearRect(x - 10, y - 10, 20, 20);
    }

    if (tool === "eraser") {
      setEraserPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (context && tool === "pen") context.closePath();
    if (tool === "eraser") setEraserPosition(null);
  };

  return (
    <div className="App">
      <div className="toolbar">
        <button
          className={`tool-btn ${tool === "pen" ? "active" : ""}`}
          onClick={() => setTool("pen")}
        >
          <FaPen size={20} />
          Pen
        </button>
        <button
          className={`tool-btn ${tool === "eraser" ? "active" : ""}`}
          onClick={() => setTool("eraser")}
        >
          <FaEraser size={20} />
          Eraser
        </button>
      </div>
      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      ></canvas>
      {eraserPosition && tool === "eraser" && (
        <div
          className="eraser-indicator"
          style={{
            left: eraserPosition.x - 10,
            top: eraserPosition.y - 10,
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
