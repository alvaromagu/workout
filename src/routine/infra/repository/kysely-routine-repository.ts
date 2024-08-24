import { SourcePaginated } from "@/commons/domain/types/source-paginated";
import { Repository } from "@/commons/infra/db/kysely-pg/repository";
import { Routine } from "@/routine/domain/models/routine";
import { RoutineRepository } from "@/routine/domain/repository/routine-repository";

export class KyselyRoutineRepository extends Repository implements RoutineRepository {
  async save(routine: Routine): Promise<void> {
    this.db.insertInto('routine')
      .values(routine.toPrimitives())
      .execute()
  }

  async findById(id: string): Promise<Routine | null> {
    const routine = await this.db.selectFrom('routine')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst()
    return routine != null ? new Routine(routine.id, routine.name) : null
  }

  async delete(id: string): Promise<void> {
    this.db.deleteFrom('routine')
      .where('id', '=', id)
      .execute()
  }

  async paginated(offset: number, limit: number): Promise<SourcePaginated<Routine>> {
    const [routines, { total } = { total: 0 }] = await Promise.all([
      this.db.selectFrom('routine')
        .selectAll()
        .offset(offset)
        .limit(limit)
        .execute(),
      this.db
        .selectFrom('routine')
        .select(eb => eb.fn.count<number>('id').as('total'))
        .executeTakeFirst() ?? { total: 0 }
    ])

    return {
      results: routines.map(routine => new Routine(routine.id, routine.name)),
      total: total,
    }
  }
}