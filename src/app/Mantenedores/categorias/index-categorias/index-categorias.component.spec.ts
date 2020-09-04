import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCategoriasComponent } from './index-categorias.component';

describe('IndexCategoriasComponent', () => {
  let component: IndexCategoriasComponent;
  let fixture: ComponentFixture<IndexCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
