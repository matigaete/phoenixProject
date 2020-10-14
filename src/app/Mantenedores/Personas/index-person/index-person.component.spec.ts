import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPersonComponent } from './index-person.component';

describe('IndexPersonComponent', () => {
  let component: IndexPersonComponent;
  let fixture: ComponentFixture<IndexPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
