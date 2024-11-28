import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export type UploadFileResponse = Pick<UploadApiResponse, 'original_filename' | 'url' | 'secure_url'> | UploadApiErrorResponse;