import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderedMapComponent } from './rendered-map.component';

describe('RenderedMapComponent', () => {
  let component: RenderedMapComponent;
  let fixture: ComponentFixture<RenderedMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderedMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderedMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
