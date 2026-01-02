import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import type { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import { UploadsService } from './providers/uploads.service';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Auth(AuthType.None)
@Controller('uploads')
export class UploadsController {
  constructor(
    /**
     * inject uploadsService
     */
    private readonly uploadsService: UploadsService,
  ) {}

  // File is the field name
  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer Token' },
  ])
  @ApiOperation({
    summary: `Upload a new image to the server`,
  })
  @Post('file')
  public uploadFile(@UploadedFile() file: Multer.File) {
    return this.uploadsService.uploadFile(file);
  }
}