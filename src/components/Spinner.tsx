const Spinner = () => (
    <div className="fixed inset-0 flex items-center justify-center z-50"
        style={{ background: 'rgba(11,13,26,0.8)', backdropFilter: 'blur(6px)' }}>
        <div className="relative">
            <div
                className="w-16 h-16 rounded-full border-4"
                style={{
                    borderColor: 'rgba(99,102,241,0.2)',
                    borderTopColor: '#6366f1',
                    animation: 'spin 0.8s linear infinite',
                }}
            />
            <div
                className="absolute inset-2 w-12 h-12 rounded-full border-4"
                style={{
                    borderColor: 'rgba(139,92,246,0.15)',
                    borderTopColor: '#8b5cf6',
                    animation: 'spin 1.2s linear infinite reverse',
                }}
            />
        </div>
    </div>
)

export default Spinner
