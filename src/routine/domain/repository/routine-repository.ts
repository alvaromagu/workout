import { type SourcePaginated } from '@/commons/domain/types/source-paginated'
import { type Routine } from '../models/routine'

export interface RoutineRepository {
  save: (routine: Routine) => Promise<void>
  update: (routine: Routine) => Promise<void>
  get: (id: string) => Promise<Routine | null>
  delete: (id: string) => Promise<void>
  paginated: (params: {
    offset: number
    limit: number
    userId: string
  }) => Promise<SourcePaginated<Routine>>
}
