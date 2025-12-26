import { IsArray, IsDate, IsEnum, isISO8601, IsJSON, IsNotEmpty, IsObject, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { postType } from "../enum/post.enum";
import { postStatus } from "../enum/status.enum";
import { CreatePostMetaOptionsDto } from "../../meta-options/dto/create-post-meta-options.dto";
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty({
        description: 'Title of the post',
        example: 'Introduction to NestJS',
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Type of the post',
        example: 'post',
        enum: postType,
    })
    @IsEnum(postType)
    @IsNotEmpty()
    type: postType;
    
    @ApiProperty({
        description: 'Slug for the post',
        example: 'introduction-to-nestjs',
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    })
    slug: string;

    @ApiProperty({
        description: 'Status of the post',
        example: 'Published',
        enum: postStatus,
    })
    @IsEnum(postStatus)
    @IsNotEmpty()
    status: postStatus;
    @ApiPropertyOptional({
        description: 'Content of the post',
        example: 'This is an introductory post about NestJS...',
    })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({
        description: 'Serialised Schema in JSON format for the post',
        example: '{"type": "object", "properties": {"key": {"type": "string"}}}',
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'Featured Image URL for the post',
        example: 'https://example.com/images/nestjs-intro.png',
    })
    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: 'Publish date of the post',
        example: '2024-12-31T23:59:59Z',
    })
    @IsDate()
    @IsOptional()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'Tags associated with the post',
        example: ['nestjs', 'backend', 'typescript'],
        type: [String],
    })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    @MinLength(3, { each: true })
    tags?: string[];

    @ApiPropertyOptional({
        description: 'Meta options for the post',
        type: 'array',
        items: { type: 'object',
            properties: {
                key: { type: 'string', example: 'views' },
                value: { type: 'string', example: '1000' },
            },
         },
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto[];

}