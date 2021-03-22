import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VBarChartComponent } from './v-bar-chart.component';

describe('VBarChartComponent', () => {
  let component: VBarChartComponent;
  let fixture: ComponentFixture<VBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
