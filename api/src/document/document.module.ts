import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema } from 'src/page/models/page.schema';
import { PageService } from 'src/page/page.service';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentSchema } from './models/document.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Documents', schema: DocumentSchema},
    {name: 'Page', schema: PageSchema}])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService]
})
export class DocumentModule {}
