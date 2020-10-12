import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoServiciosComponent } from './info-servicios.component';

describe('InfoServiciosComponent', () => {
  let component: InfoServiciosComponent;
  let fixture: ComponentFixture<InfoServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
