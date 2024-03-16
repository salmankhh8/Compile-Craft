import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonacoCodeComponent } from './monaco-code.component';

describe('MonacoCodeComponent', () => {
  let component: MonacoCodeComponent;
  let fixture: ComponentFixture<MonacoCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonacoCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonacoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
