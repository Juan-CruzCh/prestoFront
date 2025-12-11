import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedidorMoroso } from './medidor-moroso';

describe('MedidorMoroso', () => {
  let component: MedidorMoroso;
  let fixture: ComponentFixture<MedidorMoroso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedidorMoroso]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedidorMoroso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
