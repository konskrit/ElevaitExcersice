import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Documents, DocumentsDocument } from './models/document.schema';
import { DocumentDto } from './dto/document.dto';
import { IDocument } from './interfaces/document.interface';
import { Request } from 'express';
import { PageService } from 'src/page/page.service';
import { Page, PageDocument } from 'src/page/models/page.schema';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Documents.name)
    private readonly documentModel: Model<DocumentsDocument>,

    @InjectModel(Page.name)
    private readonly pageModel: Model<PageDocument>,
  ) {}

  async create(document: DocumentDto) {
    const newDocument = new this.documentModel(document);
    return newDocument.save();
  }

  async findAll(req: Request) {
    let options = {};

    if (req.query.s) {
      options = { author: new RegExp(req.query.s.toString(), 'i') };
    }

    const documents = this.documentModel.find(options);

    const page: number = parseInt(req.query.page as any) || 1;
    let limit: number = parseInt(req.query.limit as any) || 10;
    limit = limit > 100 ? 100 : limit;
    const total = await this.documentModel.count(options).exec();

    const docus = await documents
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('pages')
      .exec();

    const data = docus.map((docu) => ({
      id: docu.id,
      title: docu.title,
      author: docu.author,
      dateCreated: docu.dateCreated,
      pages: docu.pages.map((page) => ({
        id: page._id,
        pageNr: page.pageNr,
        text: page.text,
      })),
    }));

    return {
      data,
      total,
      page,
      limit,
      last_page: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {

    try {
      const document = await this.documentModel
      .findOne({ _id: id })
      .populate('pages')
      .exec();

    return {
      id: document._id,
      title: document.title,
      author: document.author,
      dateCreated: document.dateCreated,
      pages: document.pages.map((page) => ({
        id: page._id,
        pageNr: page.pageNr,
        text: page.text,
      }))
    };
    } catch (error) {
      throw new HttpException('Not Found', 404);
    }

  }

  async update(id: string, document: DocumentDto) {
    try {
      const documentUpdate = await this.documentModel
      .findOneAndUpdate(
        { _id: id },
        {
          title: document.title,
          author: document.author,
          dateCreated: document.dateCreated,
        },
        { new: true },
      )
      .populate('pages')
      .exec();


    return {
      id: documentUpdate._id,
      title: documentUpdate.title,
      author: documentUpdate.author,
      dateCreated: documentUpdate.dateCreated,
      pages: documentUpdate.pages.map((page) => ({
        id: page._id,
        pageNr: page.pageNr,
        text: page.text,
      })),
    };
    } catch (error) {
      throw new HttpException(error, 404);
    }
    
  }

  async delete(id: string) {
    try {
      const document = await this.documentModel
      .findOne({ _id: id })
      .populate('pages')
      .exec();

    for (let index = 0; index < document.pages.length; index++) {
      const page = document.pages[index];
      await this.pageModel.findOneAndDelete({ _id: page._id }).exec();
    }

    return this.documentModel.findOneAndDelete({ _id: id });

    } catch (error) {
      throw new HttpException(error, 404);
    }
  }
}
