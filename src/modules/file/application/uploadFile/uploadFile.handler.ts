import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadFileCommand } from './uploadFile.command';
import { CloudinaryService } from '../../services';
import * as _ from 'lodash';

@CommandHandler(UploadFileCommand)
export class UploadFileHandler implements ICommandHandler<UploadFileCommand> {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  public async execute({file}: UploadFileCommand) {
    const uploadedFile = await this.cloudinaryService.uploadFile(file);  
    return _.pick(uploadedFile, 'url', 'secure_url', 'original_filename')  
  }
}
