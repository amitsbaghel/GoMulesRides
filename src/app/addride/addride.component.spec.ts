import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrideComponent } from './addride.component';

describe('AddrideComponent', () => {
  let component: AddrideComponent;
  let fixture: ComponentFixture<AddrideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
