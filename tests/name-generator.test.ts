import { describe, expect, it } from 'vitest'

import { generateChineseNames, validateNameInput } from '@/lib/name-generator'

describe('Chinese name generator', () => {
  it('returns three stable names with hanzi, pinyin, meaning, and rationale', () => {
    const input = { englishName: 'Maya', style: 'gentle', trait: 'curious' } as const
    const first = generateChineseNames(input)

    expect(first).toHaveLength(3)
    expect(first).toEqual(generateChineseNames(input))
    expect(
      first.every(
        (name) =>
          name.hanzi &&
          name.pinyin &&
          name.meaning.en &&
          name.meaning.zh &&
          name.rationale.en &&
          name.rationale.zh,
      ),
    ).toBe(true)
    expect(new Set(first.map((name) => name.hanzi))).toHaveLength(3)
  })

  it('rejects empty and overlong names', () => {
    expect(
      validateNameInput({ englishName: '', style: 'classic', trait: 'calm' }),
    ).toHaveProperty('englishName')
    expect(
      validateNameInput({ englishName: 'a'.repeat(51), style: 'classic', trait: 'calm' }),
    ).toHaveProperty('englishName')
  })

  it('accepts a trimmed name with supported punctuation and rejects other characters', () => {
    expect(
      validateNameInput({ englishName: "  Mary-Jane O'Neil  ", style: 'modern', trait: 'creative' }),
    ).toEqual({})
    expect(
      validateNameInput({ englishName: 'Mary  Jane', style: 'modern', trait: 'creative' }),
    ).toEqual({})
    expect(
      validateNameInput({ englishName: 'Maya123', style: 'modern', trait: 'creative' }),
    ).toHaveProperty('englishName')
  })
})
