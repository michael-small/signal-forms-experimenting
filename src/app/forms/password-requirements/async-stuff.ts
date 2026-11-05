// Required subset of SWAPI schema for async validation example
import { httpResource } from '@angular/common/http';
import { Service } from '@angular/core';

// curl https://swapi.info/api/films/schema
export type SWAPIStarWarsMovies = {
  /**
   * @description YYYY-MM-DD
   * @example 1977-05-25
   */
  release_date: string;
  [key: string]: unknown;
};

@Service()
export class SWAPIStore {
  public movies = httpResource<SWAPIStarWarsMovies[]>(() => 'https://swapi.info/api/films', {
    defaultValue: [],
  });
}
