import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {path: 'create', component: QrCodeComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
