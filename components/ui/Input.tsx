import React from 'react'

export default function Input({ label }: { label: string }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                {label}
            </label>

            <input
                className="w-full rounded-xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 outline-none focus:border-[var(--accent)]"
                type="text"
            />
        </div>
    )
}
