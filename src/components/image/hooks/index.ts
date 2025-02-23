import { useState } from "react";
import { FileWithPreview, UploadStatus } from "../types";
import { uploadImage } from "../actions";

export function useFileUpload() {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    uploading: false,
  });

  const handleFileChange = (event?: React.ChangeEvent<HTMLInputElement>) => {
    if (event?.target.value.length == 0 && selectedFiles.length > 0) {
      return;
    }
    if (event?.target.files) {
      const filesWithPreview = Array.from(event.target.files).map((file) => ({
        file: file,
        preview: URL.createObjectURL(file),
      }));

      setSelectedFiles(filesWithPreview);
    } else {
      setSelectedFiles([]);
    }
  };

  const uploadFiles = async (
    lectureId: string,
    type: "lecture" | "product"
  ) => {
    setUploadStatus({ uploading: true });

    try {
      // eslint-disable-next-line no-var
      var formdata = new FormData();
      selectedFiles.forEach((f) => {
        formdata.append("files", f.file);
      });

      const result = await uploadImage(formdata, lectureId, type);

      //var requestOptions = { method: "POST", body: formdata };

      return result;
      setUploadStatus({ uploading: false, success: true });
      setSelectedFiles([]);
      // Here you would typically send files to a server
    } catch (error: any) {
      return null;
      setUploadStatus({ uploading: false, error });
    }
  };

  return {
    selectedFiles,
    uploadStatus,
    handleFileChange,
    uploadFiles,
  };
}
