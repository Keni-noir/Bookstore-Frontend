import { useState, useEffect } from 'react'
import { searchExternalBooks, type ExternalBook } from '../api/external'
import Navbar from '../components/Navbar'
import BookCard from '../components/BookCard'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'

const DiscoverPage = () => {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<ExternalBook[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            return
        }

        const delayDebounceFn = setTimeout(async () => {
            setLoading(true)
            try {
                const { data } = await searchExternalBooks(query)
                setResults(data || [])
            } catch (err) {
                toast.error('Failed to fetch results')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }, 1000)

        return () => clearTimeout(delayDebounceFn)
    }, [query])

    return (
        <div className="min-h-screen" style={{ background: 'var(--gradient-hero)' }}>
            <Navbar />

            <main className="page-container py-6 sm:py-10">
                <div className="mb-6 sm:mb-10 animate-fade-in-up">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                        Discover <span className="gradient-text">New Books</span>
                    </h1>
                    <p className="text-sm sm:text-base" style={{ color: 'var(--text-muted)' }}>
                        Search millions of books from around the world.
                    </p>
                </div>

                <div className="mb-6 sm:mb-8 w-full max-w-2xl">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base sm:text-lg">🔍</span>
                        <input
                            type="text"
                            className="input-glass pl-11 sm:pl-12 py-3 sm:py-4 text-sm sm:text-lg"
                            placeholder="Search by title, author, or ISBN..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <Spinner />
                ) : !query.trim() ? (
                    <div className="glass-card p-8 sm:p-16 text-center animate-fade-in">
                        <div className="text-4xl sm:text-6xl mb-4">📖</div>
                        <h2 className="text-base sm:text-xl font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                            Ready to explore?
                        </h2>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Enter a search query above to find books from external databases.
                        </p>
                    </div>
                ) : results.length === 0 ? (
                    <div className="glass-card p-8 sm:p-16 text-center animate-fade-in">
                        <div className="text-4xl sm:text-6xl mb-4">🕵️</div>
                        <h2 className="text-base sm:text-xl font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>
                            No results found
                        </h2>
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Try adjusting your search terms or keywords.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                        {results.map((book, i) => (
                            <div key={book.key || i} style={{ animationDelay: `${i * 60}ms` }}>
                                <BookCard
                                    book={{
                                        _id: book.key || String(i),
                                        title: book.title,
                                        author: book.author_name?.[0] || 'Unknown Author',
                                        description: `First published in ${book.first_publish_year || 'unknown'}`,
                                        price: 0,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default DiscoverPage
