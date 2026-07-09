'use client';

import { useEffect, useRef } from 'react';

export default function CoffeeGalaxy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let frameId = 0;
    const mouse = { x: 0, y: 0 };
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2.2 + 0.8,
      s: Math.random() * 0.8 + 0.25,
      o: Math.random() * 0.35 + 0.12,
      a: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width * dpr;
      height = rect.height * dpr;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouse = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 16;
    };

    const drawBean = (x, y, r, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(x * 0.01 + y * 0.004);
      ctx.scale(1.55, 1);
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.66, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(224,164,88,${opacity})`;
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-r * .15, -r * .5);
      ctx.quadraticCurveTo(r * .12, 0, -r * .15, r * .5);
      ctx.strokeStyle = `rgba(18,11,8,${opacity * 0.9})`;
      ctx.lineWidth = Math.max(1, r * .14);
      ctx.stroke();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createRadialGradient(width * 0.62, height * 0.44, 0, width * 0.62, height * 0.44, width * 0.55);
      gradient.addColorStop(0, 'rgba(224,164,88,0.22)');
      gradient.addColorStop(0.45, 'rgba(75,46,31,0.18)');
      gradient.addColorStop(1, 'rgba(18,11,8,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.a += p.s * 0.012;
        const x = p.x * width + Math.cos(p.a) * 10 + mouse.x * (index % 5);
        const y = p.y * height + Math.sin(p.a) * 12 + mouse.y * (index % 3);
        drawBean(x, y, p.r * (window.devicePixelRatio || 1), p.o);
      });

      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-80" aria-hidden="true" />;
}
