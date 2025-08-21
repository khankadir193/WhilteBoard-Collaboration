import './App.css';
import Canvas from './Collaboration/Canvas';
import { useEffect, useRef, useState } from 'react';
import Toolbar from './Collaboration/Toolbar';

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(0);
  const [tool, setTool] = useState("pen");

  // History management
  const history = useRef([]);
  const historyStep = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.7;
      const context = canvas.getContext("2d");
      context.lineCap = "round";
      context.strokeStyle = color;
      context.lineWidth = brushSize;
      contextRef.current = context;

      // Initialize history with blank canvas
      const blank = canvas.toDataURL();
      history.current = [blank];
      historyStep.current = 0;
    }
  }, []);

  // Save state in history
  const saveHistory = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL();
    history.current = history.current.slice(0, historyStep.current + 1);
    history.current.push(dataUrl);
    historyStep.current = history.current.length - 1;
  };

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    saveHistory();
  };

  const downloadCanvas = () => {
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const handleUndo = () => {
    if (historyStep.current > 0) {
      historyStep.current -= 1;
      const imageData = history.current[historyStep.current];
      getImageToCanvas(imageData);
    }
  };

  const handleRedo = () => {
    if (historyStep.current < history.current.length - 1) {
      historyStep.current += 1;
      const imageData = history.current[historyStep.current];
      getImageToCanvas(imageData);
    }
  };

  const getImageToCanvas = (imageData) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const img = new Image();
    img.onload = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imageData;
  };

  return (
    <div className="App">
      <Toolbar
        color={color}
        setColor={setColor}
        brushSize={brushSize}
        setTool={setTool}
        clearCanvas={clearCanvas}
        downloadCanvas={downloadCanvas}
        setBrushSize={setBrushSize}
        handleRedo={handleRedo}
        handleUndo={handleUndo}
      />
      <Canvas
        color={color}
        brushSize={brushSize}
        tool={tool}
        canvasRef={canvasRef}
        contextRef={contextRef}
        saveHistory={saveHistory} // important for undo/redo
      />
    </div>
  );
}

export default App;



//whiteboard collaboration link(url)
//https://miro.com/online-whiteboard/
