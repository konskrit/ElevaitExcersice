import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { DocumentsComponent } from './document/documents.component';

const routes: Routes = [
  { path: '', loadChildren: () => 
    import('./document/documents.module').then((mod) => mod.DocumentsModule), 
    data: { breadcrumb: 'Documents' } },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    data: { breadcrumb: 'Server Errors' },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
