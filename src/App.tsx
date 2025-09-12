import { useEffect, useRef } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const data = [
    { name: "", value:  1},
    { name: "", value:  2},
    { name: "", value:  3},
    { name: "", value:  4},
    { name: "", value:  5},
    { name: "", value:  0},
    { name: "", value:  1},
    { name: "", value:  0},
    { name: "", value:  1},
    { name: "", value:  2},
    { name: "", value:  3},
    { name: "", value:  0},
    { name: "", value:  1},
    { name: "", value:  2},
    { name: "", value:  3},
    { name: "", value:  4},
    { name: "", value:  1},
    { name: "", value:  0},
  ];

  const drawGraph = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const padding = 80;

    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Axes
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding); // Y axis top
    ctx.lineTo(padding, height - padding); // Y axis bottom
    ctx.lineTo(width - padding, height - padding); // X axis right
    ctx.stroke();

    // Scaling
    const maxValue = Math.max(...data.map(d => d.value)) * 1.1;
    const stepX = (width - 2 * padding) / (data.length - 1);
    const scaleY = (height - 2 * padding) / maxValue;

    // Grid lines
    ctx.strokeStyle = "#e0e0e0";
    ctx.lineWidth = 1;
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + ((height - 2 * padding) / gridLines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Y-axis Labels
    ctx.fillStyle = "#555";
    ctx.font = "14px Arial";
    ctx.textAlign = "right";
    for (let i = 0; i <= gridLines; i++) {
      const y = padding + ((height - 2 * padding) / gridLines) * i;
      const label = Math.round(maxValue - (maxValue / gridLines) * i);
      ctx.fillText(label.toString(), padding - 10, y + 5);
    }

    // X-axis Labels
    ctx.textAlign = "center";
    ctx.font = "14px Arial";
    data.forEach((point, index) => {
      const x = padding + index * stepX;
      const y = height - padding + 20;
      ctx.fillText(point.name, x, y);
    });

    // Data Line
    ctx.beginPath();
    ctx.strokeStyle = "#4A90E2";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    data.forEach((point, index) => {
      const x = padding + index * stepX;
      const y = height - padding - point.value * scaleY;
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();

    // Data Points
    data.forEach((point, index) => {
      const x = padding + index * stepX;
      const y = height - padding - point.value * scaleY;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#4A90E2";
      ctx.fill();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => drawGraph(canvas, ctx);
    render();

    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
        background: "#ffffff",
      }}
    ></canvas>
  );
}

export default App;
