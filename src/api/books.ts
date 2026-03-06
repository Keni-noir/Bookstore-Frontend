import api from './axios'

export interface Book {
    _id: string
    title: string
    author: string
    publishedDate: string
    description: string
    price: number
    coverImage?: string
    createdAt?: string
}

export interface BookPayload {
    title: string
    author: string
    publishedDate: string
    description: string
    price: number
    
}

export const getBooks = () => api.get<{status:string, data: Book[]}>('/books/getBooksByUser')
export const getBookById = (id: string) => api.get<Book>(`/books/${id}`)
export const createBook = (data: BookPayload) => api.post<Book>('/books/createBook', data)
export const updateBook = (id: string, data: Partial<BookPayload>) => api.put<Book>(`/books/updateBook/:${id}`, data)
export const deleteBook = (id: string) => api.delete(`/books/deleteBook/:${id}`)
