"use server";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import prisma from "@/api/prisma/init";
import { createFile } from "@/api/files";

const pump = promisify(pipeline);
const FILE_ROOT_PATH = "./public/resources";

export const uploadImage = async (formData: any, lectureId: string) => {
  try {
    const subFolderPath = `egitimler/${lectureId}`;

    const targetDirectory = FILE_ROOT_PATH + "/" + subFolderPath; //path.join(FILE_ROOT_PATH, subFolderPath);
    // Ensure the directory exists
    fs.mkdirSync(targetDirectory, { recursive: true });

    const files = formData.getAll("files");
    const result = [];
    for (const file of files) {
      const filePath = await generateFilePath(targetDirectory, file);
      await pump(file.stream(), fs.createWriteStream(filePath));

      const item = await createFile({
        filename: file.name,
        size: file.size,
        mimetype: file.type,
        path: filePath.replace("public", ""),
        lectureId,
      });

      result.push(item);
    }
    if (result.length > 0) {
      return result;
    } else {
      return null;
    }

    // You might return some response or data here
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
