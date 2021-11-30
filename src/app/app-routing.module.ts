import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './page/form/form.component';
import { ListComponent } from './page/list/list.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'form', component: FormComponent },
  { path: 'form/:id', component: FormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
