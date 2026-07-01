import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomePage } from '@/components/home/home-page'
import { articles } from '@/content/articles'
import { categories } from '@/content/categories'

describe('HomePage', () => {
  it('starts with the category section instead of the hero', () => {
    render(
      <HomePage
        locale="en"
        categories={categories}
        articles={articles}
      />,
    )

    expect(screen.queryByRole('heading', {
      level: 1,
      name: 'Your practical guide to everyday China.',
    })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'Start with what matters to you.',
    })).toBeInTheDocument()
  })
})
