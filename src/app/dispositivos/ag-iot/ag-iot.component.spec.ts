import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgIotComponent } from './ag-iot.component';

describe('AgIotComponent', () => {
  let component: AgIotComponent;
  let fixture: ComponentFixture<AgIotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgIotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgIotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
