import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IPage } from '../shared/models/page';
import { PageService } from './page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class PageComponent implements OnInit {
  page!: IPage;

  constructor(
    private readonly pageService: PageService,
    public dialogRef: MatDialogRef<PageComponent>,
    private readonly router: Router,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, activatedRoute: ActivatedRoute}
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
      this.data.activatedRoute.firstChild?.paramMap.subscribe(
        (params: ParamMap) => {
          const pageId = params.get('pageid');
          this.data.id = String(pageId);
        }
      );

      this.pageService
      .findOne(this.data.id)
      .subscribe((page: IPage) => (this.page = page));
  }

  onClickClose() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(() => {
      let id;
      this.data.activatedRoute.paramMap.subscribe(params => {
        id = params.get('id');
      })
        this.router.navigate(['../../' + id]);
    });
  }
}
