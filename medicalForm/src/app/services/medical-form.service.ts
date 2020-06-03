import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class MedicalFormService {

  constructor(private http: HttpClient) { }

  generatePdf(data): Observable<any> {
    return new Observable<any>((observer) => {
      console.log("html in data in service", data);
      this.http.post(config.baseApiUrl + "medical/medicalFormPdf", data).subscribe((res: any) => {
        observer.next(res.data);
        console.log("response from service", res);
        // observer.complete();
      }, err => {
        console.log("ERROR ")
        observer.error(err);
      },
        () => {
          console.log("CALL COMPLETED ")
          observer.complete();
        })
    });
  }
}
