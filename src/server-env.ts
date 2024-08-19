const { CRYPTER_SALTS, DATABASE_SSL } = process.env

interface Env {
  salts?: number | undefined | null
  dbSsl: boolean
}

let salts: number | undefined | null
if (CRYPTER_SALTS != null) {
  const num = Number(CRYPTER_SALTS)
  if (Number.isNaN(num) || num < 1) {
    throw new Error('CRYPTER_SALTS must be a number greater than 0')
  }
  salts = num
}

let dbSsl = false
if (DATABASE_SSL != null) {
  dbSsl = DATABASE_SSL === 'true'
}

export const env: Env = {
  salts,
  dbSsl
}
