import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeAreaComponent } from './tree-area.component';

describe('TreeAreaComponent', () => {
  let component: TreeAreaComponent;
  let fixture: ComponentFixture<TreeAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreeAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
