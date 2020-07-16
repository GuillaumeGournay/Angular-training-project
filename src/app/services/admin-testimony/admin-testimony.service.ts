import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TestimonyModel } from '../../models/testimony.model';
import { ErrorService } from '../error/error.service';

// import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminTestimonyService {

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
  ) { }

  // ** Get Testimonies
  getTestimonies(): Observable<TestimonyModel[]> {
    return this.http.get<TestimonyModel[]>('/testimonies')
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getTestimonies', []))
    );
  }

  // ** Get Testimony
  getTestimonyDetail(id: number): Observable<TestimonyModel> {
    return this.http.get<any>('/testimonies/' + id)
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getTestimony'))
    );
  }

  // POST :  Add a testimony
  addTestimony(testimony: TestimonyModel): Observable<TestimonyModel> {
    return this.http.post<TestimonyModel>('/testimonies/add', testimony)
    .pipe(
      tap((data: TestimonyModel) => console.log(data)),
      catchError(this.errorService.handleError<TestimonyModel>('addTestimony'))
      );
  }

  // PUT :  Edit a testimony
  editTestimony(testimony: TestimonyModel): Observable<TestimonyModel> {
    return this.http.put<TestimonyModel>('/testimonies/' +testimony.id, testimony);
  }

      /** DELETE: delete one testimony */
      deleteTestimony(id: string): Observable<TestimonyModel> {
        const url = '/testimonies/' + id;
        return this.http.delete<any>(url)
          .pipe(
            tap(data => data),
            catchError(this.errorService.handleError('deleteTestimony'))
          );
      }
}
