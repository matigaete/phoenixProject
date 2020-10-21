import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersonasComponent } from './info-personas.component';

describe('InfoPersonasComponent', () => {
  let component: InfoPersonasComponent;
  let fixture: ComponentFixture<InfoPersonasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPersonasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
