import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsComponent } from './documents.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DocumentsRoutingModule } from './documents-routing.module';
import { PageModule } from '../page/page.module';
import { CuDocumentComponent } from './cu-document/cu-document.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    DocumentsComponent,
    DocumentDetailsComponent,
    CuDocumentComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    DocumentsRoutingModule,
    PageModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [DocumentsComponent]
})
export class DocumentsModule { }
