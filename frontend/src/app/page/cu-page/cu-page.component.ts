import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { IPage } from 'src/app/shared/models/page';
import { PageService } from '../page.service';

@Component({
  selector: 'app-cu-page',
  templateUrl: './cu-page.component.html',
  styleUrls: ['./cu-page.component.scss']
})
export class CuPageComponent implements OnInit {
  isUpdate: boolean = false;
  form!: FormGroup;
  documentId!: string;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pageService: PageService,
    private readonly router: Router,
    public dialogRef: MatDialogRef<CuPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, activatedRoute: ActivatedRoute}
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      text: [null, [Validators.required]],
      pageNr: [{ value: null, disabled: true }, [Validators.required]],
    });

    if (this.data.id) {
      this.loadPage();
    }

  }

  loadPage() {
    this.isUpdate = true;

    this.pageService
      .findOne(this.data.id)
      .pipe(
        tap((page: IPage) => {
          this.form.patchValue({
            id: page.id,
            text: page.text,
            pageNr: page.pageNr
          })
        })
      )
      .subscribe();
}

onClickClose() {
  this.dialogRef.close();
  this.dialogRef.afterClosed().subscribe(() => {
    this.data.activatedRoute.paramMap.subscribe(params => {
      this.documentId = String(params.get('id'));
    });

    this.router.navigate(['../../' + this.documentId]);
  });
}

  onClickCreate() {
    this.data.activatedRoute.paramMap.subscribe(params => {
      this.documentId = String(params.get('id'));
    });

    this.pageService.create(this.documentId, this.form.getRawValue()).subscribe(() => {
      this.dialogRef.close();
      this.router.navigate(['../../' + this.documentId]);
    });
  }

  onClickUpdate() {
    this.pageService
    .updateOne(this.data.id.toString(), this.form.getRawValue())
    .subscribe();
    this.dialogRef.close();
  }
  
}
