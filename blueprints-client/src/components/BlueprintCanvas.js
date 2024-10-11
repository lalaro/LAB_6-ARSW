import React, { useEffect, useRef } from 'react';
import '../css/BlueprintCanvas.css';

const BlueprintCanvas = ({ blueprint }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (blueprint && blueprint.points) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = 'black';
      context.lineWidth = 2;

      context.beginPath();
      context.moveTo(blueprint.points[0].x, blueprint.points[0].y);

      blueprint.points.forEach(point => {
        context.lineTo(point.x, point.y);
      });

      context.stroke();
    }
  }, [blueprint]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} width={250} height={250} />
      {blueprint && <p>Plano: {blueprint.name}</p>}
    </div>
  );
};

export default BlueprintCanvas;
