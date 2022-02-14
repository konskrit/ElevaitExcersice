import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IDocumentData } from '../shared/models/documentData';
import { CuDocumentComponent } from './cu-document/cu-document.component';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss'],
})
export class DocumentsComponent implements OnInit {

  filterValue!: string;
  dataSource!: IDocumentData;
  pageEvent!: PageEvent;
  displayedColumns: string[] = [
    'Author',
    'Title',
    'DateCreated',
    'Edit',
    'Delete',
  ];
  HasClicked: boolean = false;

  constructor(
    private readonly documentService: DocumentService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initDocuments();
  }

  initDocuments() {
    this.documentService
      .findAll(1, 10)
      .pipe(
        map((documentData: IDocumentData) => (this.dataSource = this.changeDate(documentData)))
      )
      .subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (this.filterValue == null) {
      page = page + 1;
      this.documentService
        .findAll(page, size)
        .pipe(
          map((documentData: IDocumentData) => (this.dataSource = this.changeDate(documentData)))
        )
        .subscribe();
    } else {
      this.documentService
        .findAll(page, size, this.filterValue)
        .pipe(
          map((documentData: IDocumentData) => (this.dataSource = this.changeDate(documentData)))
        )
        .subscribe();
    }
  }

  findByAuthor(author: string) {
    this.documentService
      .findAll(0, 10, author)
      .pipe(
        map((documentData: IDocumentData) => (this.dataSource = documentData))
      )
      .subscribe();
  }

  navigateToDocument(id: string) {
    this.router.navigate(['./' + id], { relativeTo: this.activatedRoute });
  }

  openCUDocument(id?: string) {
    const dialogRef = this.dialog.open(CuDocumentComponent, {
      width: '500px',
      data: id
    });

    dialogRef.afterClosed().subscribe(() => this.initDocuments());
  }

  deleteDocument(id: string) {
    this.documentService.delete(id).subscribe(() => this.initDocuments());
  }

  changeDate(documentData: IDocumentData): IDocumentData {
    documentData.data = documentData.data.map((data) => {
      let date: string;
      if (data.dateCreated?.toString() !== undefined) {
        const newDate = new Date(data.dateCreated);
        date = String(newDate.toLocaleDateString());
        console.log(date);
        data.dateCreated = date;
      }
      return data;
    });
    return documentData;
  }
}
