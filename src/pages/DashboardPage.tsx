import { useEffect, useState } from 'react'
import { type Book, getBooks, createBook, updateBook, deleteBook, type BookPayload } from '../api/books'
import Navbar from '../components/Navbar'
import BookCard from '../components/BookCard'
import BookModal from '../components/BookModal'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export const DashboardPage = () => {
    const { user } = useAuth()
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editing, setEditing] = useState<Book | null>(null)

    const fetchBooks = async () => {
        setLoading(true)
        try {
            const { data: response } = await getBooks()
            setBooks(response.data)
        } catch {
            toast.error('Failed to load books')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchBooks() }, [])

    const handleCreate = async (data: BookPayload) => {
        await createBook(data)
        toast.success('Book added!')
        fetchBooks()
    }

    const handleUpdate = async (data: BookPayload) => {
        if (!editing) return
        await updateBook(editing._id, data)
        toast.success('Book updated!')
        fetchBooks()
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this book?')) return
        try {
            await deleteBook(id)
            toast.success('Book deleted')
            fetchBooks()
        } catch {
            toast.error('Failed to delete')
        }
    }

    const openEdit = (book: Book) => {
        setEditing(book)
        setModalOpen(true)
    }

    const closeModal = () => {
        setEditing(null)
        setModalOpen(false)
    }

    return (
        <div className="min-h-screen w-full" style={{ background: 'var(--gradient-hero)' }}>
            <Navbar />

            <main className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10">

                {/* Hero Header */}
                <div className="mb-5 sm:mb-10 animate-fade-in-up">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                        Your <span className="gradient-text">Library</span>
                    </h1>
                    <p className="text-xs sm:text-base" style={{ color: 'var(--text-muted)' }}>
                        Hey {user?.username}, manage your book collection here.
                    </p>
                </div>

                {/* Top bar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6">
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
                    </p>
                    <button
                        onClick={() => { setEditing(null); setModalOpen(true) }}
                        className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto py-3 sm:py-2"
                    >
                        <span className="text-base">+</span> Add Book
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Spinner />
                    </div>
                ) : books.length === 0 ? (
                    <div className="glass-card p-8 sm:p-16 text-center animate-fade-in mx-auto max-w-lg">
                        <div className="text-4xl sm:text-6xl mb-4">📭</div>
                        <h2 className="text-base sm:text-xl font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                            No books yet
                        </h2>
                        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                            Start building your collection by adding your first book.
                        </p>
                        <button
                            onClick={() => setModalOpen(true)}
                            className="btn-primary w-full sm:w-auto"
                        >
                            + Add First Book
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                        {books.map((book, i) => (
                            <div key={book._id} style={{ animationDelay: `${i * 60}ms` }}>
                                <BookCard
                                    book={book}
                                    showActions
                                    onEdit={openEdit}
                                    onDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Modal */}
            {modalOpen && (
                <BookModal
                    onClose={closeModal}
                    onSubmit={editing ? handleUpdate : handleCreate}
                    initial={editing}
                />
            )}
        </div>
    )
}

export default DashboardPage