import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tags.entity';

@Module({
    controllers: [TagsController],
    providers: [],
    imports: [TypeOrmModule.forFeature([Tag])],
    exports: [],
})
export class TagsModule {}
