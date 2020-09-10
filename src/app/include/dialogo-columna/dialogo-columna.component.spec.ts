import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoColumnaComponent } from './dialogo-columna.component';

describe('DialogoColumnaComponent', () => {
  let component: DialogoColumnaComponent;
  let fixture: ComponentFixture<DialogoColumnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoColumnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoColumnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
