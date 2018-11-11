import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyridepostingComponent } from './myrideposting.component';

describe('MyridepostingComponent', () => {
  let component: MyridepostingComponent;
  let fixture: ComponentFixture<MyridepostingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyridepostingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyridepostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
