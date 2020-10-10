import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoErroresComponent } from './dialogo-errores.component';

describe('DialogoErroresComponent', () => {
  let component: DialogoErroresComponent;
  let fixture: ComponentFixture<DialogoErroresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoErroresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
