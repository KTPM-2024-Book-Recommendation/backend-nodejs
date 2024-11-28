export class UploadFileCommand {
  constructor(public readonly file: Express.Multer.File) {}
}
