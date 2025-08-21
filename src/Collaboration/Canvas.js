import React, { useState } from "react";

const Canvas = ({ color, brushSize, tool, canvasRef, contextRef, saveHistory }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.strokeStyle = color;
    contextRef.current.lineWidth = brushSize;

    if (tool === "pen") {
      contextRef.current.lineTo(offsetX, offsetY);
      contextRef.current.stroke();
    } else if (tool === "eraser") {
      contextRef.current.clearRect(offsetX, offsetY, brushSize, brushSize);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);
    saveHistory(); // save after finishing stroke
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{ border: "3rem solid #290d2eff", borderRadius: "16px", background: "#fff", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", cursor: tool === "eraser" ? "not-allowed" : "crosshair" }}
    />
  );
};

export default Canvas;
