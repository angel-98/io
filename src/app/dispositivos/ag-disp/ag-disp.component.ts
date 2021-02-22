import { Component, OnInit } from '@angular/core';
import{Disp} from'../disp.model';
import {DispServices} from '../disp.service';
//./ significa que va a buscar un archivo en la misma carpeta y ../fuera
@Component({
  selector: 'app-ag-disp',
  templateUrl: './ag-disp.component.html',
  //el selector y templateUrl solo puede ser uno por componente los estilos pueden ser muchas hojas

  styleUrls: ['./ag-disp.component.css']
})


export class AgDispComponent implements  OnInit{
	//importar el modelo que se usara 
	//crear una lista  defenir  dispo[]=[] arreglo de dispo
	
	listadoDispositivos:Disp[]=[];
	constructor(public dispService:DispServices){

	}
	ngOnInit():void{
		// this.listadoDispositivos=this.dispService.getAll();
		this.dispService.getAll().
		subscribe(r=>{
			this.listadoDispositivos=r
		});
	}

	onDispCreado(){
		// this.listadoDispositivos= this.dispService.getAll();
		this.dispService.getAll().
		subscribe(r=>{
			this.listadoDispositivos=r
		});

	}
	
	
}