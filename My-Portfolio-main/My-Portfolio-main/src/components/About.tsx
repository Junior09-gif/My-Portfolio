import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Code2, Calendar, Check, X, Shield, Terminal, Sparkles, ArrowRight } from "lucide-react";
import headshotPhoto from "../assets/images/edwin_headshot.jpg";

const PENSA_ACHIEVEMENTS = [
  "Successfully delivered projects ahead of schedule",
  "Implemented innovative solutions that increased efficiency",
  "Received recognition for exceptional work quality",
  "Stewarding digital platforms that connect thousands of university students and alumni",
];

// Interactive Parallax & 3D Floating Huge Photo Card matching AmassTech mechanics
function ParallaxPhotoCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rX: 0, rY: 0 });

  // Scroll parallax matching AmassTech's scroll interpolation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Wide horizontal sweep [80, -80] & vertical glide [40, -40] as user scrolls
  const scrollX = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rX: -yPos * 18,
      rY: xPos * 18,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTilt({ rX: 0, rY: 0 }); }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "480px", // Huge prominent portrait framing matching AmassTech
        margin: "0 auto",
      }}
    >
      {/* Scroll parallax motion wrapper (sweeps across x and y as user scrolls) */}
      <motion.div style={{ x: scrollX, y: scrollY }} className="relative z-10">
        
        {/* Continuous organic levitation (breathing floating motion) */}
        <motion.div
          animate={{
            y: isHovered ? 0 : [0, -14, 0],
            rotateZ: isHovered ? 0 : [-0.75, 0.75, -0.75],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ position: "relative" }}
        >
          {/* Huge Card frame with 3D tilt */}
          <motion.div
            animate={{
              rotateX: isHovered ? tilt.rX : 0,
              rotateY: isHovered ? tilt.rY : 0,
              scale: isHovered ? 1.03 : 1,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            style={{
              transformStyle: "preserve-3d",
              aspectRatio: "1 / 1",
              borderRadius: "1.5rem",
              overflow: "hidden",
              border: "2px solid rgba(255, 255, 255, 0.85)",
              boxShadow: isHovered
                ? "0 35px 70px -15px rgba(49, 94, 251, 0.45), 0 0 45px rgba(49, 94, 251, 0.3)"
                : "0 25px 50px -15px rgba(15, 23, 42, 0.35), 0 0 25px rgba(49, 94, 251, 0.12)",
              background: "linear-gradient(135deg, rgba(49,94,251,0.25) 0%, rgba(15,23,42,0.96) 50%, rgba(249,115,22,0.2) 100%)",
              position: "relative",
            }}
          >
            <img
              src={headshotPhoto}
              alt="Boadu Kofi Junior Edwin"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 12%",
                display: "block",
                transform: "translateZ(25px)",
              }}
            />

            {/* Dynamic glare shine tracking mouse cursor */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: isHovered
                  ? `radial-gradient(circle at ${(tilt.rY / 18 + 0.5) * 100}% ${(-tilt.rX / 18 + 0.5) * 100}%, rgba(255,255,255,0.32) 0%, transparent 60%)`
                  : "none",
                transition: "opacity 0.2s ease",
              }}
            />
          </motion.div>

          {/* Large glowing blur gradient orb matching AmassTech */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.38, 0.25],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              bottom: "-1.75rem",
              right: "-1.75rem",
              width: "11rem",
              height: "11rem",
              background: "linear-gradient(135deg, #315EFB, #f97316)",
              borderRadius: "50%",
              filter: "blur(32px)",
              pointerEvents: "none",
              zIndex: -1,
            }}
          />

          {/* Ambient top-left soft aura */}
          <div
            style={{
              position: "absolute",
              top: "-1.5rem",
              left: "-1.5rem",
              width: "8rem",
              height: "8rem",
              background: "radial-gradient(circle, rgba(49,94,251,0.3) 0%, transparent 70%)",
              filter: "blur(24px)",
              pointerEvents: "none",
              zIndex: -1,
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="about" className="section" style={{ position: "relative", zIndex: 1, padding: "5.5rem 0" }}>
      <div className="container" style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}>
        
        {/* Section Heading matching AmassTech */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "0.85rem",
              letterSpacing: "-0.02em",
            }}
          >
            About <span style={{ color: "#315EFB" }}>Me</span>
          </motion.h2>

          {/* Animated gradient underline bar */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              height: "4px",
              background: "linear-gradient(to right, #315EFB, #f97316)",
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* 2-Column Responsive Layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}>
          
          {/* Left: Animated Huge Parallax Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <ParallaxPhotoCard />
          </motion.div>

          {/* Right: Bio Content with Staggered Cascading Animations */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {/* Headline Subtitle */}
            <motion.h3
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#0F172A",
                lineHeight: 1.3,
              }}
            >
              Passionate IT Student &amp; Aspiring Cybersecurity Professional
            </motion.h3>

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ fontSize: "1rem", lineHeight: 1.75, color: "#334155" }}
            >
              An IT student at KNUST passionate about building useful technology and understanding how digital systems work.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#475569" }}
            >
              I'm <strong style={{ color: "#0F172A" }}>Boadu Kofi Junior Edwin</strong>, an Information Technology student at the{" "}
              <strong style={{ color: "#315EFB" }}>Kwame Nkrumah University of Science and Technology (KNUST)</strong> in Kumasi, Ghana.
              My interest in technology began with a childhood curiosity about computers, how they work, how software is developed, and how networks connect people.
            </motion.p>

            {/* Paragraph 3 */}
            <motion.p
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#475569" }}
            >
              I'm currently building a strong foundation in{" "}
              <strong style={{ color: "#0F172A" }}>software development, networking, and cybersecurity</strong> through coursework, personal projects, and independent learning.
              My goal is to become a well rounded IT professional capable of building secure and practical solutions to real world problems.
            </motion.p>

            {/* Distinct PENSA Leadership Card with Interactive Modal Trigger */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.2 } }}
              style={{
                marginTop: "0.5rem",
                padding: "1.35rem 1.5rem",
                background: "rgba(15, 23, 42, 0.94)",
                border: "1px solid rgba(49, 94, 251, 0.4)",
                borderRadius: "0.85rem",
                boxShadow: "0 10px 25px -5px rgba(15, 23, 42, 0.3), 0 0 18px rgba(49, 94, 251, 0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: "2.1rem", height: "2.1rem", borderRadius: "50%",
                    background: "#315EFB", display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#ffffff", flexShrink: 0,
                    boxShadow: "0 0 12px rgba(49,94,251,0.5)",
                  }}>
                    <Code2 style={{ width: "1.05rem", height: "1.05rem" }} />
                  </div>
                  <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#ffffff" }}>
                    PENSA KNUST Media Department
                  </span>
                </div>
                
                {/* Pulsing badge */}
                <motion.span
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(49,94,251,0)",
                      "0 0 10px rgba(49,94,251,0.6)",
                      "0 0 0 rgba(49,94,251,0)",
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 2.5 }}
                  style={{
                    fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 600,
                    padding: "0.2rem 0.65rem", borderRadius: "999px",
                    background: "rgba(49, 94, 251, 0.22)", color: "#60a5fa",
                    border: "1px solid rgba(49, 94, 251, 0.45)",
                  }}
                >
                  2026/2027
                </motion.span>
              </div>

              <p style={{ fontSize: "0.88rem", lineHeight: 1.68, color: "#cbd5e1" }}>
                Alongside my academic and technical pursuits, I currently serve as the{" "}
                <strong style={{ color: "#60a5fa" }}>Assistant Web and App Head</strong> of the{" "}
                <strong style={{ color: "#ffffff" }}>PENSA KNUST Media Department</strong> for the{" "}
                <strong style={{ color: "#ffffff" }}>2026/2027 Spiritual and Academic Year</strong>. In this role, I contribute to the department's digital presence and support its web and application platforms.
              </p>

              <div>
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{ x: 3 }}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    color: "#60a5fa",
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    transition: "color 0.18s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#93c5fd")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#60a5fa")}
                >
                  Learn more <ArrowRight style={{ width: "0.9rem", height: "0.9rem" }} />
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Competency Badges with Hover Motion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}
            >
              <motion.div
                whileHover={{ y: -5, scale: 1.025, boxShadow: "0 12px 25px rgba(49,94,251,0.15)", transition: { duration: 0.2 } }}
                style={{
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  background: "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.95)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ color: "#315EFB", marginTop: "0.15rem" }}>
                  <Terminal style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.2rem" }}>
                    Software &amp; Web
                  </h4>
                  <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.45 }}>
                    Modern React apps, Python scripting, and responsive interfaces.
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5, scale: 1.025, boxShadow: "0 12px 25px rgba(249,115,22,0.15)", transition: { duration: 0.2 } }}
                style={{
                  padding: "1rem",
                  borderRadius: "0.75rem",
                  background: "rgba(255, 255, 255, 0.85)",
                  border: "1px solid rgba(255, 255, 255, 0.95)",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                }}
              >
                <div style={{ color: "#f97316", marginTop: "0.15rem" }}>
                  <Shield style={{ width: "1.25rem", height: "1.25rem" }} />
                </div>
                <div>
                  <h4 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.2rem" }}>
                    Networks &amp; Security
                  </h4>
                  <p style={{ fontSize: "0.78rem", color: "#64748B", lineHeight: 1.45 }}>
                    TCP/IP subnetting, Cisco packet routing, and defensive security.
                  </p>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>

      </div>

      {/* Pop-up Modal matching Image 2 */}
      <AnimatePresence>
        {isModalOpen && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 99999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              background: "rgba(5, 10, 24, 0.82)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: "32rem",
                width: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                padding: "2rem 1.85rem",
                borderRadius: "1rem",
                background: "linear-gradient(135deg, rgba(14, 28, 64, 0.97) 0%, rgba(11, 16, 32, 0.98) 100%)",
                border: "1px solid rgba(59, 130, 246, 0.45)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(49, 94, 251, 0.25)",
                color: "#ffffff",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "2.1rem",
                  height: "2.1rem",
                  borderRadius: "50%",
                  background: "#1e40af",
                  border: "none",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  transition: "background 0.18s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#2563eb")}
                onMouseLeave={e => (e.currentTarget.style.background = "#1e40af")}
              >
                ✕
              </button>

              {/* Icon badge */}
              <div
                style={{
                  width: "3.75rem",
                  height: "3.75rem",
                  borderRadius: "50%",
                  background: "#2563eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                  boxShadow: "0 8px 25px rgba(37, 99, 235, 0.4)",
                }}
              >
                <Code2 style={{ width: "1.85rem", height: "1.85rem" }} />
              </div>

              {/* Date */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", color: "#94a3b8", fontSize: "0.9rem" }}>
                <Calendar style={{ width: "1.1rem", height: "1.1rem" }} />
                <span>2026 / 2027</span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: "1.45rem", fontWeight: 700, marginBottom: "0.85rem", color: "#ffffff", lineHeight: 1.3 }}>
                Assistant Web &amp; App Head at PENSA-KNUST
              </h2>

              {/* Description */}
              <p style={{ fontSize: "0.925rem", lineHeight: 1.68, color: "#cbd5e1", marginBottom: "1.5rem" }}>
                Overseeing development and technical needs of the department's web/app platforms while mentoring junior developers.
              </p>

              {/* Divider */}
              <div style={{ borderTop: "1px solid #334155", paddingTop: "1.25rem", marginTop: "1.25rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.85rem", color: "#ffffff" }}>
                  Key Achievements
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.65rem", listStyle: "none", padding: 0 }}>
                  {PENSA_ACHIEVEMENTS.map((ach, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem", color: "#e2e8f0", fontSize: "0.88rem", lineHeight: 1.55 }}>
                      <span style={{ color: "#4ade80", fontWeight: 800, marginTop: "0.1rem", flexShrink: 0 }}>✓</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
