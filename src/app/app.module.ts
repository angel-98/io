import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NuevoCComponent } from './nuevo-c/nuevo-c.component';
import { AgDispComponent } from './dispositivos/ag-disp/ag-disp.component';
import { AgDetalleComponent } from './dispositivos/ag-detalle/ag-detalle.component';
import { FormsModule } from '@angular/forms';
import { DispServices } from './dispositivos/disp.service';
//-------------------
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';

//---------
import { FlexLayoutModule } from '@angular/flex-layout';

//http
import { HttpClientModule } from '@angular/common/http';
import { AgIotComponent } from './dispositivos/ag-iot/ag-iot.component';




@NgModule({
  declarations: [
    AppComponent,
    NuevoCComponent,
    AgDispComponent,
    AgDetalleComponent,
    AgIotComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule

  ],
  providers: [DispServices],
  bootstrap: [AppComponent]
})
// <mat-slider min="1" max="100" step="1" value="1"></mat-slider>
export class AppModule { }
