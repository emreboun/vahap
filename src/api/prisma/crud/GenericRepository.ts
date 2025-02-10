import { PrismaClient } from "@prisma/client";

type RelationConfig = {
  name: string;
  type: "create" | "connect" | "disconnect" | "update" | "delete";
};

export abstract class GenericRepository<T> {
  protected prisma: any; // PrismaClient;
  protected model: string;
  protected relations: string[];
  protected uniqueFields: string[];

  constructor(prisma: PrismaClient, model: string) {
    this.prisma = prisma;
    this.model = model;

    this.relations = this.extractRelations();
    this.uniqueFields = this.extractUniqueFields();
  }

  private extractRelations(): string[] {
    return this.prisma._runtimeDataModel.models[
      this.model[0].toUpperCase() + this.model.slice(1)
    ].fields
      .filter((f: any) => !!f.relationName)
      .map((f: any) => f.name);
  }

  private extractUniqueFields(): string[] {
    return this.prisma._runtimeDataModel.models[
      this.model[0].toUpperCase() + this.model.slice(1)
    ].fields
      .filter((f: any) => f.isUnique)
      .map((f: any) => f.name);
  }

  protected processRelations(
    data: any,
    mode: "create" | "update" = "create"
  ): any {
    const processedData = { ...data };

    this.relations.forEach((relationName) => {
      if (processedData[relationName]) {
        const relationValue = processedData[relationName];
        delete processedData[relationName];

        if (mode === "create") {
          processedData[relationName] = { create: relationValue };
        } else if (mode === "update") {
          this.processUpdateRelation(
            processedData,
            relationName,
            relationValue
          );
        }
      }
    });

    return processedData;
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

    this.uniqueFields.forEach((uniqueField) => {
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

  async create(
    data: Omit<Omit<Omit<T, "id">, "createdAt">, "updatedAt">
  ): Promise<T> {
    const processedData = this.processRelations(
      this.processUniqueFields(data),
      "create"
    );

    return this.prisma[this.model].create({
      data: processedData,
      include: this.getIncludes(),
    });
  }

  async update(
    id: string,
    data: Partial<Omit<Omit<T, "id">, "updatedAt">>
  ): Promise<T> {
    const processedData = this.processRelations(
      this.processUniqueFields(data),
      "update"
    );

    return this.prisma[this.model].update({
      where: { id },
      data: processedData,
      include: this.getIncludes(),
    });
  }

  // Optional method to be overridden for specific include configurations
  protected getIncludes(): object {
    return {};
  }
}
