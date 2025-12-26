import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, Min, MinLength, Matches, IsOptional, IsJSON, IsUrl } from "class-validator";

export class CreateTagDto {
    @ApiProperty({
        description: 'Name of the tag',
        example: 'nestjs',
    })
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    @MaxLength(256)
    name: string;

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

    @ApiPropertyOptional({
        description: 'Description of the tag',
        example: 'A tag for NestJS related posts',
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

}