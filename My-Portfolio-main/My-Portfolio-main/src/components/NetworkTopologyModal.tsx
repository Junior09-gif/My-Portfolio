import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Network, Server, Router, Laptop, Play, CheckCircle2, ShieldAlert, Cpu, Terminal, ArrowRight, Layers } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface VlanInfo {
  id: number;
  name: string;
  subnet: string;
  gateway: string;
  ports: string;
  aclPolicy: string;
  color: string;
}

const VLANS: VlanInfo[] = [
  { id: 10, name: "Administration", subnet: "192.168.10.0/24", gateway: "192.168.10.1", ports: "Fa0/1 - Fa0/8", aclPolicy: "Full Access to Server Farm & External WAN", color: "#06b6d4" },
  { id: 20, name: "Faculty & Staff", subnet: "192.168.20.0/24", gateway: "192.168.20.1", ports: "Fa0/9 - Fa0/16", aclPolicy: "Access to Intranet + Internet; Restricted DB Ports", color: "#3b82f6" },
  { id: 30, name: "Student Labs & WiFi", subnet: "192.168.30.0/24", gateway: "192.168.30.1", ports: "Fa0/17 - Fa0/24", aclPolicy: "Isolated from Admin VLAN; Web HTTP/HTTPS Only", color: "#10b981" },
  { id: 50, name: "Server Farm & Services", subnet: "192.168.50.0/24", gateway: "192.168.50.1", ports: "Gi0/1 - Gi0/4", aclPolicy: "Protected by ACL 102; SSH allowed from Admin only", color: "#f59e0b" },
];

const CISCO_CONFIG_SNIPPET = `! ── KNUST Campus Cisco 2960 Switch VLAN Configuration ──
Switch(config)# vlan 10
Switch(config-vlan)# name Administration
Switch(config-vlan)# vlan 20
Switch(config-vlan)# name Faculty_Staff
Switch(config-vlan)# vlan 30
Switch(config-vlan)# name Student_Labs
Switch(config-vlan)# vlan 50
Switch(config-vlan)# name Server_Farm
!
! ── Configure 802.1Q Trunk to Router0 ──
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30,50
!
! ── Router-on-a-Stick Sub-interfaces ──
Router(config)# interface GigabitEthernet0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config)# interface GigabitEthernet0/0.30
Router(config-subif)# encapsulation dot1Q 30
Router(config-subif)# ip address 192.168.30.1 255.255.255.0`;

