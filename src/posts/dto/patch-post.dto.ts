import { CreatePostDto } from './create-post.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class PatchPostDto extends PartialType(CreatePostDto) {
    @ApiProperty({
        description: 'ID of the post',
        example: 1,
    })
    @IsInt()
    @IsNotEmpty()
    id: number
}