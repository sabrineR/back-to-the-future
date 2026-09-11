import { axiosInstance, handleAxiosError } from "../config/httpCommon";

interface PresignedUrlResponse {
  uploadUrl: string;
  imageUrl: string;
}

export const uploadFileToS3 = async (file: File): Promise<string> => {
  try {
    // 1. Request a temporary presigned URL from the API
    const response = await axiosInstance.post<PresignedUrlResponse>(
      "/uploads/presigned-url",
      {
        fileName: file.name,
        contentType: file.type,
      },
    );

    const { uploadUrl, imageUrl } = response.data;

    // 2. Upload the file directly from the browser to S3
    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload image to S3");
    }

    // 3. Return the image URL that will be stored in the database
    return imageUrl;
  } catch (error) {
    return handleAxiosError(error);
  }
};
