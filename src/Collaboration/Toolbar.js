import React from "react";
import './Toolbar.css'

const Toolbar = ({ color, setColor, brushSize, setBrushSize, setTool, clearCanvas, downloadCanvas,handleRedo,handleUndo }) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      🎨 Color:
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />

      🖌️ Size:
      <input type="range" min="1" max="20" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} />

      <button className="brush" onClick={() => setTool("brush")}></button>
      <button className="eraser" onClick={() => setTool("eraser")}></button>
      <button className="clear" onClick={clearCanvas}></button>
      <button className="download" onClick={downloadCanvas}></button>
      <button className="undo" onClick={handleUndo}></button>
      <button className="redo" onClick={handleRedo}></button>
    </div>
  );
};

export default Toolbar;
