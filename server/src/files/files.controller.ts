import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
  import { Express } from 'express';
import { ApiFile } from './apifile.decorator';
  import { FilesService } from './files.service';
import { SampleDto } from './sample.dto';
  
  @Controller()
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
    
    @UseInterceptors(FileInterceptor('file'))
    @Post('file')
    @ApiConsumes('multipart/form-data')
    @ApiFile()
    uploadFile(
        @Body() body: SampleDto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      console.log("EH");
       return this.filesService.uploadFile(file);
    }
  }