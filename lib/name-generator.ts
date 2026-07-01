export const NAME_STYLES = ['classic', 'gentle', 'modern', 'bold'] as const
export const NAME_TRAITS = ['calm', 'curious', 'creative', 'brave'] as const

export type NameStyle = (typeof NAME_STYLES)[number]
export type NameTrait = (typeof NAME_TRAITS)[number]

export type NamePreferences = {
  englishName: string
  style: NameStyle
  trait: NameTrait
}

type LocalizedText = {
  en: string
  zh: string
}

export type GeneratedName = {
  hanzi: string
  pinyin: string
  meaning: LocalizedText
  rationale: LocalizedText
}

export type NameInputErrors = Partial<Record<keyof NamePreferences, string>>

type NameCharacter = {
  hanzi: string
  pinyin: string
  meaning: LocalizedText
  styles: readonly NameStyle[]
  traits: readonly NameTrait[]
}

const SURNAMES = [
  { hanzi: '林', pinyin: 'Lín', meaning: { en: 'forest', zh: '森林' } },
  { hanzi: '苏', pinyin: 'Sū', meaning: { en: 'revive', zh: '复苏' } },
  { hanzi: '陈', pinyin: 'Chén', meaning: { en: 'steadfast', zh: '沉稳' } },
  { hanzi: '江', pinyin: 'Jiāng', meaning: { en: 'river', zh: '江河' } },
  { hanzi: '叶', pinyin: 'Yè', meaning: { en: 'leaf', zh: '树叶' } },
  { hanzi: '沈', pinyin: 'Shěn', meaning: { en: 'deep', zh: '深远' } },
] as const

const GIVEN_CHARACTERS: readonly NameCharacter[] = [
  { hanzi: '雅', pinyin: 'Yǎ', meaning: { en: 'elegant', zh: '雅致' }, styles: ['classic', 'gentle'], traits: ['calm', 'creative'] },
  { hanzi: '宁', pinyin: 'Níng', meaning: { en: 'peaceful', zh: '安宁' }, styles: ['classic', 'gentle'], traits: ['calm'] },
  { hanzi: '思', pinyin: 'Sī', meaning: { en: 'thoughtful', zh: '善思' }, styles: ['classic', 'modern'], traits: ['curious', 'creative'] },
  { hanzi: '文', pinyin: 'Wén', meaning: { en: 'cultured', zh: '文雅' }, styles: ['classic'], traits: ['curious', 'creative'] },
  { hanzi: '柔', pinyin: 'Róu', meaning: { en: 'gentle', zh: '温柔' }, styles: ['gentle'], traits: ['calm'] },
  { hanzi: '悦', pinyin: 'Yuè', meaning: { en: 'joyful', zh: '喜悦' }, styles: ['gentle', 'modern'], traits: ['creative'] },
  { hanzi: '澄', pinyin: 'Chéng', meaning: { en: 'clear-minded', zh: '澄明' }, styles: ['gentle', 'modern'], traits: ['calm', 'curious'] },
  { hanzi: '知', pinyin: 'Zhī', meaning: { en: 'knowledge', zh: '求知' }, styles: ['modern'], traits: ['curious'] },
  { hanzi: '新', pinyin: 'Xīn', meaning: { en: 'new', zh: '崭新' }, styles: ['modern'], traits: ['curious', 'creative'] },
  { hanzi: '灵', pinyin: 'Líng', meaning: { en: 'inspired', zh: '灵动' }, styles: ['gentle', 'modern'], traits: ['curious', 'creative'] },
  { hanzi: '勇', pinyin: 'Yǒng', meaning: { en: 'courageous', zh: '勇敢' }, styles: ['bold'], traits: ['brave'] },
  { hanzi: '毅', pinyin: 'Yì', meaning: { en: 'resolute', zh: '坚毅' }, styles: ['classic', 'bold'], traits: ['brave', 'calm'] },
  { hanzi: '卓', pinyin: 'Zhuó', meaning: { en: 'outstanding', zh: '卓越' }, styles: ['modern', 'bold'], traits: ['brave', 'creative'] },
  { hanzi: '远', pinyin: 'Yuǎn', meaning: { en: 'far-seeing', zh: '远见' }, styles: ['classic', 'bold'], traits: ['curious', 'brave'] },
  { hanzi: '辰', pinyin: 'Chén', meaning: { en: 'morning star', zh: '星辰' }, styles: ['modern', 'bold'], traits: ['curious', 'brave'] },
  { hanzi: '安', pinyin: 'Ān', meaning: { en: 'safe and calm', zh: '平安' }, styles: ['classic', 'gentle'], traits: ['calm', 'brave'] },
] as const

const SUPPORTED_NAME = /^[A-Za-z '\-]+$/

function hashString(value: string): number {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function validateNameInput(input: NamePreferences): NameInputErrors {
  const errors: NameInputErrors = {}
  const englishName = input.englishName.trim()

  if (englishName.length === 0) {
    errors.englishName = 'Please enter your English name.'
  } else if (englishName.length > 50) {
    errors.englishName = 'Use 50 characters or fewer.'
  } else if (!SUPPORTED_NAME.test(englishName)) {
    errors.englishName = 'Use letters, spaces, apostrophes, or hyphens only.'
  }

  if (!NAME_STYLES.includes(input.style)) errors.style = 'Choose a name style.'
  if (!NAME_TRAITS.includes(input.trait)) errors.trait = 'Choose a defining trait.'

  return errors
}

export function generateChineseNames(input: NamePreferences): GeneratedName[] {
  const errors = validateNameInput(input)
  if (Object.keys(errors).length > 0) return []

  const normalizedName = input.englishName.trim().toLocaleLowerCase('en')
  const seed = hashString(`${normalizedName}|${input.style}|${input.trait}`)
  const preferredCharacters = GIVEN_CHARACTERS.filter(
    (character) =>
      character.styles.includes(input.style) || character.traits.includes(input.trait),
  )

  return Array.from({ length: 3 }, (_, candidateIndex) => {
    const surname = SURNAMES[(seed + candidateIndex * 5) % SURNAMES.length]
    const first = preferredCharacters[(seed + candidateIndex * 3) % preferredCharacters.length]
    let second = preferredCharacters[(seed * 7 + candidateIndex * 5 + 1) % preferredCharacters.length]
    if (second.hanzi === first.hanzi) {
      second = preferredCharacters[(preferredCharacters.indexOf(second) + 1) % preferredCharacters.length]
    }

    return {
      hanzi: `${surname.hanzi}${first.hanzi}${second.hanzi}`,
      pinyin: `${surname.pinyin} ${first.pinyin}${second.pinyin}`,
      meaning: {
        en: `${surname.meaning.en}, ${first.meaning.en}, and ${second.meaning.en}`,
        zh: `${surname.meaning.zh}、${first.meaning.zh}与${second.meaning.zh}`,
      },
      rationale: {
        en: `A ${input.style} name for ${input.englishName.trim()}, shaped by ${input.trait} qualities.`,
        zh: `为 ${input.englishName.trim()} 取的${styleLabel(input.style)}名字，呼应${traitLabel(input.trait)}的特质。`,
      },
    }
  })
}

function styleLabel(style: NameStyle): string {
  return { classic: '古典', gentle: '温柔', modern: '现代', bold: '大气' }[style]
}

function traitLabel(trait: NameTrait): string {
  return { calm: '沉静', curious: '好奇', creative: '创造力', brave: '勇敢' }[trait]
}
