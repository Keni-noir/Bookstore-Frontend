import { useState, useEffect } from 'react'
import type { Book, BookPayload } from '../api/books'

interface BookModalProps {
    onClose: () => void
    onSubmit: (data: BookPayload) => Promise<void>
    initial?: Book | null
}

const empty: BookPayload = { title: '', author: '', description: '', price: 0, publishedDate: ''}

const BookModal = ({ onClose, onSubmit, initial }: BookModalProps) => {
    const [form, setForm] = useState<BookPayload>(initial ? {
        title: initial.title,
        author: initial.author,
        description: initial.description,
        price: initial.price,
        publishedDate: initial.publishedDate ?? '',
    } : empty)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [onClose])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onSubmit(form)
            onClose()
        } finally {
            setLoading(false)
        }
    }

    const field = (label: string, key: keyof BookPayload, type = 'text', placeholder = '') => (
        <div>
            <label className="label-text">{label}</label>
            {key === 'description' ? (
                <textarea
                    className="input-glass resize-none"
                    rows={3}
                    placeholder={placeholder}
                    value={form[key] as string}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                />
            ) : (
                <input
                    className="input-glass"
                    type={type}
                    placeholder={placeholder}
                    value={form[key] as string | number}
                    onChange={e => setForm(f => ({ ...f, [key]: type === 'number' ? Number(e.target.value) : e.target.value }))}
                />
            )}
        </div>
    )

    return (
        <div className="modal-overlay px-3 sm:px-4 items-end sm:items-center" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
            <div
                className="glass-card w-full max-w-lg p-5 sm:p-7 flex flex-col gap-4 sm:gap-5 animate-fade-in-up rounded-t-2xl sm:rounded-2xl"
                style={{ maxHeight: '92vh', overflowY: 'auto' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg sm:text-xl font-bold gradient-text">
                        {initial ? 'Edit Book' : 'Add New Book'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-lg transition-colors"
                        style={{ color: 'var(--text-muted)', background: 'var(--glass-bg)' }}
                    >
                        ✕
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                    {field('Title', 'title', 'text', 'e.g. The Pragmatic Programmer')}
                    {field('Author', 'author', 'text', 'e.g. Andrew Hunt')}
                    {field('Description', 'description', 'text', 'Brief description of the book...')}
                    {field('Price ($)', 'price', 'number', '0.00')}
                    {field('Published Date', 'publishedDate', 'date', 'e.g. 2023-01-01')}

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose} className="btn-secondary flex-1 py-2.5">
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} className="btn-primary flex-1 py-2.5">
                            {loading ? 'Saving...' : initial ? 'Update Book' : 'Add Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BookModal
