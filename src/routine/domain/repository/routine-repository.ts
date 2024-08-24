import { SourcePaginated } from "@/commons/domain/types/source-paginated"
import { Routine } from "../models/routine"

export interface RoutineRepository {
  save(routine: Routine): Promise<void>
  findById(id: string): Promise<Routine | null>
  delete(id: string): Promise<void>
  paginated(offset: number, limit: number): Promise<SourcePaginated<Routine>>
}
