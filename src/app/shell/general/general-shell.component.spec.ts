import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralShellComponent } from './general-shell.component';

describe('GeneralShellComponent', () => {
  let component: GeneralShellComponent;
  let fixture: ComponentFixture<GeneralShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralShellComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
