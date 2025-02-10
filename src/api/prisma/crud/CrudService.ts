import CrudRepository from "./CrudRepository";

export default class CrudService<
  T extends { id: string },
  //U, // extends keyof Prisma.PrismaDelegate
> {
  private repository: CrudRepository<T>;

  getRepo() {
    return this.repository;
  }

  constructor(repository: CrudRepository<T>, model?: string) {
    this.repository = repository;
  }

  async create(
    data: any //Omit<Omit<Omit<T, "id">, "createdAt">, "updatedAt">
  ) {
    return this.repository.create(data);
  }

  async createMany(
    data: Omit<Omit<Omit<T, "id">, "createdAt">, "updatedAt">[]
  ) {
    return this.repository.createMany(data);
  }

  async findById(id: string, include?: any, deletedAt?: any) {
    try {
      return this.repository.findById(id, include, deletedAt);
    } catch (e) {}
  }

  async findByUniqueProperty(property: keyof T, value: any, include?: any) {
    return this.repository.findByUniqueProperty(property, value, include);
  }

  async findByProperty(property: keyof T, value: any, include?: any) {
    return this.repository.findByProperty(property, value, include);
  }

  async findMany(
    filters: any = {},
    include: any = false,
    sort: any = {},
    page: number = 1,
    pageSize: number = 32
  ) {
    return this.repository.findMany(filters, include, sort, page, pageSize);
  }

  async findAll(select?: any) {
    return this.repository.findAll(select);
  }

  async count(where?: any) {
    return this.repository.count(where);
  }

  async update(
    idOrWhere: string | object,
    data: any /* Partial<Omit<T, "id"> >*/
  ) {
    return this.repository.update(idOrWhere, data);
  }

  async updateMany(where: Partial<T>, data: Partial<Omit<T, "id">>) {
    return this.repository.updateMany(where, data);
  }

  async deleteSafe(id: string) {
    return this.repository.deleteSafe(id);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }

  async deleteMany(where?: any) {
    return this.repository.deleteMany(where);
  }

  async groupBy(by: Array<keyof T>, having?: any, orderBy?: any) {
    return this.repository.groupBy(by, having, orderBy);
  }
}
