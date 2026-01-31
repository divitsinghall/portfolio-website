// src/components/BentoCard.tsx
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface BentoCardProps {
    title: string;
    description: string;
    techStack: string[];
    github?: string;
    link?: string;
    stats?: { label: string; value: string }[];
    variant: 'chronos' | 'ezygut' | 'titan' | 'default';
    size: 'large' | 'medium' | 'small';
    index: number;
}

// Code scrolling animation for Chronos-ITCH with proper masking
const CodeBackground: React.FC = () => {
    const codeLines = [
        'template<typename T>',
        'struct BigEndian {',
        '  T value;',
        '  [[nodiscard]] T get() const noexcept {',
        '    if constexpr (sizeof(T) == 2)',
        '      return __builtin_bswap16(value);',
        '    else if constexpr (sizeof(T) == 4)',
        '      return __builtin_bswap32(value);',
        '    else if constexpr (sizeof(T) == 8)',
        '      return __builtin_bswap64(value);',
        '  }',
        '};',
        '',
        'class OrderBook {',
        '  IntrusiveList<Order> bids_;',
        '  IntrusiveList<Order> asks_;',
        '  MemPool<Order, 10\'000\'000> pool_;',
        '',
        '  [[likely]] void add_order(Order* order) {',
        '    auto& side = order->is_buy ? bids_ : asks_;',
        '    side.insert(order);',
        '  }',
        '};',
    ];

    return (
        <div
            className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
                maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 70%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 70%)',
            }}
        >
            <motion.div
                className="font-mono text-[10px] text-teal-400/30 whitespace-pre leading-relaxed"
                animate={{ y: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                {[...codeLines, ...codeLines].map((line, i) => (
                    <div key={i} className="px-6">{line}</div>
                ))}
            </motion.div>
        </div>
    );
};

// Wireframe background for TitanOrchestrator with parallax
interface WireframeBackgroundProps {
    mouseX: number;
    mouseY: number;
}

const WireframeBackground: React.FC<WireframeBackgroundProps> = ({ mouseX, mouseY }) => {
    // Parallax offset - nodes move opposite to mouse direction
    const offsetX = -mouseX * 20;
    const offsetY = -mouseY * 20;

    return (
        <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
                maskImage: 'linear-gradient(135deg, black 0%, black 40%, transparent 80%)',
                WebkitMaskImage: 'linear-gradient(135deg, black 0%, black 40%, transparent 80%)',
            }}
        >
            <motion.svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 400 300"
                fill="none"
                style={{
                    transform: `translate(${offsetX}px, ${offsetY}px)`,
                }}
            >
                {/* Master Node */}
                <rect x="170" y="30" width="60" height="30" rx="4" stroke="rgba(45,212,191,0.3)" strokeWidth="1" />
                <text x="200" y="50" textAnchor="middle" fill="rgba(45,212,191,0.4)" fontSize="8" fontFamily="monospace">MASTER</text>

                {/* Worker Nodes */}
                {[0, 1, 2].map((i) => (
                    <g key={i}>
                        <line x1="200" y1="60" x2={80 + i * 120} y2="100" stroke="rgba(45,212,191,0.2)" strokeWidth="1" strokeDasharray="4 4" />
                        <rect x={50 + i * 120} y="100" width="60" height="25" rx="4" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                        <text x={80 + i * 120} y="117" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="7" fontFamily="monospace">WORKER_{i + 1}</text>
                    </g>
                ))}

                {/* Redis State */}
                <rect x="160" y="160" width="80" height="25" rx="4" stroke="rgba(45,212,191,0.25)" strokeWidth="1" />
                <text x="200" y="177" textAnchor="middle" fill="rgba(45,212,191,0.3)" fontSize="7" fontFamily="monospace">REDIS STATE</text>

                {/* Connections to Redis */}
                {[0, 1, 2].map((i) => (
                    <line key={i} x1={80 + i * 120} y1="125" x2="200" y2="160" stroke="rgba(45,212,191,0.15)" strokeWidth="1" strokeDasharray="2 2" />
                ))}
            </motion.svg>
        </div>
    );
};

// Clean gradient for EzyGut
const EzyGutBackground: React.FC = () => (
    <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
            maskImage: 'linear-gradient(to bottom right, black 0%, black 30%, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(to bottom right, black 0%, black 30%, transparent 70%)',
        }}
    >
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-transparent to-cyan-500/5" />
    </div>
);

const BentoCard: React.FC<BentoCardProps> = ({
    title,
    description,
    techStack,
    github,
    link,
    stats,
    variant,
    size,
    index,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['2deg', '-2deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg']);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    const getBackground = () => {
        switch (variant) {
            case 'chronos':
                return <CodeBackground />;
            case 'titan':
                return <WireframeBackground mouseX={x.get()} mouseY={y.get()} />;
            case 'ezygut':
                return <EzyGutBackground />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            whileHover={{ scale: 1.02 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className={`
        bento-card group cursor-pointer
        ${size === 'large' ? 'md:col-span-2 min-h-[320px]' : 'min-h-[280px]'}
        ${size === 'small' ? 'min-h-[240px]' : ''}
      `}
        >
            {/* Background Effect */}
            {getBackground()}

            {/* Content with gradient background for readability */}
            <div className="relative z-10 h-full flex flex-col p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent rounded-3xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-primary tracking-tight mb-2 group-hover:text-white transition-colors">
                            {title}
                        </h3>
                    </div>

                    {/* Links */}
                    <div className="flex gap-2">
                        {github && (
                            <a
                                href={github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-secondary/50 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaGithub size={18} />
                            </a>
                        )}
                        {link && (
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-secondary/50 hover:text-accent hover:bg-white/10 rounded-lg transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaExternalLinkAlt size={16} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-secondary/80 text-sm leading-relaxed mb-auto">
                    {description}
                </p>

                {/* Stats with Teal/Cyan glow */}
                {stats && stats.length > 0 && (
                    <div className="flex flex-wrap gap-2 my-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="stat-badge">
                                <span className="text-secondary/60">{stat.label}:</span>
                                <span
                                    className="text-teal-400 font-semibold"
                                    style={{
                                        textShadow: '0 0 15px rgba(45,212,191,0.5)',
                                        filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.3))'
                                    }}
                                >
                                    {stat.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tech Stack */}
                <div className="pt-4 border-t border-white/5 mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {techStack.slice(0, size === 'large' ? 6 : 4).map((tech) => (
                            <span key={tech} className="tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hover Gradient Overlay */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                    background: `radial-gradient(600px circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(45, 212, 191, 0.06), transparent 40%)`,
                }}
            />
        </motion.div>
    );
};

export default BentoCard;
