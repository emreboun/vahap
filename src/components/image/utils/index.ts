import { FileWithPreview } from "../types";

const MB = 1024 * 1024;
export const IMAGE_SIZE_LIMIT = 2 * MB;
export const IMAGE_SIZE_LIMIT_POST = 10 * MB;

export const validMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
];

export const isValidMimeType = (mimeType: string) => {
  return validMimeTypes.includes(mimeType);
};

export const isValidImageTypes = (data: FileWithPreview[]) => {
  return !data.some((image) => !isValidMimeType(image.file.type));
};

export const isValidImages = (data: FileWithPreview[]) => {
  let total = 0;
  data.forEach((item) => {
    if (item.file.size > IMAGE_SIZE_LIMIT) {
      return 0;
    }
    total += item.file.size;
  });
  return total < IMAGE_SIZE_LIMIT_POST ? 1 : -1;
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Regular expression to match a broad pattern of international phone numbers
  const phoneRegex = /^\+?[\d \-()]{10,20}$/;
  return phoneRegex.test(phoneNumber);
};
