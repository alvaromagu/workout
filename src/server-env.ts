const { CRYPTER_SALTS } = process.env

interface Env {
  salts?: number | undefined | null
}

let salts
if (CRYPTER_SALTS != null) {
  const num = Number(CRYPTER_SALTS)
  if (Number.isNaN(num) || num < 1) {
    throw new Error('CRYPTER_SALTS must be a number greater than 0')
  }
  salts = num
}

export const env: Env = {
  salts
}