export default function NetworkTopologyModal({ isOpen, onClose }: Props) {
  const [selectedVlan, setSelectedVlan] = useState<VlanInfo>(VLANS[0]);
  const [activeTab, setActiveTab] = useState<"visual" | "table" | "cisco">("visual");
  const [pingRunning, setPingRunning] = useState(false);
  const [pingLog, setPingLog] = useState<string | null>(null);

  const simulatePing = () => {
    setPingRunning(true);
    setPingLog(`Sending 4, 100-byte ICMP Echos from Student-PC (192.168.30.45) to DNS-Server (${selectedVlan.gateway})...`);
    setTimeout(() => {
      setPingLog(prev => `${prev}\nReply from ${selectedVlan.gateway}: bytes=100 time=1.4ms TTL=63`);
    }, 400);
    setTimeout(() => {
      setPingLog(prev => `${prev}\nReply from ${selectedVlan.gateway}: bytes=100 time=1.1ms TTL=63\nSuccess rate is 100 percent (4/4), round-trip min/avg/max = 1/1/2 ms`);
      setPingRunning(false);
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem", background: "rgba(5, 10, 20, 0.85)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}>
        {/* Backdrop click */}
        <div style={{ position: "absolute", inset: 0 }} onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", maxWidth: "52rem", maxHeight: "90vh",
            background: "#0d1424", border: "1px solid #1e293b",
            borderRadius: "0.85rem", boxShadow: "0 25px 60px rgba(0,0,0,0.7)",
            overflowY: "auto", display: "flex", flexDirection: "column",
          }}
        >
          {/* Header */}
          <div style={{
            padding: "1.1rem 1.4rem", borderBottom: "1px solid #1e293b",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#090d16", position: "sticky", top: 0, zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <div style={{ padding: "0.45rem", background: "rgba(6,182,212,0.12)", borderRadius: "0.4rem", color: "#22d3ee" }}>
                <Network style={{ width: "1.1rem", height: "1.1rem" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#f1f5f9" }}>Campus Enterprise Multi-VLAN Topology</h3>
                <p style={{ fontSize: "0.72rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>
                  Cisco Packet Tracer Architecture · Inter-VLAN Routing &amp; 802.1Q Trunks
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none", border: "1px solid #1e293b", color: "#94a3b8",
                borderRadius: "0.4rem", padding: "0.35rem", cursor: "pointer", display: "flex",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f1f5f9")}
              onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
            >
              <X style={{ width: "1.1rem", height: "1.1rem" }} />
            </button>
          </div>

          {/* Nav Tabs */}
          <div style={{
            display: "flex", borderBottom: "1px solid #1e293b",
            background: "#0a0f1e", padding: "0 1.4rem", gap: "1rem",
          }}>
            {[
              { key: "visual", label: "Interactive Diagram", icon: Layers },
              { key: "table", label: "VLAN Addressing Table", icon: Server },
              { key: "cisco", label: "Cisco IOS CLI Scripts", icon: Terminal },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key as any)}
                style={{
                  padding: "0.75rem 0", background: "none", border: "none",
                  borderBottom: `2px solid ${activeTab === t.key ? "#06b6d4" : "transparent"}`,
                  color: activeTab === t.key ? "#22d3ee" : "#64748b",
                  fontSize: "0.82rem", fontWeight: 600, fontFamily: "var(--font-mono)",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "0.45rem",
                }}
              >
                <t.icon style={{ width: "0.85rem", height: "0.85rem" }} />
                {t.label}
              </button>
            ))}
          </div>

          {/* Body */}
          <div style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            {activeTab === "visual" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                
                {/* Visual Topology Canvas Representation */}
                <div style={{
                  padding: "1.5rem", background: "#090d16",
                  border: "1px solid #1e293b", borderRadius: "0.65rem",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem",
                  position: "relative",
                }}>
                  {/* Top Layer: Gateway Router */}
                  <div style={{
                    padding: "0.75rem 1.4rem", background: "#0a0f1e",
                    border: "2px solid #06b6d4", borderRadius: "0.5rem",
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    boxShadow: "0 0 20px rgba(6,182,212,0.15)",
                  }}>
                    <Router style={{ width: "1.2rem", height: "1.2rem", color: "#22d3ee" }} />
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f1f5f9" }}>KNUST-Core-Router0</p>
                      <p style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>802.1Q Sub-Interfaces (Fa0/0.10, .20, .30, .50)</p>
                    </div>
                  </div>

                  {/* Trunk line */}
                  <div style={{ width: "2px", height: "24px", background: "#06b6d4", position: "relative" }}>
                    <span style={{ position: "absolute", left: "6px", top: "4px", fontSize: "0.62rem", color: "#22d3ee", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>
                      802.1Q Trunk
                    </span>
                  </div>

                  {/* Distribution Switch */}
                  <div style={{
                    padding: "0.75rem 1.4rem", background: "#0a0f1e",
                    border: "1px solid #334155", borderRadius: "0.5rem",
                    display: "flex", alignItems: "center", gap: "0.6rem",
                  }}>
                    <Server style={{ width: "1.1rem", height: "1.1rem", color: "#38bdf8" }} />
                    <div>
                      <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#f1f5f9" }}>SW-Distribution-1 (Cisco Catalyst 3560)</p>
                      <p style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>VTP Domain: knust-cs | Mode: Server</p>
                    </div>
                  </div>

                  {/* Access Layer Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.75rem", width: "100%" }}>
                    {VLANS.map(v => {
                      const isSelected = selectedVlan.id === v.id;
                      return (
                        <div
                          key={v.id}
                          onClick={() => setSelectedVlan(v)}
                          style={{
                            padding: "0.85rem", background: isSelected ? "rgba(6,182,212,0.1)" : "#0a0f1e",
                            border: `1px solid ${isSelected ? v.color : "#1e293b"}`,
                            borderRadius: "0.5rem", cursor: "pointer",
                            transition: "all 0.18s", display: "flex", flexDirection: "column", gap: "0.3rem",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", color: v.color, fontWeight: 700 }}>
                              VLAN {v.id}
                            </span>
                            <Laptop style={{ width: "0.85rem", height: "0.85rem", color: v.color }} />
                          </div>
                          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#f1f5f9" }}>{v.name}</p>
                          <p style={{ fontSize: "0.68rem", color: "#64748b", fontFamily: "var(--font-mono)" }}>{v.subnet}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Selected VLAN Inspector */}
                <div style={{ padding: "1.1rem", background: "#0a0f1e", border: "1px solid #1e293b", borderRadius: "0.6rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.7rem", fontFamily: "var(--font-mono)", color: selectedVlan.color, background: `${selectedVlan.color}15`, padding: "0.15rem 0.5rem", borderRadius: "999px", fontWeight: 700 }}>
                        VLAN {selectedVlan.id} Configuration
                      </span>
                      <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#f1f5f9" }}>{selectedVlan.name}</h4>
                    </div>

                    <button
                      onClick={simulatePing}
                      disabled={pingRunning}
                      className="btn-primary"
                      style={{ padding: "0.35rem 0.8rem", fontSize: "0.75rem" }}
                    >
                      <Play style={{ width: "0.75rem", height: "0.75rem" }} />
                      Simulate ICMP Ping
                    </button>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.6rem", fontSize: "0.78rem" }}>
                    <div><span style={{ color: "#64748b" }}>Subnet: </span><strong style={{ color: "#e2e8f0", fontFamily: "var(--font-mono)" }}>{selectedVlan.subnet}</strong></div>
                    <div><span style={{ color: "#64748b" }}>Gateway: </span><strong style={{ color: "#22d3ee", fontFamily: "var(--font-mono)" }}>{selectedVlan.gateway}</strong></div>
                    <div><span style={{ color: "#64748b" }}>Switchports: </span><strong style={{ color: "#e2e8f0", fontFamily: "var(--font-mono)" }}>{selectedVlan.ports}</strong></div>
                    <div><span style={{ color: "#64748b" }}>Security ACL: </span><strong style={{ color: "#4ade80" }}>{selectedVlan.aclPolicy}</strong></div>
                  </div>

                  {pingLog && (
                    <div style={{ marginTop: "0.85rem", padding: "0.75rem", background: "#060912", border: "1px solid #1e293b", borderRadius: "0.4rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#22d3ee", whiteSpace: "pre-line" }}>
                      {pingLog}
                    </div>
                  )}
                </div>

              </div>
            )}

            {activeTab === "table" && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", fontFamily: "var(--font-mono)" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #1e293b", color: "#06b6d4", textAlign: "left" }}>
                      <th style={{ padding: "0.6rem" }}>VLAN</th>
                      <th style={{ padding: "0.6rem" }}>Segment Name</th>
                      <th style={{ padding: "0.6rem" }}>Subnet &amp; CIDR</th>
                      <th style={{ padding: "0.6rem" }}>Default Gateway</th>
                      <th style={{ padding: "0.6rem" }}>Switch Ports</th>
                    </tr>
                  </thead>
                  <tbody>
                    {VLANS.map(v => (
                      <tr key={v.id} style={{ borderBottom: "1px solid rgba(30,41,59,0.5)", color: "#cbd5e1" }}>
                        <td style={{ padding: "0.6rem", color: v.color, fontWeight: 700 }}>{v.id}</td>
                        <td style={{ padding: "0.6rem" }}>{v.name}</td>
                        <td style={{ padding: "0.6rem" }}>{v.subnet}</td>
                        <td style={{ padding: "0.6rem", color: "#22d3ee" }}>{v.gateway}</td>
                        <td style={{ padding: "0.6rem" }}>{v.ports}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "cisco" && (
              <div style={{ background: "#090d16", border: "1px solid #1e293b", borderRadius: "0.5rem", padding: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.68rem", fontFamily: "var(--font-mono)", color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    Cisco IOS Configuration Script
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "#22c55e", fontFamily: "var(--font-mono)" }}>● Verified in Cisco Packet Tracer 8.2</span>
                </div>
                <pre style={{ color: "#e2e8f0", fontFamily: "var(--font-mono)", fontSize: "0.75rem", lineHeight: 1.5, overflowX: "auto" }}>
                  {CISCO_CONFIG_SNIPPET}
                </pre>
              </div>
            )}

          </div>

          {/* Footer */}
          <div style={{
            padding: "0.9rem 1.4rem", borderTop: "1px solid #1e293b",
            background: "#090d16", display: "flex", justifyContent: "flex-end",
          }}>
            <button className="btn-secondary" onClick={onClose} style={{ padding: "0.45rem 1.1rem", fontSize: "0.8rem" }}>
              Close Topology Viewer
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
