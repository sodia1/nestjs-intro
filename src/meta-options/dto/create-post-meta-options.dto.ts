import { IsJSON, IsNotEmpty, IsString } from "class-validator";

export class CreatePostMetaOptionsDto {
    @IsJSON()
    @IsNotEmpty()
    metaValue: string;
}
