import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenSLDComponent } from './gen-sld.component';

describe('GenSLDComponent', () => {
  let component: GenSLDComponent;
  let fixture: ComponentFixture<GenSLDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenSLDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenSLDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
