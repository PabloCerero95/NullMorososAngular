import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMorosoComponent } from './add-moroso/add-moroso.component';
import { MenuComponent } from './menu/menu.component';
import { MorososComponent } from './morosos/morosos.component';


const routes: Routes = [
  {
    path: 'morosos', component: MorososComponent
  },
  {
    path: 'formAddMoroso/:morosoID', component: AddMorosoComponent
  },
  {
    path: 'formAddMoroso', component: AddMorosoComponent
  },

  {
    path: 'home', component: MenuComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
