import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http : HttpClient) { }

  getUserImage (id: number): Observable<any> {
    return this.http.get<any>('/users/image/'+id);
  }
}

