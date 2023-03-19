import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Products extends Document {
  @Prop()
  title: string;
  @Prop()
  price: number;
  @Prop()
  image: string;
  @Prop()
  qunatity: number;
  @Prop()
  categorie: string;
  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Products)

