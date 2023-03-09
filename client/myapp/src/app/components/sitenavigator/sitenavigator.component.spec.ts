import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitenavigatorComponent } from './sitenavigator.component';

describe('SitenavigatorComponent', () => {
  let component: SitenavigatorComponent;
  let fixture: ComponentFixture<SitenavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitenavigatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitenavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
