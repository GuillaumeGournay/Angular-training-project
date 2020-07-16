import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderAddComponent } from './gender-add.component';

describe('GenderAddComponent', () => {
  let component: GenderAddComponent;
  let fixture: ComponentFixture<GenderAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenderAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
