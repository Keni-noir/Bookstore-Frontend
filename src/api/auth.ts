import api from './axios'

export interface AuthUser {
    id: string
    username: string
    email: string
}

export interface AuthPayload {
    token: string | null
    user: AuthUser | null
}

const pickString = (...values: unknown[]): string | undefined => {
    const value = values.find((item) => typeof item === 'string' && item.trim().length > 0)
    return value as string | undefined
}

const normalizeUser = (value: unknown): AuthUser | null => {
    if (!value || typeof value !== 'object') return null

    const raw = value as Record<string, unknown>
    const id = pickString(raw.id, raw._id, raw.userId)
    const username = pickString(raw.username, raw.name, raw.fullName, raw.email)
    const email = pickString(raw.email)

    if (!id && !username && !email) return null

    return {
        id: id ?? username ?? email ?? 'unknown',
        username: username ?? email ?? 'User',
        email: email ?? '',
    }
}

const asRecord = (value: unknown): Record<string, unknown> | null => {
    if (!value || typeof value !== 'object') return null
    return value as Record<string, unknown>
}

export const extractAuthPayload = (data: unknown): AuthPayload => {
    const raw = asRecord(data)

    if (!raw) {
        return { token: null, user: null }
    }

    const containers = [
        raw,
        asRecord(raw.data),
        asRecord(raw.result),
        asRecord(raw.payload),
    ].filter((item): item is Record<string, unknown> => item !== null)

    let token: string | null = null
    let user: AuthUser | null = null

    for (const container of containers) {
        if (!token) {
            token = pickString(
                container.token,
                container.accessToken,
                container.jwt,
                container.access_token,
            ) ?? null
        }

        if (!user) {
            user =
                normalizeUser(container.user) ??
                normalizeUser(container.userData) ??
                normalizeUser(container.profile) ??
                normalizeUser(container)
        }

        if (token && user) break
    }

    return {
        token,
        user,
    }
}

export const signUp = (username: string, email: string, password: string) =>
    api.post('/auth/signUp', { username, email, password })

export const login = (username: string, password: string) =>
    api.post('/auth/login', { username, password })
