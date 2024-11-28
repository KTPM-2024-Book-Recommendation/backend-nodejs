// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadFileResponse } from '../application/uploadFile/uploadFile.response';
const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<UploadFileResponse> {
    return new Promise<UploadFileResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {filename_override:file.originalname},
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
