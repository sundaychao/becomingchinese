import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { MobileMenu } from '@/components/layout/mobile-menu'

vi.mock('next/link', () => ({
  default: ({ children, href, onClick }: { children: ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={(event) => { event.preventDefault(); onClick?.() }}>
      {children}
    </a>
  ),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/en',
  useRouter: () => ({ push: vi.fn() }),
}))

describe('MobileMenu', () => {
  it('opens accessibly and closes after following a navigation link', async () => {
    const user = userEvent.setup()

    render(<MobileMenu locale="en" />)

    const trigger = screen.getByRole('button', { name: 'Open navigation menu' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()

    await user.click(trigger)

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '中文' })).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'Lifestyle' }))

    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument()
  })
})
