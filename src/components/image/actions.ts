"use server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import prisma from "@/api/prisma/init";
import { createFile } from "@/api/files";
import { fileConfig } from "@/config/file";

const pump = promisify(pipeline);

export const uploadImage = async (
  formData: any,
  entityId: string,
  type: "lecture" | "product"
) => {
  try {
    const subFolderPath =
      type === "lecture" ? `/egitimler/${entityId}` : `/urunler/${entityId}`;
    const targetDirectory = path.join(fileConfig.path, subFolderPath);

    // Ensure the directory exists
    fs.mkdirSync(targetDirectory, { recursive: true });

    const files = formData.getAll("files");
    const result = [];

    for (const file of files) {
      const filePath = await generateFilePath(targetDirectory, file);
      await pump(file.stream(), fs.createWriteStream(filePath));

      const temp = {
        filename: file.name,
        size: file.size,
        mimetype: file.type,
        path: filePath.replace("public", ""),
        lectureId: type === "lecture" ? entityId : undefined,
        productId: type === "product" ? entityId : undefined,
      };

      console.log(temp);

      const item = await createFile(temp);

      result.push(item);
    }

    return result.length > 0 ? result : null;
  } catch (error) {
    console.error("Failed to upload images:", error);
    throw new Error("Failed to upload images");
  } finally {
    await prisma.$disconnect();
  }
};

const generateFilePath = async (directory: string, file: any) => {
  const extension = path.extname(file.name);
  const baseName = "image";
  let counter = 1;

  while (
    fs.existsSync(path.join(directory, `${baseName}-${counter}${extension}`))
  ) {
    counter++;
  }

  return path.join(directory, `${baseName}-${counter}${extension}`);
};
