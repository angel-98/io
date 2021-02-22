import {Disp} from './disp.model';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable()
export class DispServices {
	
	constructor(private http:HttpClient) {
		// code...
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
	
	
	
}