import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { IDocument } from 'src/app/shared/models/document';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-cu-document',
  templateUrl: './cu-document.component.html',
  styleUrls: ['./cu-document.component.scss'],
})
export class CuDocumentComponent implements OnInit {
  form!: FormGroup;
  document!: IDocument;
  isUpdate: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly documentService: DocumentService,
    private readonly router: Router,
    public dialogRef: MatDialogRef<CuDocumentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      dateCreated: [null, [Validators.required]],
    });

    if (this.data !== undefined) {
      this.loadDocumentInfo(this.data);
    }
  }

  loadDocumentInfo(id: string) {
    this.isUpdate = true;
    this.documentService
      .findOne(id)
      .pipe(
        tap((document: IDocument) => {
          let date: string;
          if (document.dateCreated?.toString() !== undefined) {
            const newDate = new Date(document.dateCreated);
            date = String(newDate.toLocaleDateString());
            document.dateCreated = date;
          }
          this.document = document;
          this.form.patchValue({
            id: id,
            title: document.title,
            author: document.author,
            dateCreated: document.dateCreated,
          });
        })
      )
      .subscribe();
  }

  onClickUpdate() {
    this.documentService
      .updateOne(this.data?.toString(), this.form.getRawValue())
      .subscribe();
    this.dialogRef.close();
  }

  onClickCreate() {
    this.documentService.create(this.form.getRawValue()).subscribe();
    this.dialogRef.close();
  }

  onClickClose() {
    this.dialogRef.close();
  }
}
