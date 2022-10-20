import { Resolver, Mutation, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { BookRepository } from 'src/business/book/book.repository';
import { SuccessModel } from 'src/business/smart-house/dto/mutation.dto';

@Resolver()
export class BookResolver {
  constructor(@Inject(BookRepository) private repository: BookRepository) {}

  @Query(() => SuccessModel)
  getBook(): SuccessModel {
    return {
      success: true,
    };
  }

  @Mutation(() => SuccessModel)
  createBook(): SuccessModel {
    this.repository.create({ title: "Reflect's Power!" });
    return {
      success: true,
    };
  }

  @Mutation(() => SuccessModel)
  deleteBook(): SuccessModel {
    this.repository.delete(5);
    return {
      success: true,
    };
  }
}
