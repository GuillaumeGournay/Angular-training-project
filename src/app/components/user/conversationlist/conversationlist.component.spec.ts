import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationlistComponent } from './conversationlist.component';

describe('ConversationlistComponent', () => {
  let component: ConversationlistComponent;
  let fixture: ComponentFixture<ConversationlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
