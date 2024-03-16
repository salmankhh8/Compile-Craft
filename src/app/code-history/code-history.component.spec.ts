import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeHistoryComponent } from './code-history.component';

describe('CodeHistoryComponent', () => {
  let component: CodeHistoryComponent;
  let fixture: ComponentFixture<CodeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
