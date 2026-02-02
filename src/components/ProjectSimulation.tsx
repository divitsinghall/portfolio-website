// src/components/ProjectSimulation.tsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SimulationType = 'chronos' | 'titan' | 'ezygut' | 'default';

interface ProjectSimulationProps {
    type: SimulationType;
}

// Terminal simulation for Chronos-ITCH
const ChronosTerminal: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const messageTypes = ['A', 'F', 'E', 'X', 'D', 'U', 'P'];
    const actions = [
        'Add Order',
        'Order Executed',
        'Order Cancelled',
        'Replace Order',
        'Delete Order',
        'Trade',
        'Cross Trade',
    ];

    useEffect(() => {
        const generateLog = () => {
            const msgType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];
            const orderId = Math.floor(Math.random() * 99999999);
            const price = (150 + Math.random() * 10).toFixed(2);
            const shares = Math.floor(Math.random() * 1000) * 100;
            const latency = (Math.random() * 2).toFixed(2);

            const timestamp = new Date().toISOString().split('T')[1].slice(0, 12);

            return `[${timestamp}] [ITCH-5.0] Msg '${msgType}' → ${action} | ID: ${orderId} | ${shares}@$${price} | ${latency}ns`;
        };

        // Initial logs
        setLogs(Array(8).fill(null).map(() => generateLog()));

        // Add new logs periodically
        const interval = setInterval(() => {
            setLogs(prev => {
                const newLogs = [...prev, generateLog()];
                // Keep last 20 logs
                return newLogs.slice(-20);
            });
        }, 150 + Math.random() * 200);

        return () => clearInterval(interval);
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="h-full rounded-2xl border border-white/10 bg-black/60 overflow-hidden flex flex-col">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-secondary/60 ml-2">chronos-itch — feed-handler</span>
            </div>

            {/* Terminal Content */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed scrollbar-hide"
            >
                <AnimatePresence initial={false}>
                    {logs.map((log, i) => (
                        <motion.div
                            key={`${i}-${log}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15 }}
                            className="text-teal-400/70 whitespace-nowrap"
                        >
                            {log}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-teal-400 ml-1"
                />
            </div>
        </div>
    );
};

// Animated wireframe for Titan Orchestrator
const TitanWireframe: React.FC = () => {
    const [packets, setPackets] = useState<{ id: number; from: number; to: number; progress: number }[]>([]);
    const packetIdRef = useRef(0);

    useEffect(() => {
        const spawnPacket = () => {
            const newPacket = {
                id: packetIdRef.current++,
                from: Math.floor(Math.random() * 4), // 0 = master, 1-3 = workers
                to: Math.floor(Math.random() * 4),
                progress: 0,
            };
            // Don't go from/to same node
            if (newPacket.from === newPacket.to) {
                newPacket.to = (newPacket.to + 1) % 4;
            }
            setPackets(prev => [...prev, newPacket]);
        };

        // Spawn packets periodically
        const spawnInterval = setInterval(spawnPacket, 400 + Math.random() * 300);

        // Animate packets
        const animateInterval = setInterval(() => {
            setPackets(prev => {
                return prev
                    .map(p => ({ ...p, progress: p.progress + 0.05 }))
                    .filter(p => p.progress <= 1);
            });
        }, 50);

        return () => {
            clearInterval(spawnInterval);
            clearInterval(animateInterval);
        };
    }, []);

    // Node positions
    const nodes = [
        { x: 200, y: 50, label: 'MASTER', color: 'rgba(45,212,191,0.6)' },
        { x: 80, y: 180, label: 'WORKER_1', color: 'rgba(255,255,255,0.3)' },
        { x: 200, y: 180, label: 'WORKER_2', color: 'rgba(255,255,255,0.3)' },
        { x: 320, y: 180, label: 'WORKER_3', color: 'rgba(255,255,255,0.3)' },
    ];

    const getPacketPosition = (packet: typeof packets[0]) => {
        const from = nodes[packet.from];
        const to = nodes[packet.to];
        return {
            x: from.x + (to.x - from.x) * packet.progress,
            y: from.y + (to.y - from.y) * packet.progress,
        };
    };

    return (
        <div className="h-full rounded-2xl border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 400 260" className="w-full h-full max-h-[300px]">
                {/* Connection lines */}
                {nodes.slice(1).map((worker, i) => (
                    <g key={i}>
                        {/* Master to Worker */}
                        <line
                            x1={nodes[0].x}
                            y1={nodes[0].y + 20}
                            x2={worker.x}
                            y2={worker.y - 15}
                            stroke="rgba(45,212,191,0.15)"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                        {/* Worker to Redis */}
                        <line
                            x1={worker.x}
                            y1={worker.y + 15}
                            x2={200}
                            y2={230}
                            stroke="rgba(45,212,191,0.1)"
                            strokeWidth="1"
                            strokeDasharray="2 2"
                        />
                    </g>
                ))}

                {/* Nodes */}
                {nodes.map((node, i) => (
                    <g key={i}>
                        <rect
                            x={node.x - 35}
                            y={node.y - 15}
                            width="70"
                            height="30"
                            rx="6"
                            fill="rgba(0,0,0,0.4)"
                            stroke={node.color}
                            strokeWidth="1"
                        />
                        <text
                            x={node.x}
                            y={node.y + 4}
                            textAnchor="middle"
                            fill={node.color}
                            fontSize="9"
                            fontFamily="monospace"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}

                {/* Redis State */}
                <g>
                    <rect
                        x={155}
                        y={220}
                        width="90"
                        height="25"
                        rx="6"
                        fill="rgba(0,0,0,0.4)"
                        stroke="rgba(45,212,191,0.4)"
                        strokeWidth="1"
                    />
                    <text
                        x={200}
                        y={237}
                        textAnchor="middle"
                        fill="rgba(45,212,191,0.5)"
                        fontSize="9"
                        fontFamily="monospace"
                    >
                        REDIS STATE
                    </text>
                </g>

                {/* Animated Packets */}
                {packets.map(packet => {
                    const pos = getPacketPosition(packet);
                    return (
                        <motion.circle
                            key={packet.id}
                            cx={pos.x}
                            cy={pos.y}
                            r="4"
                            fill="rgb(45,212,191)"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0] }}
                            transition={{ duration: 1 }}
                            style={{
                                filter: 'drop-shadow(0 0 6px rgba(45,212,191,0.8))',
                            }}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

// Gradient glow for EzyGut (health app aesthetic)
const EzyGutVisual: React.FC = () => (
    <div className="h-full rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-cyan-500/10 overflow-hidden flex items-center justify-center relative">
        {/* Animated gradient orbs */}
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-64 h-64 rounded-full bg-emerald-500/20 blur-3xl"
            style={{ top: '20%', left: '30%' }}
        />
        <motion.div
            animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute w-48 h-48 rounded-full bg-teal-500/20 blur-3xl"
            style={{ bottom: '20%', right: '20%' }}
        />

        {/* Placeholder icon */}
        <div className="relative z-10 text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="text-4xl">🍃</span>
            </div>
            <p className="text-secondary/40 text-sm font-mono">Health & Wellness</p>
        </div>
    </div>
);

// Default placeholder
const DefaultVisual: React.FC = () => (
    <div className="h-full rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
        <div className="text-center">
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/10 blur-xl"
            />
            <p className="text-secondary/30 text-sm font-mono">Project Preview</p>
        </div>
    </div>
);

const ProjectSimulation: React.FC<ProjectSimulationProps> = ({ type }) => {
    switch (type) {
        case 'chronos':
            return <ChronosTerminal />;
        case 'titan':
            return <TitanWireframe />;
        case 'ezygut':
            return <EzyGutVisual />;
        default:
            return <DefaultVisual />;
    }
};

export default ProjectSimulation;
