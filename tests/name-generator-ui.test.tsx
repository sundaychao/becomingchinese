import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { NameGenerator } from '@/components/tools/name-generator'
import { generateChineseNames } from '@/lib/name-generator'

describe('NameGenerator', () => {
  const writeText = vi.fn<(text: string) => Promise<void>>()

  beforeEach(() => {
    writeText.mockReset()
    writeText.mockResolvedValue()
  })

  it('generates three names and copies a uniquely selected result', async () => {
    const user = userEvent.setup()
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    })
    const input = { englishName: 'Maya', style: 'gentle', trait: 'curious' } as const
    const [first] = generateChineseNames(input)

    render(<NameGenerator locale="en" />)

    await user.type(screen.getByLabelText(/English name/i), input.englishName)
    await user.selectOptions(screen.getByLabelText(/Name style/i), input.style)
    await user.selectOptions(screen.getByLabelText(/Defining trait/i), input.trait)
    await user.click(screen.getByRole('button', { name: /generate names/i }))

    expect(screen.getAllByTestId('name-result')).toHaveLength(3)

    await user.click(screen.getByRole('button', { name: `Copy ${first.hanzi}` }))

    expect(writeText).toHaveBeenCalledWith(`${first.hanzi} — ${first.pinyin}`)
    expect(screen.getByRole('status')).toHaveTextContent('Copied')
  })
})
