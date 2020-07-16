import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsEditComponent } from './informations-edit.component';

describe('InformationsEditComponent', () => {
  let component: InformationsEditComponent;
  let fixture: ComponentFixture<InformationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
