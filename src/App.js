import logo from './logo.svg';
import './App.css';
import Canvas from './Collaboration/Canvas';
import { useRef, useState } from 'react';
import Toolbar from './Collaboration/Toolbar';

function App() {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brusshSize, setBrushSize] = useState(0);
  const [tool, setTool] = useState();

  const clearCanvas = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const downloadCanvas = () => {
    const link = document.createElement("a");
    link.download = 'drawing.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };


  return (
    <div className="App">
      <Toolbar
        color={color}
        setColor={setColor}
        brushSize={brusshSize}
        setTool={setTool}
        clearCanvas={clearCanvas}
        downloadCanvas={downloadCanvas}
        setBrushSize={setBrushSize}
      />
      <Canvas
        color={color}
        brushSize={brusshSize}
        tool={tool}
        canvasRef={canvasRef}
      />
    </div>
  );
}

export default App;


//whiteboard collaboration link(url)
//https://miro.com/online-whiteboard/
