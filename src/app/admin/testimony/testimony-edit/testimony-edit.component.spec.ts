import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyEditComponent } from './testimony-edit.component';

describe('TestimonyEditComponent', () => {
  let component: TestimonyEditComponent;
  let fixture: ComponentFixture<TestimonyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
