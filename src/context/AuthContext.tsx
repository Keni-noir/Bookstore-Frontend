import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

interface User {
  id: string
  username: string
  email: string
}

interface AuthContextType {
  token: string | null
  user: User | null
  login: (token: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Safe token initializer
  const [token, setToken] = useState<string | null>(() => {
    const stored = localStorage.getItem('token')
    return stored && stored !== 'undefined' ? stored : null
  })

  // Safe user initializer
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')

    if (!stored || stored === 'undefined') return null

    try {
      return JSON.parse(stored)
    } catch {
      return null
    }
  })

  const login = (newToken: string, newUser: User) => {
    if (!newToken || !newUser) {
      console.error('Invalid login data')
      return
    }

    setToken(newToken)
    setUser(newUser)

    localStorage.setItem('token', newToken)
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  const logout = () => {
    setToken(null)
    setUser(null)

    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}