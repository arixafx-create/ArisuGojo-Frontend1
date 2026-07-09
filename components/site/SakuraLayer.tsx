"use client";

import { useEffect, useState } from "react";

type Petal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
};

export default function SakuraLayer() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const count = 18;
    const arr: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      size: 10 + Math.random() * 12,
      drift: -20 + Math.random() * 40,
    }));
    setPetals(arr);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            // @ts-expect-error CSS var
            "--drift": `${p.drift}vw`,
          }}
        />
      ))}
    </div>
  );
}
