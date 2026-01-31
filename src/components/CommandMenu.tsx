// src/components/CommandMenu.tsx
import { useEffect, useState, useCallback } from 'react';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaFileDownload, FaEnvelope, FaGithub, FaLinkedin, FaCode, FaServer, FaMobileAlt, FaSearch } from 'react-icons/fa';
import { scroller } from 'react-scroll';

interface CommandMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, setIsOpen }) => {
    const [search, setSearch] = useState('');

    // Keyboard shortcut handler
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === 'Escape') {
                e.preventDefault();
                if (e.key === 'Escape') {
                    setIsOpen(false);
                } else {
                    setIsOpen(!isOpen);
                }
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, [isOpen, setIsOpen]);

    const handleSelect = useCallback((action: string) => {
        setIsOpen(false);
        setSearch('');

        switch (action) {
            case 'home':
                scroller.scrollTo('hero', { smooth: true, duration: 500 });
                break;
            case 'about':
                scroller.scrollTo('about', { smooth: true, duration: 500 });
                break;
            case 'projects':
                scroller.scrollTo('projects', { smooth: true, duration: 500 });
                break;
            case 'experience':
                scroller.scrollTo('experience', { smooth: true, duration: 500 });
                break;
            case 'contact':
                scroller.scrollTo('contact', { smooth: true, duration: 500 });
                break;
            case 'resume':
                window.open('/resume.pdf', '_blank');
                break;
            case 'copy-email':
                navigator.clipboard.writeText('divit.singhal@example.com');
                // Could add a toast notification here
                break;
            case 'github':
                window.open('https://github.com/divitsinghall', '_blank');
                break;
            case 'linkedin':
                window.open('https://linkedin.com/in/divit-singhal', '_blank');
                break;
            default:
                break;
        }
    }, [setIsOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Command Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -10 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2"
                    >
                        <Command
                            className="overflow-hidden rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-2xl shadow-2xl"
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setIsOpen(false);
                                }
                            }}
                        >
                            {/* Search Input */}
                            <div className="flex items-center gap-3 border-b border-white/10 px-4">
                                <FaSearch className="text-secondary/50" size={16} />
                                <Command.Input
                                    value={search}
                                    onValueChange={setSearch}
                                    placeholder="Type a command or search..."
                                    className="h-14 w-full bg-transparent text-primary placeholder:text-secondary/50 outline-none font-sans"
                                    autoFocus
                                />
                                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-secondary/50 bg-white/5 border border-white/10 rounded-md font-mono">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <Command.List className="max-h-[320px] overflow-y-auto p-2 scrollbar-hide">
                                <Command.Empty className="py-6 text-center text-secondary/60 text-sm">
                                    No results found.
                                </Command.Empty>

                                {/* Navigation */}
                                <Command.Group heading="Navigation" className="mb-2">
                                    <div className="px-2 py-1.5 text-xs font-medium text-secondary/40 uppercase tracking-wider">
                                        Navigation
                                    </div>
                                    <CommandItem icon={<FaHome />} onSelect={() => handleSelect('home')}>
                                        Go to Home
                                    </CommandItem>
                                    <CommandItem icon={<FaCode />} onSelect={() => handleSelect('projects')}>
                                        View Projects
                                    </CommandItem>
                                    <CommandItem icon={<FaServer />} onSelect={() => handleSelect('experience')}>
                                        Experience
                                    </CommandItem>
                                    <CommandItem icon={<FaEnvelope />} onSelect={() => handleSelect('contact')}>
                                        Contact
                                    </CommandItem>
                                </Command.Group>

                                {/* Actions */}
                                <Command.Group heading="Actions">
                                    <div className="px-2 py-1.5 text-xs font-medium text-secondary/40 uppercase tracking-wider">
                                        Actions
                                    </div>
                                    <CommandItem icon={<FaFileDownload />} onSelect={() => handleSelect('resume')}>
                                        View Resume
                                    </CommandItem>
                                    <CommandItem icon={<FaEnvelope />} onSelect={() => handleSelect('copy-email')}>
                                        Copy Email Address
                                    </CommandItem>
                                </Command.Group>

                                {/* Projects */}
                                <Command.Group heading="Projects">
                                    <div className="px-2 py-1.5 text-xs font-medium text-secondary/40 uppercase tracking-wider">
                                        Projects
                                    </div>
                                    <CommandItem icon={<FaCode />} onSelect={() => handleSelect('projects')}>
                                        Chronos-ITCH
                                    </CommandItem>
                                    <CommandItem icon={<FaServer />} onSelect={() => handleSelect('projects')}>
                                        Titan Orchestrator
                                    </CommandItem>
                                    <CommandItem icon={<FaMobileAlt />} onSelect={() => handleSelect('projects')}>
                                        EzyGut
                                    </CommandItem>
                                </Command.Group>

                                {/* Social */}
                                <Command.Group heading="Social">
                                    <div className="px-2 py-1.5 text-xs font-medium text-secondary/40 uppercase tracking-wider">
                                        Social
                                    </div>
                                    <CommandItem icon={<FaGithub />} onSelect={() => handleSelect('github')}>
                                        GitHub Profile
                                    </CommandItem>
                                    <CommandItem icon={<FaLinkedin />} onSelect={() => handleSelect('linkedin')}>
                                        LinkedIn Profile
                                    </CommandItem>
                                </Command.Group>
                            </Command.List>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-xs text-secondary/40">
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">↑↓</kbd>
                                        Navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded text-[10px]">↵</kbd>
                                        Select
                                    </span>
                                </div>
                                <span className="font-mono">cmd+k</span>
                            </div>
                        </Command>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Individual Command Item Component
interface CommandItemProps {
    children: React.ReactNode;
    icon: React.ReactNode;
    onSelect: () => void;
}

const CommandItem: React.FC<CommandItemProps> = ({ children, icon, onSelect }) => (
    <Command.Item
        onSelect={onSelect}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer text-secondary hover:bg-white/10 hover:text-primary data-[selected=true]:bg-white/10 data-[selected=true]:text-primary transition-colors"
    >
        <span className="text-secondary/60">{icon}</span>
        <span className="text-sm">{children}</span>
    </Command.Item>
);

export default CommandMenu;
