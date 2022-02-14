import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDocument } from 'src/document/interfaces/document.interface';
import {
  Documents,
  DocumentsDocument,
} from 'src/document/models/document.schema';
import { PageDto } from './dto/page.dto';
import { IPage } from './interfaces/page.interface';
import { Page, PageDocument } from './models/page.schema';

@Injectable()
export class PageService {
  constructor(
    @InjectModel(Page.name)
    private readonly pageModel: Model<PageDocument>,

    @InjectModel(Documents.name)
    private readonly documentModel: Model<DocumentsDocument>,
  ) {}

  async findOne(id: string) {
    try {
      const page = await this.pageModel.findOne({ _id: id }).exec();
      return {
        id: page.id,
        pageNr: page.pageNr,
        text: page.text,
      };
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  async create(documentId: string, page: PageDto) {
    try {
      const document = await this.documentModel
        .findOne({ _id: documentId })
        .populate('pages')
        .exec();
      const totalPages = document.pages.length;
      page.pageNr = totalPages + 1;
      const newPage = new this.pageModel(page);
      await newPage.save();
      const updateDocument = await this.documentModel
        .findOneAndUpdate(
          { _id: documentId },
          { $push: { pages: newPage.id } },
          { new: true },
        )
        .populate('pages')
        .exec();

      return {
        id: updateDocument._id,
        author: updateDocument.author,
        dateCreated: updateDocument.dateCreated,
        pages: updateDocument.pages.map((pageMap) => ({
          id: pageMap._id,
          pageNr: pageMap.pageNr,
          text: pageMap.text,
        })),
      };
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  async update(id: string, page: PageDto) {
    try {
      const pageUpdate = await this.pageModel
        .findOneAndUpdate(
          { _id: id },
          {
            text: page.text,
          },
          { new: true },
        )
        .exec();

      return {
        id: pageUpdate.id,
        pageNr: pageUpdate.pageNr,
        text: pageUpdate.text,
      };
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }

  async delete(id: string) {
    try {
      return this.pageModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new HttpException(error, 404);
    }
  }
}
