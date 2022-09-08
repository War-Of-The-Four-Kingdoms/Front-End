import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestturnComponent } from './testturn.component';

describe('TestturnComponent', () => {
  let component: TestturnComponent;
  let fixture: ComponentFixture<TestturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
