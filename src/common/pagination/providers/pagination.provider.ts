import { Inject, Injectable } from '@nestjs/common';
import { ObjectLiteral } from 'typeorm';
import { Paginated } from '../interfaces/paginated.interface';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import express from 'express';
import * as url from 'url';

@Injectable()
export class PaginationProvider {
  /**
   * Use Constructor to Inject Request
   * */
  constructor(@Inject(REQUEST) private readonly request: express.Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const limit = paginationQuery?.limit ?? 10;
    const page = paginationQuery?.page ?? 1;
    
    let results = await repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    /**
     * Create the request URLs
     */
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

    // Calculate page numbers
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage =
      page === totalPages
        ? page
        : page + 1;
    const previousPage =
      page === 1
        ? page
        : page - 1;

    let finalResponse = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems: totalItems,
        currentPage: page,
        totalPages: Math.ceil(totalItems / limit),
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${limit}&page=${previousPage}`,
      },
    };

    return finalResponse;
  }
}