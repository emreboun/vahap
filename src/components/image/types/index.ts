export interface FileWithPreview {
  preview?: string;
  file: File;
}

export interface UploadStatus {
  uploading: boolean;
  success?: boolean;
  error?: Error | null;
}
