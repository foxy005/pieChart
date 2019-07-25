import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './status/status.component';
import { ApprovalStatusComponent } from './approval-status/approval-status.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiServiceService } from './api-service.service';
import * as d3 from "d3";
import { OrdersCreatedComponent } from './orders-created/orders-created.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    ApprovalStatusComponent,
    OrdersCreatedComponent
  ],
  imports: [
    BrowserModule,  
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
