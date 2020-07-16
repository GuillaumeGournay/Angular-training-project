import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { CityModel } from '../../models/city.model';
import { ErrorService } from '../error/error.service';


@Injectable({
  providedIn: 'root'
})
export class AdminCityService {

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
  ) { }

  // ** Get Cities
  getCities(): Observable<CityModel[]> {
    return this.http.get<CityModel[]>('/cities')
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getCities', []))
    );
  }

  // ** Get City
  getCityDetail(id: number): Observable<CityModel> {
    return this.http.get<any>('/cities/' + id)
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getCity'))
    );
  }

  // POST :  Add a city
  addCity(city: CityModel): Observable<CityModel> {
    return this.http.post<CityModel>('/cities/add', city)
    .pipe(
      tap((data: CityModel) => console.log(data)),
      catchError(this.errorService.handleError<CityModel>('addCity'))
      );
  }

  // PUT :  Edit a city
  editCity(city: CityModel): Observable<CityModel> {
    return this.http.put<CityModel>('/cities/' +city.id, city);
  }

  /** DELETE: delete one city */
  deleteCity(id: string): Observable<CityModel> {
    const url = '/cities/' + id;
    return this.http.delete<any>(url)
      .pipe(
        tap(data => data),
          catchError(this.errorService.handleError('deleteCity'))
        );
  }
}
