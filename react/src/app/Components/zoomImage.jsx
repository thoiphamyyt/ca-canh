"use client";
import { useState } from "react";

export default function ZoomImage({ src, alt }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-96 overflow-hidden rounded-2xl bg-gray-50"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          isHovering ? "scale-150" : "scale-100"
        }`}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  );
}
