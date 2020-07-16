import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonyAddComponent } from './testimony-add.component';

describe('TestimonyAddComponent', () => {
  let component: TestimonyAddComponent;
  let fixture: ComponentFixture<TestimonyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestimonyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestimonyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
