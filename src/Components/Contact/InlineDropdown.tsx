import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

const InlineDropdown = React.memo<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    value: string;
    options: string[];
    onSelect: (option: string) => void;
    placeholder: string;
    dropdownRef: React.RefObject<HTMLDivElement>;
}>(({ isOpen, setIsOpen, value, options, onSelect, placeholder, dropdownRef }) => (
    <div ref={dropdownRef} className="relative inline-block">
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1 text-gray-300 hover:text-gray-100 transition-colors duration-200 border-b border-dashed border-gray-500 hover:border-gray-400 focus:outline-none focus:border-gray-400"
        >
            <span className="font-medium">{value || placeholder}</span>
            <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
        </button>

        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 min-w-48 max-w-64"
                >
                    {options.map((option, index) => (
                        <motion.button
                            key={option}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            onClick={() => onSelect(option)}
                            className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150"
                        >
                            {option}
                        </motion.button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
));

export default InlineDropdown;