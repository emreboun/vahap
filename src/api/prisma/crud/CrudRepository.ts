import { Prisma, PrismaClient } from "@prisma/client";
//import { prisma } from "./init";

export default class CrudRepository<
  T, //extends { id: string },
  //U, //extends keyof Prisma.PrismaDelegate
> {
  private prisma: any; // PrismaClient;
  private model: any;
  private fields: any;
  private relations: string[];
  private uniques: string[];

  //private modelConfig:

  constructor(prisma: PrismaClient, model: string) {
    this.prisma = prisma;
    this.model = model;
    this.fields =
      this.prisma._runtimeDataModel.models[
        model[0].toUpperCase() + model.slice(1)
      ].fields;
    this.relations = this.prisma._runtimeDataModel.models[
      model[0].toUpperCase() + model.slice(1)
    ].fields
      .filter((f: any) => !!f.relationName)
      .map((f: any) => f.name);
    this.uniques = this.prisma._runtimeDataModel.models[
      model[0].toUpperCase() + model.slice(1)
    ].fields
      .filter((f: any) => f.isUnique)
      .map((f: any) => f.name);
  }

  getRelations() {
    return this.relations;
  }

  getFields() {
    return this.fields;
  }

  getUniques() {
    return this.uniques;
  }

  // operations

  async create(
    data: Omit<Omit<Omit<T, "id">, "createdAt">, "updatedAt">
  ): Promise<T> {
    this.getCreates(data);
    return await this.prisma[this.model].create({
      data,
      include: this.getIncludes(),
    });
  }

  async createMany(
    data: Omit<Omit<Omit<T, "id">, "createdAt">, "updatedAt">[]
  ): Promise<Prisma.BatchPayload> {
    return this.prisma[this.model].createMany({
      data,
    });
  }

  async findById(
    id: string,
    include: any = false
    //deletedAt: any = null
  ): Promise<T | null> {
    return this.prisma[this.model].findUnique({
      where: {
        id /* , deletedAt: deletedAt === null ? deletedAt : undefined */,
      },
      include: !!include
        ? include === true
          ? this.getIncludes()
          : include
        : undefined,
    });
  }

  async findByUniqueProperty(
    property: keyof T,
    value: any,
    include?: any
  ): Promise<T | null> {
    if (!this.uniques.includes(property as string)) {
      return null;
    }

    return this.prisma[this.model].findUnique({
      where: {
        [property]: value,
      },
      include: !!include
        ? include === true
          ? this.getIncludes()
          : include
        : undefined,
    });
  }

  // temp
  async getListBySlugPrefix(slugPrefix: string) {
    return await this.prisma[this.model].findMany({
      where: {
        slug: {
          startsWith: slugPrefix,
          mode: "insensitive", // Case-insensitive search
        },
      },
    });
  }

  async findByProperty(
    property: keyof T,
    value: any,
    include?: any
  ): Promise<T[]> {
    if (!this.fields.some((f: any) => f.name === property)) {
      return [];
    }

    return await this.prisma[this.model].findMany({
      where: {
        [property]: value,
      },
      include: !!include
        ? include === true
          ? this.getIncludes()
          : include
        : undefined,
    });
  }

  async groupBy(
    by: Array<keyof T>,
    having?: any,
    orderBy?: any
  ): Promise<any[]> {
    return this.prisma[this.model].groupBy({
      by,
      having,
      orderBy,
    });
  }

  async findMany(
    filters: any = {},
    include: any = false,
    orderBy: any = { id: "asc" },
    page: number = 1,
    pageSize: number = 32
  ): Promise<T[]> {
    const skip = (page - 1) * pageSize;
    return this.prisma[this.model].findMany({
      where: filters,
      include: !!include
        ? include === true
          ? this.getIncludes()
          : include
        : undefined,
      orderBy, //{ id: sort },
      skip,
      take: pageSize,
    });
  }

  async findAll(where?: any, include?: any, orderBy?: any): Promise<T[]> {
    //const skip = (page - 1) * pageSize;

    return this.prisma[this.model].findMany({
      where,
      include: !!include
        ? include === true
          ? this.getIncludes()
          : include
        : undefined,
      orderBy,
    });
  }

  async update(
    idOrWhere: string | object,
    data: Partial<Omit<T, "id">>,
    process: boolean = true
    //prop?: keyof T
  ): Promise<T> {
    if (process) {
      this.getUpdates(data); // Apply transformations for nested relations
    }
    return this.prisma[this.model].update({
      where: typeof idOrWhere === "string" ? { id: idOrWhere } : idOrWhere,
      //where: prop ? { [prop]: id } : { id },
      data,
      include: this.getIncludes(),
    });
  }

  async count(filters: any = {}): Promise<number> {
    return this.prisma[this.model].count({
      where: filters,
    });
  }

  async updateMany(
    where: Partial<T>,
    data: Partial<Omit<T, "id">>
  ): Promise<Prisma.BatchPayload> {
    return this.prisma[this.model].updateMany({
      where,
      data,
    });
  }

  async deleteSafe(id: string): Promise<T> {
    const check = await this.prisma[this.model].findFirst({
      where: { AND: { id: id, NOT: { deletedAt: null } } },
    });
    if (check) {
      return check;
    }

    return this.prisma[this.model].update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async delete(idOrWhere: string | object): Promise<T> {
    return this.prisma[this.model].delete({
      where:
        typeof idOrWhere === "string" ? { id: idOrWhere } : { ...idOrWhere },
    });
  }

  async deleteMany(where?: any): Promise<Prisma.BatchPayload> {
    return this.prisma[this.model].deleteMany({ where });
  }

  private getIncludes() {
    const relationFields = this.relations.reduce(
      (acc: any, relation: string) => {
        acc[relation] = true;
        return acc;
      },
      {}
    );

    return relationFields;
  }

  private getCreates(data: any) {
    this.relations.forEach((rel: any) => {
      if (data[rel]) {
        const temp = data[rel];
        data[rel] = { create: temp };
      }
    });
  }

  private getUpdates(data: any) {
    this.relations.forEach((rel: any) => {
      if (data[rel]) {
        const temp = data[rel];
        // Determine if it's an array or single object for update
        if (Array.isArray(temp)) {
          data[rel] = {
            upsert: temp.map((item: any) => ({
              where: { id: item.id }, // Assuming the `id` field is used as the unique identifier
              update: item,
              create: item,
            })),
          };
        } else {
          data[rel] = {
            upsert: {
              where: { id: temp.id }, // Assuming the `id` field is used as the unique identifier
              update: temp,
              create: temp,
            },
          };
        }
      }
    });
  }

  private getCreatesMany(data: any[]) {
    data.forEach((e: any) => {
      this.relations.forEach((rel: any) => {
        if (e[rel]) {
          const temp = e[rel];
          e[rel] = { create: temp };
        }
      });
    });
  }

  private processUpdateRelation(
    processedData: any,
    relationName: string,
    relationValue: any
  ) {
    if (Array.isArray(relationValue)) {
      // Handle multiple relations (lists)
      processedData[relationName] = {
        create: relationValue.filter((item) => !item.id).map((item) => item),
        connect: relationValue
          .filter((item) => item.id)
          .map((item) => ({ id: item.id })),
      };
    } else if (typeof relationValue === "object") {
      if (relationValue.connect) {
        // Explicit connect
        processedData[relationName] = {
          connect: { id: relationValue.connect },
        };
      } else if (relationValue.disconnect) {
        // Explicit disconnect
        processedData[relationName] = { disconnect: true };
      } else if (relationValue.id) {
        // Simple connect by ID
        processedData[relationName] = { connect: { id: relationValue.id } };
      } else {
        // Nested update or create
        processedData[relationName] = { create: relationValue };
      }
    }
  }

  protected processUniqueFields(data: any): any {
    const processedData = { ...data };

    this.uniques.forEach((uniqueField) => {
      if (processedData[uniqueField]) {
        // Ensure unique fields use 'update' or 'create' with a connect strategy
        if (data.id) {
          processedData[uniqueField] = {
            connect: { id: processedData[uniqueField] },
          };
        }
      }
    });

    return processedData;
  }
}
