import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuPageComponent } from './cu-page.component';

describe('CuPageComponent', () => {
  let component: CuPageComponent;
  let fixture: ComponentFixture<CuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
