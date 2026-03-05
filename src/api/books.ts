import api from './axios'

export interface Book {
    _id: string
    title: string
    author: string
    description: string
    price: number
    genre?: string
    coverImage?: string
    createdAt?: string
}

export interface BookPayload {
    title: string
    author: string
    description: string
    price: number
    genre?: string
    coverImage?: string
}

export const getBooks = () => api.get<{status:string, data: Book[]}>('/books/getBooksByUser')
export const getBookById = (id: string) => api.get<Book>(`/api/books/${id}`)
export const createBook = (data: BookPayload) => api.post<Book>('/api/books', data)
export const updateBook = (id: string, data: Partial<BookPayload>) => api.put<Book>(`/api/books/${id}`, data)
export const deleteBook = (id: string) => api.delete(`/api/books/${id}`)
