import React, { useEffect, useRef, useState } from 'react';
import "../sass/Interactiv.scss";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function Interactiv() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const createPoints = () => {
      const pointDensity = 5000;
      const pointCount = Math.floor((dimensions.width * dimensions.height) / pointDensity);
      
      return Array.from({ length: pointCount }, () => {
        const x = Math.random() * dimensions.width;
        const y = Math.random() * dimensions.height;
        const vx = (Math.random() - 0.5) * 1; // Random x velocity
        const vy = (Math.random() - 0.5) * 1; // Random y velocity
        const radius = Math.random() * 3 + 2; // Random radius between 2 and 5
        return { x, y, vx, vy, radius };
      });
    };

    if (dimensions.width && dimensions.height) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Initialize points if they haven't been already
      if (pointsRef.current.length === 0) {
        pointsRef.current = createPoints();
      }

      const animate = () => {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        // Draw transparent circle
        ctx.beginPath();
        ctx.arc(mousePosition.x, mousePosition.y, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0)';
        ctx.fill();

        pointsRef.current.forEach((point) => {
          // Move the point based on its velocity
          point.x += point.vx;
          point.y += point.vy;

          // Bounce the point if it hits canvas edges
          if (point.x <= point.radius || point.x >= dimensions.width - point.radius) point.vx *= -1;
          if (point.y <= point.radius || point.y >= dimensions.height - point.radius) point.vy *= -1;

          // Pulsion mécanique simple par le cercle de la souris
          const dx = mousePosition.x - point.x;
          const dy = mousePosition.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const circleRadius = 200;

          if (distance < circleRadius) {
            const angle = Math.atan2(dy, dx);
            const pushDistance = (circleRadius - distance + 1) * 0.05; // Adjust the push force
            point.x -= Math.cos(angle) * pushDistance;
            point.y -= Math.sin(angle) * pushDistance;

            // Ensure points stay within bounds after push
            point.x = Math.max(point.radius, Math.min(dimensions.width - point.radius, point.x));
            point.y = Math.max(point.radius, Math.min(dimensions.height - point.radius, point.y));
          }

          // Draw point
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.fill();
        });

        // Connect points that are close enough
        pointsRef.current.forEach((point, i) => {
          for (let j = i + 1; j < pointsRef.current.length; j++) {
            const otherPoint = pointsRef.current[j];
            const dx = otherPoint.x - point.x;
            const dy = otherPoint.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(point.x, point.y);
              ctx.lineTo(otherPoint.x, otherPoint.y);
              ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
              ctx.stroke();
            }
          }
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, [dimensions, mousePosition]); 

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="interactive-wallpaper">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseMove={handleMouseMove}
        aria-label="Interactive wallpaper with fixed elements that move when in contact with a transparent circle following the cursor"
      />
    </div>
  );
}
