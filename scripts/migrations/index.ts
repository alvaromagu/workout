import { up, down } from '../migrations/002_credentials_provider'
import { db } from '@/commons/infra/db/kysely-pg/db'

const args = process.argv.slice(2)

console.log(args)


if (args.includes('--up')) {
  // Run the up migration
  up(db)
    .then(() => {
      console.log('Migration complete')
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

if (args.includes('--down')) {
  // Run the down migration
  down(db)
    .then(() => {
      console.log('Migration complete')
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
