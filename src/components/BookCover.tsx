'use client'

import { useState } from 'react'

const OPEN_LIBRARY_COVERS_URL = 'https://covers.openlibrary.org/b/isbn'

type BookCoverProps = {
  isbn?: string | number | null
  title: string
  author?: string
  yearPublished?: number | null
}

const TextOnlyCover = ({ title, author, yearPublished }: BookCoverProps) => (
  <div className="c-book-list__cover is-text-only">
    <h3>{title}</h3>
    <p>{author}</p>
    <p>{yearPublished}</p>
  </div>
)

const BookCover = ({ isbn, title, author, yearPublished }: BookCoverProps) => {
  const [hasCoverError, setHasCoverError] = useState(false)
  const normalizedIsbn = isbn != null ? String(isbn).trim() : ''

  if (!normalizedIsbn || hasCoverError) {
    return (
      <TextOnlyCover
        title={title}
        author={author}
        yearPublished={yearPublished}
      />
    )
  }

  const label = `${title} - ${author}`

  const handleImageError = () => {
    setHasCoverError(true)
  }

  return (
    <figure className="c-book-list__cover">
      <img
        src={`${OPEN_LIBRARY_COVERS_URL}/${normalizedIsbn}-L.jpg`}
        loading="lazy"
        alt={label}
        title={label}
        onError={handleImageError}
      />
    </figure>
  )
}

export default BookCover
