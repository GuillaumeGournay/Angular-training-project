import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { GenderModel } from '../../models/gender.model';
import { ErrorService } from '../error/error.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGenderService {
  
  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
  ) { }

  // ** Get Genders
  getGenders(): Observable<GenderModel[]> {
    return this.http.get<GenderModel[]>('/genders')
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getGenders', []))
    );
  }

  // ** Get Gender
  getGenderDetail(id: number): Observable<GenderModel> {
    return this.http.get<any>('/genders/' + id)
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getGender'))
    );
  }

  // POST :  Add a gender
  addGender(gender: GenderModel): Observable<GenderModel> {
    return this.http.post<GenderModel>('/genders/add', gender)
    .pipe(
      tap((data: GenderModel) => console.log(data)),
      catchError(this.errorService.handleError<GenderModel>('addGender'))
      );
  }

  // PUT :  Edit a gender
  editGender(gender: GenderModel): Observable<GenderModel> {
    return this.http.put<GenderModel>('/genders/' +gender.id, gender);
  }

  /** DELETE: delete one gender */
  deleteGender(id: string): Observable<GenderModel> {
    const url = '/genders/' + id;
    return this.http.delete<any>(url)
      // .pipe(
      //   tap(data => data),
      //     catchError(this.errorService.handleError('deleteGender'))
      //   );
  }
}
