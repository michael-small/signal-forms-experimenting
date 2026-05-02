// Required subset of SWAPI schema for async validation example

import { HttpClient, httpResource } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';

// curl https://swapi.info/api/films/schema
export type SWAPIStarWarsMovies = {
  /**
   * @description YYYY-MM-DD
   * @example 1977-05-25
   */
  release_date: string;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root',
})
export class SWAPIStore {
  public movies = httpResource<SWAPIStarWarsMovies[]>(() => 'https://swapi.info/api/films', {
    defaultValue: [],
  });
}
