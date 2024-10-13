
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Detail } from '../model/detail.model';


@Injectable({
  providedIn: 'root'
})

export class DetailsService {
  private apiUrl = 'https://localhost:7271/api/Details';

  constructor(private http: HttpClient) { }

  // get all details
  getDetails(): Observable<Detail[]> {
    return this.http.get<Detail[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<any> {
    console.log(id)
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Add a new detail
  addDetail(detail: Detail): Observable<{ success: boolean; message: string; data: Detail }> {
    return this.http.post<{ success: boolean; message: string; data: Detail }>(this.apiUrl, detail)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  

  // Update an existing detail
  updateDetail(detail: Detail): Observable<{ success: boolean; message: string; data: Detail }> {
    const url = `${this.apiUrl}/${detail.id}`;
    return this.http.put<{ success: boolean; message: string; data: Detail }>(url, detail)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  // Delete a detail
  deleteDetail(id: number): Observable<string> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      map(() => 'success'), 
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}