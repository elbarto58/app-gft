import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
/*import { AccountPage } from '../account/account.page';
import { AccountPageModule } from '../account/account.module';*/

const routes: Routes = [
  {
    path: '',
    component: HomePage/*,
    children: [{
      path:'account',
      component: AccountPage
    }]*/
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    //AccountPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
