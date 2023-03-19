import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private readonly productModel: Model<Products>,
  ) { }

  create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async findAll() {
    return this.productModel.find();
  }

  findOne(id: string) {
    try {
      return this.productModel.findById(id);
    } catch (error) {
      return new BadRequestException("El Producto por el ID no fue encontrado");
    }
  }

  findAllByCategorie(categorie: string) {
    return this.productModel.find({ categorie: categorie });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
