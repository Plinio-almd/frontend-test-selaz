import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component:MainLayoutComponent,
    children: [
      {
        path:'', redirectTo:'users',pathMatch:'full'
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
      },
      {
        path: 'tasks',
        loadChildren: () => import('./pages/tasks/tasks.module').then( m => m.TasksPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
