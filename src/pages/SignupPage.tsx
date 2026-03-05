import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { extractAuthPayload, signUp } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const SignupPage = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const validate = () => {
        if (!form.username || !form.email || !form.password) {
            toast.error('Please fill in all fields')
            return false
        }
        if (form.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return false
        }
        if (form.password !== form.confirm) {
            toast.error('Passwords do not match')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validate()) return
        setLoading(true)
        try {
            const { data } = await signUp(form.username, form.email, form.password)
            const auth = extractAuthPayload(data)

            if (auth.token) {
                const user = auth.user ?? {
                    id: form.username,
                    username: form.username,
                    email: form.email,
                }

                login(auth.token, user)
                toast.success(`Welcome, ${user.username}! 🎉`)
                navigate('/')
                return
            }

            toast.success('Account created successfully. Please sign in.')
            navigate('/login', { replace: true })
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? err?.message ?? 'Signup failed')
        } finally {
            setLoading(false)
        }
    }

    const field = (label: string, key: keyof typeof form, type = 'text', placeholder = '') => (
        <div>
            <label className="label-text">{label}</label>
            <input
                className="input-glass"
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            />
        </div>
    )

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 py-8"
            style={{ background: 'var(--gradient-hero)' }}
        >
            {/* Background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-3xl opacity-20"
                    style={{ background: '#6366f1', top: '5%', right: '-5%' }}
                />
                <div
                    className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full blur-3xl opacity-15"
                    style={{ background: '#8b5cf6', bottom: '5%', left: '-5%' }}
                />
            </div>

            <div className="glass-card w-full max-w-md p-6 sm:p-8 flex flex-col gap-5 sm:gap-7 animate-fade-in-up relative">
                {/* Header */}
                <div className="text-center">
                    <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">📚</div>
                    <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-1">Create account</h1>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        Join Bookstore and manage your collection
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {field('Username', 'username', 'text', 'Choose a username')}
                    {field('Email', 'email', 'email', 'you@example.com')}
                    {field('Password', 'password', 'password', '••••••••')}
                    {field('Confirm Password', 'confirm', 'password', '••••••••')}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full mt-2 py-3 text-base"
                        style={{ opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: '#818cf8' }} className="font-medium hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignupPage
