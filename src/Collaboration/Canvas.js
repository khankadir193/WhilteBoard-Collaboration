import { useState } from "react";

const Canvas = ({ color, brushSize, tool, canvasRef }) => {
  const [drawing, setDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(nativeEvent.offsetX, nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
    ctx.lineTo(nativeEvent.offsetX, nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setDrawing(false);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{ border: "1px solid #ccc", backgroundColor: "#fff" }}
    />
  );
};

export default Canvas;