import React from "react";

const Toolbar = ({ color, setColor, brushSize, setBrushSize, setTool, clearCanvas, downloadCanvas }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      🎨 Color: 
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      
      🖌️ Size:
      <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />

      <button onClick={() => setTool("brush")}>Brush</button>
      <button onClick={() => setTool("eraser")}>Eraser</button>
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={downloadCanvas}>Download</button>
    </div>
  );
};

export default Toolbar;
