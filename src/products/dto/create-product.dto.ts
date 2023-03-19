import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  price: number;
  @IsString()
  quantity: number;
  @IsString()
  image: string;
  @IsString()
  categorie: string;
}
