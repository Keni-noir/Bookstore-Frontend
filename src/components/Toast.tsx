import { Toaster } from 'react-hot-toast'

const Toast = () => (
    <Toaster
        position="top-right"
        toastOptions={{
            duration: 3500,
            style: {
                background: '#1e2340',
                color: '#f1f5f9',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
            },
            success: {
                iconTheme: { primary: '#6366f1', secondary: '#fff' },
            },
            error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
        }}
    />
)

export default Toast
