import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CuPageComponent } from 'src/app/page/cu-page/cu-page.component';
import { PageComponent } from 'src/app/page/page.component';
import { PageService } from 'src/app/page/page.service';
import { IDocument } from 'src/app/shared/models/document';
import { IPage } from 'src/app/shared/models/page';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
})
export class DocumentDetailsComponent implements OnInit {
  document!: IDocument;
  page!: IPage;
  HasClickedPage: boolean = false;

  constructor(
    private readonly documentService: DocumentService,
    private readonly pageService: PageService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDocument();
  }

  loadDocument() {
    this.documentService
      .findOne(this.activatedRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (document) => {
          let date: string;
          if (document.dateCreated?.toString() !== undefined) {
            const newDate = new Date(document.dateCreated);
            date = String(newDate.toLocaleDateString());
            document.dateCreated = date;
          }
          this.document = document;

          const childRouteId =
            this.activatedRoute.firstChild?.snapshot.params['pageid'];
          if (
            childRouteId &&
            !this.dialog.getDialogById(childRouteId) &&
            !this.dialog.getDialogById('form-' + childRouteId ) &&
            !this.dialog.getDialogById('form-create')
          ) {
            this.navigateToPage(childRouteId);
          }

          console.log(childRouteId);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  navigateToPage(id?: string) {
    if (this.dialog) {
      this.dialog.closeAll();
    }
    this.router.navigate(['./' + id], { relativeTo: this.activatedRoute });
    if (id !== undefined) {
      const dialogRef = this.dialog.open(PageComponent, {
        width: '500px',
        data: { id: id, activatedRoute: this.activatedRoute },
        id: id,
      });

      dialogRef.afterClosed().subscribe(() => {
        if (!id) {
          this.router.navigate(['../../' + this.document.id]);
        }
        this.loadDocument();
      });
    }
  }

  deletePage(id: string) {
    this.pageService.delete(id).subscribe(() => this.loadDocument());
  }

  createUpdatePage(id?: string) {
    console.log(id);
    if (this.dialog) {
      this.dialog.closeAll();
    }
    if (id) {
      this.router.navigate(['./' + id], { relativeTo: this.activatedRoute });
    }
    if (id !== undefined) {
      const dialogRef = this.dialog.open(CuPageComponent, {
        width: '500px',
        data: { id: id, activatedRoute: this.activatedRoute },
        id: 'form-' + id,
      });

      dialogRef.afterClosed().subscribe(() => this.loadDocument());
    } else {
      const dialogRef = this.dialog.open(CuPageComponent, {
        width: '500px',
        data: { id: id, activatedRoute: this.activatedRoute },
        id: 'form-create',
      });

      dialogRef.afterClosed().subscribe(() => this.loadDocument());
    }
  }
}
