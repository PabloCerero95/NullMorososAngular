import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMorosoComponent } from './add-moroso.component';

describe('AddMorosoComponent', () => {
  let component: AddMorosoComponent;
  let fixture: ComponentFixture<AddMorosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMorosoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMorosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
