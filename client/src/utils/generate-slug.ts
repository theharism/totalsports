import { customAlphabet } from 'nanoid'

const nanoid = customAlphabet('1234567890', 6)
const generateSlug = (name: string, appendNumbers?: boolean) => {
  const cleanedName = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
  return appendNumbers ? `${cleanedName}-${nanoid()}` : cleanedName
}

export default generateSlug