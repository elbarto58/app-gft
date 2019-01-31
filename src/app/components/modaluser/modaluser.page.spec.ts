import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaluserPage } from './modaluser.page';

describe('ModaluserPage', () => {
  let component: ModaluserPage;
  let fixture: ComponentFixture<ModaluserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaluserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaluserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
