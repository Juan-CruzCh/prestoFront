import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarLectura } from './realizar-lectura';

describe('RealizarLectura', () => {
  let component: RealizarLectura;
  let fixture: ComponentFixture<RealizarLectura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarLectura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarLectura);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
