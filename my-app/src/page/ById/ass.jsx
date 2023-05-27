import React, { useCallback, useEffect, useRef } from "react";

const ASS = (props) => {
  const canvasRef = useRef(null);

  const draw = useCallback((ctx) => {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getCoontext("2d");

    draw(context);
  }, [draw]);

  return <canvas ref={canvasRef} {...props}></canvas>;
};

export default ASS;
