import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentSchema } from 'src/document/models/document.schema';
import { PageSchema } from './models/page.schema';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'Page', schema: PageSchema}, 
    {name: 'Documents', schema: DocumentSchema}])],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService]
})
export class PageModule {}
