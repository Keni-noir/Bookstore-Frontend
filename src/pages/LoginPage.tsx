import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { extractAuthPayload, login as loginApi } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const LoginPage = () => {
    const [form, setForm] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.username || !form.password) {
            toast.error('Please fill in all fields')
            return
        }
        setLoading(true)
        try {
            const { data } = await loginApi(form.username, form.password)
            const auth = extractAuthPayload(data)

            if (!auth.token) {
                throw new Error('Invalid login response from server')
            }

            const user = auth.user ?? {
                id: form.username,
                username: form.username,
                email: '',
            }

            login(auth.token, user)
            toast.success(`Welcome back, ${user.username}!`)
            navigate('/')
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? err?.message ?? 'Login failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-8"
            style={{ background: 'var(--gradient-hero)' }}
        >
            {/* Background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: '#6366f1', top: '-10%', left: '-10%' }}
                />
                <div
                    className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl opacity-15"
                    style={{ background: '#8b5cf6', bottom: '-10%', right: '-10%' }}
                />
            </div>

            <div className="glass-card w-full max-w-md p-6 sm:p-8 flex flex-col gap-5 sm:gap-7 animate-fade-in-up relative">
                {/* Header */}
                <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">📚</div>
                    <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-1">Welcome back</h1>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Sign in to your Bookstore account
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="label-text">Username</label>
                        <input
                            className="input-glass"
                            type="text"
                            placeholder="Your username"
                            value={form.username}
                            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="label-text">Password</label>
                        <input
                            className="input-glass"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full mt-2 py-3 text-base"
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#818cf8' }} className="font-medium hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
