import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutinitComponent } from './routinit.component';

describe('RoutinitComponent', () => {
  let component: RoutinitComponent;
  let fixture: ComponentFixture<RoutinitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutinitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutinitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
