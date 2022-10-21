import { Resolver, Mutation, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { SuccessModel } from 'src/business/smart-house/dto/mutation.dto';
import { BookRepository } from 'src/business/book-built-in/book.repository';

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
  async createBook(): Promise<SuccessModel> {
    const data = await this.repository.create({ title: "Reflect's Power!" });

    console.log(data, ' - is inside CreateBook Mutation');

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
