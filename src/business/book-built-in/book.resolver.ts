import { Resolver, Mutation, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { SuccessModel } from 'src/business/smart-house/dto/mutation.dto';
import { BookRepository } from 'src/business/book-built-in/book.repository';
import { OtherRepository } from 'src/business/book-built-in/other.repository';

@Resolver()
export class BookResolver {
  constructor(
    @Inject(BookRepository) private repository: BookRepository,
    @Inject(OtherRepository) private repository2: OtherRepository,
  ) {}

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

  @Mutation(() => SuccessModel)
  async createOther(): Promise<SuccessModel> {
    const data = await this.repository2.create({
      title: "Reflect's Power Other!",
    });

    console.log(data, ' - is inside CreateOther Mutation');

    return {
      success: true,
    };
  }

  @Mutation(() => SuccessModel)
  deleteOther(): SuccessModel {
    this.repository2.delete(5);
    return {
      success: true,
    };
  }
}
