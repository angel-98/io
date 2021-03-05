import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { Disp} from '../disp.model';
import { DispServices } from '../disp.service';
import {NgForm} from '@angular/forms';// para usar el ngForm
import { catchError, tap, map} from 'rxjs/operators';
import { Subscriber } from 'rxjs';
import { WebSocketServices } from '../websocket.service';
import { webSocket, WebSocketSubject} from 'rxjs/webSocket';

@Component({
  selector: 'app-ag-iot',
  templateUrl: './ag-iot.component.html',
  styleUrls: ['./ag-iot.component.css']
})

export class AgIotComponent implements OnInit {
  listadoDispositivos:Disp[]=[];
  dispos:Disp[];
  @Output() dispElminado = new EventEmitter();
  constructor(public dispService:DispServices, 
              public webSocket:WebSocketServices) { }

  ngOnInit(): void {
  	this.dispService.getAll().subscribe(r=>{
  		this.listadoDispositivos=r;
      
  	});
    this.webSocket.suscribe_websocket();
    this.webSocket.estatusActualizado.subscribe(
      msg=>{
        //
        this.updateEstatus(msg);
      },
      err=>{
        console.log(err);
      });
  }

    async sensorOn(dispId){
    try{
      const disp = await this.dispService.getByIdOn(dispId);
      console.log(disp);
    }catch(error){
      console.log(error);
    }
  }

  async sensorOff(dispId){
    try{
      const disp = await this.dispService.getByIdOff(dispId);
      console.log(disp);
    }catch(error){
      console.log(error);
    }
  }

  deleteDisp(_id: string, form: NgForm) {
    if (confirm("¿Seguro que desea eliminar?")) {
      this.dispService.deleteDisp(_id).subscribe((r) => {//res a dentro no solo r
        this.dispElminado.emit();
        
        
      });
    }
  }

   updateEstatus(msg){
    let i = 0;
    for(i ; i < this.listadoDispositivos.length; i ++){
      //console.log(this.listadoDispositivos[i]._id);
      if (this.listadoDispositivos[i]._id == msg['_id']){
        //console.log(this.listadoDispositivos[i].estatus);
        this.listadoDispositivos[i].estatus = msg['estatus'];
      }
    }
    
  }
 


}
