import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisCourtComponent } from './tennis-court.component';

describe('TennisCourtComponent', () => {
  let component: TennisCourtComponent;
  let fixture: ComponentFixture<TennisCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TennisCourtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TennisCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
