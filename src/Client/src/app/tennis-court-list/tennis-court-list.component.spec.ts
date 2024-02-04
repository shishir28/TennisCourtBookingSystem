import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisCourtListComponent } from './tennis-court-list.component';

describe('TennisCourtListComponent', () => {
  let component: TennisCourtListComponent;
  let fixture: ComponentFixture<TennisCourtListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TennisCourtListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TennisCourtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
