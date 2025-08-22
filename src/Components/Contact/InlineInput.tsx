import React from 'react';

const InlineInput = React.memo<{
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder: string;
    inputRef: React.RefObject<HTMLInputElement> | null;
    type?: string;
}>(({ value, onChange, onKeyDown, placeholder, inputRef, type = "text" }) => (
    <input
        ref={inputRef}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="inline-block bg-transparent outline-none border-b border-dashed border-gray-500 focus:border-gray-400 transition-colors duration-200 text-gray-100 font-medium placeholder-gray-500 min-w-28 max-w-80"
        style={{ width: `${Math.max(value.length, placeholder.length) * 0.8 + 2}ch` }}
    />
));

export default InlineInput;