import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersConfigComponent } from './trainers-config.component';

describe('TrainersConfigComponent', () => {
  let component: TrainersConfigComponent;
  let fixture: ComponentFixture<TrainersConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainersConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
