import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) { }

  getMatches(user: UserModel): Observable<UserModel[]> {
    return this.http.post<any>('/userTags/', user);
  }

}
