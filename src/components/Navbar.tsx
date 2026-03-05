import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
        setMenuOpen(false)
    }

    return (
        <nav className="glass-nav sticky top-0 z-40">
            <div className="page-container flex items-center justify-between h-16">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 no-underline" onClick={() => setMenuOpen(false)}>
                    <span className="text-2xl">📚</span>
                    <span className="font-bold text-lg gradient-text">Bookstore</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden sm:flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/discover"
                        className="text-sm font-medium transition-colors duration-200"
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-primary)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                        Discover
                    </Link>
                </div>

                {/* Desktop User + Logout */}
                <div className="hidden sm:flex items-center gap-4">
                    {user && (
                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            👋 <span style={{ color: 'var(--text-secondary)' }}>{user.username}</span>
                        </span>
                    )}
                    <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2">
                        Logout
                    </button>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg transition-colors"
                    style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <span
                        className="block w-5 h-0.5 transition-all duration-300 origin-center"
                        style={{
                            background: 'var(--text-primary)',
                            transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none',
                        }}
                    />
                    <span
                        className="block w-5 h-0.5 transition-all duration-300"
                        style={{
                            background: 'var(--text-primary)',
                            opacity: menuOpen ? 0 : 1,
                        }}
                    />
                    <span
                        className="block w-5 h-0.5 transition-all duration-300 origin-center"
                        style={{
                            background: 'var(--text-primary)',
                            transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                        }}
                    />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div
                    className="sm:hidden border-t px-4 py-4 flex flex-col gap-3 animate-fade-in"
                    style={{
                        background: 'rgba(11, 13, 26, 0.95)',
                        borderColor: 'var(--glass-border)',
                    }}
                >
                    {user && (
                        <p className="text-sm pb-2 border-b" style={{ color: 'var(--text-muted)', borderColor: 'var(--glass-border)' }}>
                            👋 Signed in as <span style={{ color: 'var(--text-secondary)' }}>{user.username}</span>
                        </p>
                    )}
                    <Link
                        to="/"
                        className="text-sm font-medium py-2"
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        to="/discover"
                        className="text-sm font-medium py-2"
                        style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                        onClick={() => setMenuOpen(false)}
                    >
                        🔍 Discover
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="btn-secondary text-sm text-left mt-1"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar
