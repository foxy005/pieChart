import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from './status/status.component';
import { ApprovalStatusComponent } from './approval-status/approval-status.component';
import { OrdersCreatedComponent } from './orders-created/orders-created.component';


const routes: Routes = [
  {path:'status',component: StatusComponent},
  {path:'approvalStatus',component:ApprovalStatusComponent},
  {path:'orderCreated',component:OrdersCreatedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
