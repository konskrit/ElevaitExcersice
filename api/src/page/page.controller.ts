import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PageDto } from './dto/page.dto';
import { PageService } from './page.service';

@Controller('pages')
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Get(':id')
    async getPage(@Param('id') id: string) {
        return this.pageService.findOne(id);
    }

    @Post(':id')
    async postPage(@Param('id') id: string, @Body() page: PageDto) {
        return this.pageService.create(id, page);
    }

    @Put(':id')
    async putPage(@Param('id') id: string, @Body() page: PageDto) {
        return this.pageService.update(id, page);
    }

    @Delete(':id')
    async deletePage(@Param('id') id: string) {
        return this.pageService.delete(id);
    }
}
