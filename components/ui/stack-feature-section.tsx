"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const iconConfigs = [
  { img: "https://cdn.simpleicons.org/react/61DAFB", alt: "React" },
  { img: "https://cdn.simpleicons.org/amazonaws/FF9900", alt: "AWS" },
  { img: "https://cdn.simpleicons.org/docker/2496ED", alt: "Docker" },
  { img: "https://cdn.simpleicons.org/nodedotjs/339933", alt: "Node.js" },
  { img: "https://cdn.simpleicons.org/nextdotjs/000000", alt: "Next.js" },
  { img: "https://cdn.simpleicons.org/vercel/000000", alt: "Vercel" },
  { img: "https://cdn.simpleicons.org/redux/764ABC", alt: "Redux" },
  { img: "https://cdn.simpleicons.org/typescript/3178C6", alt: "TypeScript" },
  { img: "https://cdn.simpleicons.org/github/181717", alt: "GitHub" },
  { img: "https://cdn.simpleicons.org/x/1DA1F2", alt: "Twitter" },
  { img: "https://cdn.simpleicons.org/linkedin/0077B5", alt: "LinkedIn" },
  { img: "https://cdn.simpleicons.org/instagram/E1306C", alt: "Instagram" },
  { img: "https://cdn.simpleicons.org/google/DB4437", alt: "Google" },
  { img: "https://cdn.simpleicons.org/apple/000000", alt: "Apple" },
  { img: "https://cdn.simpleicons.org/facebook/1877F2", alt: "Facebook" },
];

const ORBITS = [
  { radius: 80, speed: 18 },
  { radius: 140, speed: 24 },
  { radius: 200, speed: 32 },
];

export default function FeatureSection() {
  const iconsPerOrbit = Math.ceil(iconConfigs.length / ORBITS.length);

  return (
    <section className="relative w-full max-w-5xl h-96 border border-gray-200 dark:border-gray-700 bg-white dark:bg-black overflow-hidden rounded-2xl flex items-center px-12">
      {/* Left: text */}
      <div className="w-1/2 z-10 shrink-0">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
          Build your idea
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-xs">
          RUIXEN is a modern and responsive UI kit for React, Next.js, and Tailwind CSS.
        </p>
        <div className="flex items-center gap-3">
          <Button variant="default">
            <Link href="https://ruixen.com" target="_blank">Get Started</Link>
          </Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>

      {/* Right: orbit - center hub sits at the right half, clipped by overflow-hidden */}
      <div
        className="absolute"
        style={{ top: "50%", left: "72%", transform: "translate(-50%, -50%)" }}
      >
        {/* Hub */}
        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-md flex items-center justify-center relative z-10">
          <img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" className="w-7 h-7 object-contain" />
        </div>

        {ORBITS.map(({ radius, speed }, orbitIdx) => {
          const icons = iconConfigs.slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit);
          const angleStep = (2 * Math.PI) / icons.length;

          return (
            <div
              key={orbitIdx}
              className="absolute rounded-full border border-dashed border-gray-300 dark:border-gray-600"
              style={{
                width: radius * 2,
                height: radius * 2,
                top: -radius,
                left: -radius,
                animation: `orbit-spin ${speed}s linear infinite`,
              }}
            >
              {icons.map((cfg, iconIdx) => {
                const angle = iconIdx * angleStep;
                const x = 50 + 50 * Math.cos(angle);
                const y = 50 + 50 * Math.sin(angle);

                return (
                  <div
                    key={iconIdx}
                    className="absolute bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-sm"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      animation: `counter-spin ${speed}s linear infinite`,
                    }}
                  >
                    <img src={cfg.img} alt={cfg.alt} className="w-5 h-5 object-contain" />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
