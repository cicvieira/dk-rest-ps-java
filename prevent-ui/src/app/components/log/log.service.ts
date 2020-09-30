import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Log } from "./log.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LogService {
  //baseUrl = "http://localhost:3001/logs";
  baseUrl = "http://localhost:8080/api/logs/";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "Fechar", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(log: Log): Observable<Log> {
    return this.http.post<Log>(this.baseUrl, log).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Log[]> {
    return this.http.get<Log[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Log> {
    const url = `${this.baseUrl}${id}`;
    return this.http.get<Log>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(log: Log): Observable<Log> {
    const url = `${this.baseUrl}${log.id}`;
    return this.http.put<Log>(url, log).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Log> {
    const url = `${this.baseUrl}${id}`;
    return this.http.delete<Log>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }

  emptyObject(arg): number {
    let c = 0;
    if(arg.data==null){c = 1;}
    for ( let key in arg ) {
      if(arg[key]==''){c++;}
    } return c;
  }

}
