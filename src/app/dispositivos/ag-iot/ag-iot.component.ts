import { Component, OnInit } from '@angular/core';
import { Disp} from '../disp.model';
import { DispServices } from '../disp.service';

@Component({
  selector: 'app-ag-iot',
  templateUrl: './ag-iot.component.html',
  styleUrls: ['./ag-iot.component.css']
})
export class AgIotComponent implements OnInit {
  listadoDispositivos:Disp[]=[];
  constructor(public dispService:DispServices) { }

  ngOnInit(): void {
  	this.dispService.getAll().subscribe(r=>{
  		this.listadoDispositivos=r;
  	});
  }

}
