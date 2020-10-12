import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductosComponent } from './info-productos.component';

describe('InfoProductosComponent', () => {
  let component: InfoProductosComponent;
  let fixture: ComponentFixture<InfoProductosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoProductosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
