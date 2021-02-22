import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgDispComponent} from './dispositivos/ag-disp/ag-disp.component';
import {AgDetalleComponent} from './dispositivos/ag-detalle/ag-detalle.component';
import {AgIotComponent} from './dispositivos/ag-iot/ag-iot.component';
const routes: Routes = [
	{path:'', component: AgIotComponent},
	{path:'create', component:AgDispComponent}
	


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
