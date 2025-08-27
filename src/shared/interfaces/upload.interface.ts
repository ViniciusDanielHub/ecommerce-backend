export interface UploadResult {
  url: string;
  publicId?: string;
  originalName: string;
  size: number;
  mimetype: string;
}

export interface IUploadService {
  uploadSingle(file: Express.Multer.File): Promise<UploadResult>;
  uploadMultiple(files: Express.Multer.File[]): Promise<UploadResult[]>;
  delete(publicId: string): Promise<void>;
  getUrl(publicId: string): string;
}