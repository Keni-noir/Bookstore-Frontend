import type { Book } from '../api/books'

interface BookCardProps {
    book: Book
    onEdit?: (book: Book) => void
    onDelete?: (id: string) => void
    showActions?: boolean
}

const BookCard = ({ book, onEdit, onDelete, showActions = false }: BookCardProps) => {
    const priceLabel = book.price != null ? `$${Number(book.price).toFixed(2)}` : null

    return (
        <div className="glass-card p-5 flex flex-col gap-3 animate-fade-in-up">
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                    <h3
                        className="font-semibold text-base leading-snug mb-1"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        {book.title}
                    </h3>
                    <p className="text-sm font-medium" style={{ color: 'var(--accent-indigo)' }}>
                        {book.author}
                    </p>
                </div>
                {priceLabel && (
                    <span
                        className="text-sm font-bold px-2 py-1 rounded-lg shrink-0"
                        style={{
                            background: 'rgba(99,102,241,0.15)',
                            color: '#818cf8',
                            border: '1px solid rgba(99,102,241,0.3)',
                        }}
                    >
                        {priceLabel}
                    </span>
                )}
            </div>

            {/* Genre pill */}
            {book.genre && (
                <span
                    className="self-start text-xs px-2 py-0.5 rounded-full"
                    style={{
                        background: 'rgba(139,92,246,0.12)',
                        color: '#a78bfa',
                        border: '1px solid rgba(139,92,246,0.25)',
                    }}
                >
                    {book.genre}
                </span>
            )}

            {/* Description */}
            {book.description && (
                <p
                    className="text-sm leading-relaxed line-clamp-3"
                    style={{ color: 'var(--text-muted)' }}
                >
                    {book.description}
                </p>
            )}

            {/* Actions */}
            {showActions && (
                <div className="flex gap-2 mt-auto pt-2 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                    <button
                        onClick={() => onEdit?.(book)}
                        className="btn-secondary text-xs px-3 py-1.5 flex-1"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={() => onDelete?.(book._id)}
                        className="btn-danger text-xs px-3 py-1.5 flex-1"
                    >
                        🗑️ Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default BookCard
