import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Products, ProductSchema } from './entities/product.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProductSchema
      }
    ])
  ],
  exports: [ProductsModule]
})
export class ProductsModule { }
