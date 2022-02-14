import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from './documents.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { PageComponent } from '../page/page.component';
import { CuDocumentComponent } from './cu-document/cu-document.component';

const routes: Routes = [
  {path: '', component: DocumentsComponent},
  {path: ':id', component: DocumentDetailsComponent, children: [
    {path: ':pageid', component: PageComponent}
  ]},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class DocumentsRoutingModule { }
