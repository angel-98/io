import { Component, Output, EventEmitter, Input} from '@angular/core';
import {NgForm} from '@angular/forms';// para usar el ngForm
import {DispServices} from '../disp.service';
import{Disp} from'../disp.model';
//./ significa que va a buscar un archivo en la misma carpeta y ../fuera
@Component({
  selector: 'app-ag-detalle',
  templateUrl: './ag-detalle.component.html'


  // styleUrls: ['./ag-disp.component.css']
})
export class AgDetalleComponent {

  

  
  //disparador
  //referencia al evento nuevo elemneto de tipo Emmiter es un emisor de eventos Disp
  //el Output es para que puede ser escuachado por otros
  @Output() dispCreado = new EventEmitter();
  constructor( public dispService: DispServices) { }
  
  // nombre="";
  // descripcion="";
  // estatus= false;
  // newDispositivo(){
  // 	this.nombre="";
  // 	this.descripcion="";
  // 	this.estatus=false;
  // }

  crearDispo(form:NgForm){
  	if (form.invalid) {
  		//si es invalido regresar nada
  		return;
  		// code...
  	}
  	if (form.valid) {
  		this.dispService.addDisp(
  			form.value.nombre,
  			form.value.descripcion,
  			form.value.estatus,
        form.value.tipo
  			).subscribe(
        r=>{
          form.resetForm();
          this.dispCreado.emit();
        }, 
        e=>{
          console.log('Error en el servidor'+ e)
        }

        //{
        //   next(res){form.resetForm();// sirve para resetar el formulario 
        //             // this.dispCreado.emit();
        //           },
        //   error(err){console.log('Error en el servidor'+ err)}

        // }
        );
  		
  		// code...
  	}

  	// const d=new Disp(this.nombre,this.descripcion,false);
  	// this.dispCreado.emit(d);
  	//emit eventos
  }


}






	
	
