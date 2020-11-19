import { hash as createHash, compare } from 'bcrypt'

export const hash = (raw: string) => {
  return createHash(raw, 4)
}

export const verify = (payload: string, key: string) => {
  return compare(payload, key)
}
