'use client';

import React from 'react';

type RadioOption = {
    label: string;
    value: string;
};

type CheckboxOption = {
    label: string;
    value: string;
};

type RadioGroupProps = {
    name: string;
    value: string;
    onChange: (value: string) => void;
    options: RadioOption[];
};

export function RadioGroup({ value, onChange, options }: RadioGroupProps) {
    return (
        <div className="space-y-2">
            {options.map((opt) => {
                const isActive = value === opt.value;
                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange(opt.value)}
                        className={`flex h-11 w-full items-center rounded-full border px-4 text-sm transition
              ${
                  isActive
                      ? 'border-[#4CB7A5] bg-[#E4F5F1] text-[#20927E]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#4CB7A5]/60'
              }`}
                    >
                        <span
                            className={`mr-3 inline-flex h-4 w-4 items-center justify-center rounded-full border
                ${isActive ? 'border-[#4CB7A5] bg-[#4CB7A5]' : 'border-gray-300 bg-white'}`}
                        >
                            {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                        </span>
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

type CheckboxGroupProps = {
    values: string[];
    onChange: (values: string[]) => void;
    options: CheckboxOption[];
    maxSelected?: number;
};

export function CheckboxGroup({ values, onChange, options, maxSelected }: CheckboxGroupProps) {
    const toggleValue = (value: string) => {
        const isSelected = values.includes(value);
        if (isSelected) {
            onChange(values.filter((v) => v !== value));
        } else {
            if (maxSelected && values.length >= maxSelected) return;
            onChange([...values, value]);
        }
    };

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((opt) => {
                const isActive = values.includes(opt.value);
                const disabled =
                    maxSelected !== undefined && values.length >= maxSelected && !values.includes(opt.value);

                return (
                    <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleValue(opt.value)}
                        disabled={disabled}
                        className={`rounded-full border px-4 py-2 text-sm transition
              ${
                  isActive
                      ? 'border-[#4CB7A5] bg-[#E4F5F1] text-[#20927E]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-[#4CB7A5]/60'
              }
              ${disabled ? 'cursor-not-allowed opacity-40' : ''}
            `}
                    >
                        {opt.label}
                    </button>
                );
            })}
        </div>
    );
}

type TextAreaWithPreviewProps = {
    value: string;
    onChange: (v: string) => void;
    maxLength?: number;
};

export function TextAreaWithPreview({ value, onChange, maxLength = 150 }: TextAreaWithPreviewProps) {
    const length = value.length;

    return (
        <div className="grid gap-4">
            <div className="space-y-1">
                <textarea
                    value={value}
                    onChange={(e) => {
                        const next = e.target.value;
                        if (next.length <= maxLength) onChange(next);
                    }}
                    rows={4}
                    placeholder="예) 하루에 한 끼는 같이 먹어요."
                    className="
                        w-full
                        rounded-xl
                        border 
                        border-gray-300
                        bg-white
                        px-4 py-3
                        text-sm
                        outline-none
                        focus:border-[#4CB7A5]
                        focus:ring-1
                        focus:ring-[#4CB7A5]
                        transition
                    "
                />
                <div className="flex justify-end text-xs text-gray-400">
                    {length}/{maxLength}
                </div>
            </div>

            <p className="text-[11px] text-red-500">* 상대방이 보기 때문에 신중하게 작성해주세요.</p>
        </div>
    );
}

type TagInputProps = {
    tags: string[];
    onChange: (tags: string[]) => void;
    maxTags?: number;
};

export function TagInput({ tags, onChange, maxTags = 5 }: TagInputProps) {
    const [input, setInput] = React.useState('');

    const addTag = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        if (tags.length >= maxTags) return;
        if (tags.includes(trimmed)) return;
        onChange([...tags, trimmed]);
        setInput('');
    };

    const removeTag = (tag: string) => {
        onChange(tags.filter((t) => t !== tag));
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="flex items-center gap-1 rounded-full bg-[#E4F5F1] px-3 py-1 text-sm text-[#20927E]"
                    >
                        #{tag}
                        <span className="text-xs text-[#20927E]/70">✕</span>
                    </button>
                ))}
            </div>
            {tags.length < maxTags && (
                <div className="flex gap-2">
                    <span className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 text-sm text-gray-400">
                        #
                    </span>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="태그 입력 후 Enter"
                        className="flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none focus:border-[#4CB7A5]"
                    />
                </div>
            )}
            <p className="text-xs text-gray-400">
                태그 {tags.length}/{maxTags}개 
            </p>
        </div>
    );
}
