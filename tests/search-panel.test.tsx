import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { SearchPanel } from '@/components/search/search-panel'
import { buildSearchIndex } from '@/lib/search'

describe('SearchPanel', () => {
  it('filters articles and shows a recovery state', async () => {
    const user = userEvent.setup()
    const index = buildSearchIndex('en')

    render(<SearchPanel locale="en" index={index} />)

    await user.type(
      screen.getByRole('searchbox', { name: 'Search Becoming Chinese' }),
      'tea',
    )
    expect(screen.getByText('Why tea is never just a drink')).toBeInTheDocument()

    await user.clear(
      screen.getByRole('searchbox', { name: 'Search Becoming Chinese' }),
    )
    await user.type(
      screen.getByRole('searchbox', { name: 'Search Becoming Chinese' }),
      'not-a-real-topic',
    )
    expect(screen.getByText('No stories found')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Explore all topics' })).toHaveAttribute(
      'href',
      '/en/articles',
    )
  })
})
