import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuDocumentComponent } from './cu-document.component';

describe('CuDocumentComponent', () => {
  let component: CuDocumentComponent;
  let fixture: ComponentFixture<CuDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
