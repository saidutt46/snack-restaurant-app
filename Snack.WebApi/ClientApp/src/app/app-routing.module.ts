import { ManagerialAccessGuard } from './helpers/managerial-acess-guard';
import { ItemsManagementComponent } from './components/items-management/items-management.component';
import { CategoriesManagementComponent } from './components/categories-management/categories-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ManagementComponent } from './components/management/management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, LobbyComponent } from './components';


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'lobby', component: LobbyComponent},
  {path: 'manage', component: ManagementComponent, pathMatch: 'full', canActivate: [ManagerialAccessGuard]},
  {path: 'user-management', component: UserManagementComponent, canActivate: [ManagerialAccessGuard]},
  {path: 'food-categories', component: CategoriesManagementComponent, canActivate: [ManagerialAccessGuard]},
  {path: 'food-items', component: ItemsManagementComponent, canActivate: [ManagerialAccessGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
