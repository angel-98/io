import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgDispComponent } from './ag-disp.component';

describe('AgDispComponent', () => {
  let component: AgDispComponent;
  let fixture: ComponentFixture<AgDispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgDispComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgDispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
