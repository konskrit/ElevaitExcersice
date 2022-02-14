import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { map } from 'rxjs';
import { DocumentService } from './document.service';
import { IDocument } from './interfaces/document.interface';
import { Documents } from './models/document.schema';
import { Request } from "express";
import { DocumentDto } from './dto/document.dto';

@Controller('documents')
export class DocumentController {
    
    constructor(private readonly documentService: DocumentService) {}

    @Get()
    async getAllDocuments(@Req() req: Request) {
        return this.documentService.findAll(req);
    }

    @Get(':id')
    async getDocument(@Param('id') id: string) {
        return this.documentService.findOne(id);
    }

    @Post()
    async createDocument(@Body() document: DocumentDto) {
        return this.documentService.create(document);
    }

    @Put(':id')
    async updateDocument(@Param('id') id: string, @Body() document: DocumentDto) {
        return this.documentService.update(id, document);
    }

    @Delete(':id')
    async deleteDocument(@Param('id') id: string) {
        return this.documentService.delete(id);
    }
}
