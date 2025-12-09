import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface BlurFadeProps {
    children: ReactNode;
    className?: string;
    variant?: {
        hidden: { y: number };
        visible: { y: number };
    };
    duration?: number;
    delay?: number;
    yOffset?: number;
    inView?: boolean;
    inViewMargin?: string;
    blur?: string;
}

const BlurFade = ({
    children,
    className,
    variant,
    duration = 0.4,
    delay = 0,
    yOffset = 20,
    inView = false,
    inViewMargin = '-50px',
    blur = '10px',
}: BlurFadeProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inViewResult = useInView(ref, { once: true, margin: inViewMargin as `${number}px` });
    const isInView = !inView || inViewResult;

    const defaultVariants: Variants = {
        hidden: {
            y: yOffset,
            opacity: 0,
            filter: `blur(${blur})`,
        },
        visible: {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
        },
    };

    const combinedVariants = variant || defaultVariants;

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={combinedVariants}
            transition={{
                delay: 0.04 + delay,
                duration,
                ease: 'easeOut',
                type: 'spring',
                stiffness: 150,
                damping: 20,
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
};

export default BlurFade;
