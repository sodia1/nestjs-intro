import { IsInt, IsOptional } from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
  @ApiPropertyOptional(
    { description: 'The ID of the user to retrieve' ,
        example: 1234
    }
  )
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}