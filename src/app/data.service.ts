import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  uploadUrl = environment.api + '/api/v1/upload';

  constructor(private http: HttpClient) { }

  uploadCsvFile(formdata: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    return this.http.post<any>(this.uploadUrl, formdata, { headers });
  }


}
