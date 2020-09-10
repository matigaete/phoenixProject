import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductosComponent } from './index-productos.component';

describe('IndexProductosComponent', () => {
  let component: IndexProductosComponent;
  let fixture: ComponentFixture<IndexProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
