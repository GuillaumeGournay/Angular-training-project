import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { UserModel } from '../../models/user.model';
import { ErrorService } from '../error/error.service';
import { TagModel } from 'src/app/models/tag.model';
import { UserTagModel } from 'src/app/models/userTag.model';


@Injectable({
  providedIn: 'root'
})
export class AdminUserService {

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
  ) { }

  // ** Get Users
  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>('/users')
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getUsers', []))
    );
  }

  // ** Get User
  getUserDetail(id: number): Observable<UserModel> {
    return this.http.get<any>('/users/' + id)
    .pipe(
      tap(data => data),
      catchError(this.errorService.handleError('getUser'))
    );
  }

  // POST :  Add a user
  addUser(data: FormData): Observable<UserModel> {
    return this.http.post<UserModel>('/users/signin', data)
    // .pipe(
    //   tap((data: UserModel) => console.log(data)),
    //   catchError(this.errorService.handleError<UserModel>('addUser'))
    //   );
  }

  // PUT :  Edit a user
  editUser(userId: number,data : FormData): Observable<UserModel> {
    return this.http.put<UserModel>('/users/' +userId, data);
  }

  /** DELETE: delete one user */
  deleteUser(id: string): Observable<UserModel> {
    const url = '/users/' + id;
    return this.http.delete<any>(url)
      // .pipe(
      //   tap(data => data),
      //     catchError(this.errorService.handleError('deleteUser'))
      //   );
  }

  //get User Tags
  getUserTags(user:UserModel): Observable<TagModel[]> {
    return this.http.post<any>('/userTags/tags',user);
  }

  //Add tag to User

  addUsertag(user: UserModel, tag: TagModel) : Observable<UserTagModel> {
    return this.http.post<any>('/users/tag/'+user.id, tag)
  }
}
