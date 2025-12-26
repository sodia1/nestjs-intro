import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dto/create-post-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from './meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
    constructor(
        @InjectRepository(MetaOption)
        private readonly metaOptionRepository: Repository<MetaOption>) {}

    public async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto): Promise<any> {
        let metaOption = this.metaOptionRepository.create(createPostMetaOptionsDto);
        metaOption = await this.metaOptionRepository.save(metaOption);
        return metaOption;
    }
}
