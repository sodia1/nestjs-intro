import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dto/create-post-meta-options.dto';
import { MetaOptionsService } from './meta-options.service';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(private readonly metaOptionsService: MetaOptionsService) {}

    @Get()
    getMetaOptions(): string {
        return 'This will return meta options';
    }

    @Post()
    public async create(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto): Promise<any> {
        console.log(createPostMetaOptionsDto)
        return this.metaOptionsService.create(createPostMetaOptionsDto)
    }
}
