import CrudRepository from "./CrudRepository";

export default class CrudService<
  T, // extends { id: string },
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
    //console.log(data);
    return this.getRepo().create(data);
  }

  async createMany(
    data: Omit<Omit<Omit<T, "id">, "createdAt">, "updatedAt">[]
  ) {
    return this.repository.createMany(data);
  }

  async findById(id: string, include?: any /* , deletedAt?: any */) {
    try {
      return this.repository.findById(id, include /* , deletedAt */);
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

  async findAll(select?: any, include?: any, orderBy?: any) {
    return this.repository.findAll(select, include, orderBy);
  }

  async count(where?: any) {
    return this.repository.count(where);
  }

  async update(
    idOrWhere: string | object,
    data: any /* Partial<Omit<T, "id"> >*/,
    process: boolean = true
  ) {
    return this.repository.update(idOrWhere, data, process);
  }

  async updateMany(where: Partial<T>, data: Partial<Omit<T, "id">>) {
    return this.repository.updateMany(where, data);
  }

  async deleteSafe(id: string) {
    return this.repository.deleteSafe(id);
  }

  async delete(idOrWhere: string | object) {
    return this.repository.delete(idOrWhere);
  }

  async deleteMany(where?: any) {
    return this.repository.deleteMany(where);
  }

  async groupBy(by: Array<keyof T>, having?: any, orderBy?: any) {
    return this.repository.groupBy(by, having, orderBy);
  }
}
