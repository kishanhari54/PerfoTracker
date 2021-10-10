import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserCreateComponent } from './new-user-create.component';

describe('NewUserCreateComponent', () => {
  let component: NewUserCreateComponent;
  let fixture: ComponentFixture<NewUserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
