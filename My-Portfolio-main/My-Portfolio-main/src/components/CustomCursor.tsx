import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "interactive">("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(max-width: 768px)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);

    const attachListeners = () => {
      document.querySelectorAll("a, button, input, textarea, select, [role='button'], .card, .btn-primary, .btn-secondary, .btn-ghost, .interactive").forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorVariant("interactive"));
        el.addEventListener("mouseleave", () => setCursorVariant("default"));
      });
    };

    attachListeners();
    const timer = setInterval(attachListeners, 1500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(timer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const variants = {
    default: {
      x: position.x - 16,
      y: position.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(49, 94, 251, 0.1)",
      border: "1.5px solid rgba(49, 94, 251, 0.45)",
      transition: { type: "spring", mass: 0.25, damping: 25, stiffness: 450 },
    },
    interactive: {
      x: position.x - 24,
      y: position.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(49, 94, 251, 0.22)",
      border: "1.5px solid rgba(49, 94, 251, 0.75)",
      transition: { type: "spring", mass: 0.25, damping: 25, stiffness: 450 },
    },
  };

  return (
    <>
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
        }}
        variants={variants}
        animate={cursorVariant}
      />

      {/* Center 8px Glowing Blue Dot */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "#315EFB",
          boxShadow: "0 0 10px #315EFB, 0 0 18px #6E8BFF",
          pointerEvents: "none",
          zIndex: 99999,
        }}
        animate={{ x: position.x - 4, y: position.y - 4 }}
        transition={{ type: "spring", mass: 0.15, damping: 30, stiffness: 900 }}
      />
    </>
  );
}
