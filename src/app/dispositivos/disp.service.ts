import {Disp} from './disp.model';
import { HttpClient , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { catchError, tap, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DispServices {
	
	constructor(private http:HttpClient) {
		// code...
	}
	private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

	// public dispositivos:Disp[]=[
	// new Disp("lampara1", "lampara de habitacion", true),
	// new Disp("ventilador", " De habitacion", false),
	// new Disp("TV", " De habitacion2", true),
	// new Disp("lampara1", "baño", false)

	// ];
	// endPoint punto donde se realizan las peteciones 
	private _url:string='http://localhost:3030/api/disp';

	getAll():Observable<Disp[]>{
		//regresa una copia del listado
		// return [...this.dispositivos];
		return this.http.get<Disp[]>(this._url);
	}

	addDisp(nombre:string, descripcion:string, estatus:boolean, tipo:number): Observable<Disp>{
		//crea un nuevo dispositivo
		const d=new Disp(nombre, descripcion, estatus, tipo);
		//inserta el nuevo dispositivo con push a la lista
		// this.dispositivos.push(d);
		return this.http.post<Disp>(this._url, d); //pasar como respuesta

	}
	// getDispById(id: string): Observable<Disp> {
 //    const url = `${this._url}/${id}`;
 //    return this.http.get<Disp>(url).pipe(
 //      tap(_ => console.log(`fetched sales id=${id}`)),
 //      catchError(this.handleError<Disp>(`getDispById id=${id}`))
 //    );
 //  }
	// addDispStatus(id: string, disp : Disp): Observable<any> {
 //    const url = `${this._url}/${id}`;
 //    return this.http.put(url, disp, httpOptions).pipe(
 //      tap(_ => console.log(`updated dispo id=${id}`)),
 //      catchError(this.handleError<any>('addDispStatus'))
 //    );
 //  }
	// addDispStatus(id, data): Observable<Disp>{
	// 	//crea un nuevo dispositivo
		
	// 	//inserta el nuevo dispositivo con push a la lista
	// 	// this.dispositivos.push(d);
	// 	// return this.http.put(`${baseUrl}/${id}`, data);
	// 	return this.http.put<Disp>(`this._url/${id}`, data); //pasar como respuesta

	// }
	getByIdOn(pId: string): Promise<any>{
    return this.http.get<any>(`${this._url}/on/${pId}`).toPromise();
  }

  getByIdOff(pId: string): Promise<any>{
    return this.http.get<any>(`${this._url}/off/${pId}`).toPromise();
  }
	
	deleteDisp(_id: string) {
    return this.http.delete(this._url + `/${_id}`);
  }
	
}