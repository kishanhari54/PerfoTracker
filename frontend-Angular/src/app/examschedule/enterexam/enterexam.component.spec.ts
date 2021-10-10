import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterexamComponent } from './enterexam.component';

describe('EnterexamComponent', () => {
  let component: EnterexamComponent;
  let fixture: ComponentFixture<EnterexamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterexamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterexamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
