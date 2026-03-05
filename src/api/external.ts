import api from './axios'

export interface ExternalBook {
    key?: string
    title: string
    author_name?: string[]
    first_publish_year?: number
    cover_i?: number
}

export const searchExternalBooks = (query: string) =>
    api.get('/external/searchBooks', { params: { q: query } })
