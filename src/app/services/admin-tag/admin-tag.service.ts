import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { TagModel } from '../../models/tag.model';
import { ErrorService } from '../error/error.service';
import { UserModel } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AdminTagService {

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
  ) { }

  // ** Get Tags
  getTags(): Observable<TagModel[]> {
    return this.http.get<TagModel[]>('/tags')
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getTags', []))
    );
  }

  // ** Get Tag
  getTagDetail(id: number): Observable<TagModel> {
    return this.http.get<any>('/tags/' + id)
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getTag'))
    );
  }

  // POST :  Add a tag
  addTag(tag: TagModel): Observable<TagModel> {
    return this.http.post<TagModel>('/tags/add', tag)
    .pipe(
      tap((data: TagModel) => console.log(data)),
      catchError(this.errorService.handleError<TagModel>('addTag'))
      );
  }

  // PUT :  Edit a tag
  editTag(tag: TagModel): Observable<TagModel> {
    return this.http.put<TagModel>('/tags/' +tag.id, tag);
  }

      /** DELETE: delete one tag */
      deleteTag(id: string): Observable<TagModel> {
        const url = '/tags/' + id;
        return this.http.delete<any>(url)
          .pipe(
            tap(data => data),
            catchError(this.errorService.handleError('deleteTag'))
          );
      }

  // Delete a tag of a User 
  deleteUserTag(tag: TagModel,user: UserModel) : Observable<any> {
    return this.http.post<any>('/userTags/' + tag.id, user)
  }
}
