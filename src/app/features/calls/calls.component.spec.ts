import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CallsComponent } from './calls.component';
import { AvatarComponent } from '../../shared/avatar/avatar.component';
import { AvatarUrlPipe } from '../../shared/avatar-url.pipe';

describe('CallsComponent', () => {
  let component: CallsComponent;
  let fixture: ComponentFixture<CallsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallsComponent, AvatarComponent, AvatarUrlPipe],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
