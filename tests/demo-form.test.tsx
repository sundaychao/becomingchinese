import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { DemoForm } from '@/components/forms/demo-form'

describe('DemoForm', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows a field-level error for an invalid email address', async () => {
    const user = userEvent.setup()

    render(<DemoForm variant="newsletter" locale="en" />)

    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'not-an-email')
    await user.click(screen.getByRole('button', { name: 'Preview subscription' }))

    expect(screen.getByText('Enter a valid email address.')).toHaveAttribute(
      'id',
      'newsletter-email-error',
    )
    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveAttribute(
      'aria-describedby',
      'newsletter-email-error',
    )
  })

  it('submits locally, clears sensitive values and never calls fetch', async () => {
    const user = userEvent.setup()
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    render(<DemoForm variant="contact" locale="en" />)

    await user.type(screen.getByRole('textbox', { name: 'Name' }), 'Lin')
    await user.type(screen.getByRole('textbox', { name: 'Email address' }), 'lin@example.com')
    await user.type(screen.getByRole('textbox', { name: 'Message' }), 'A private message')
    await user.click(screen.getByRole('button', { name: 'Preview message' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      'Demo submitted — no data was sent.',
    )
    expect(fetchSpy).not.toHaveBeenCalled()
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('')
    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveValue('')
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveValue('')
  })
})
