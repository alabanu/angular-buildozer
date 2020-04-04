import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatGroupCardComponent } from './chat-group-card.component';


describe('GroupCharCardComponent', () => {
  let component: ChatGroupCardComponent;
  let fixture: ComponentFixture<ChatGroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChatGroupCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
