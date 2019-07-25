import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersCreatedComponent } from './orders-created.component';

describe('OrdersCreatedComponent', () => {
  let component: OrdersCreatedComponent;
  let fixture: ComponentFixture<OrdersCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
