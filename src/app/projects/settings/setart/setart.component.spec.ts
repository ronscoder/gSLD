import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetartComponent } from './setart.component';

describe('SetartComponent', () => {
  let component: SetartComponent;
  let fixture: ComponentFixture<SetartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
