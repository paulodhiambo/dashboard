import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Tariff {
  chargeCode: string;
  minAmount: number;
  maxAmount: number;
  totalCharge: string;
  bankCommission: string;
  merchantCommission: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  effectiveDate: string;
  expiryDate: string;
  tariffList: Tariff[];
}

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-list.html',
})
export class ProductsList {
  products: Product[] = [
    {
      "id": 22,
      "code": "TestProduct4",
      "name": "Sample product",
      "effectiveDate": "2025-03-28",
      "expiryDate": "2025-04-11",
      "tariffList": [
        {
          "chargeCode": "BANK2BILL2",
          "minAmount": 1001,
          "maxAmount": 5000,
          "totalCharge": "350-Cash",
          "bankCommission": "0",
          "merchantCommission": "150-Cash"
        },
        {
          "chargeCode": "BANK2BILL2",
          "minAmount": 1001,
          "maxAmount": 5000,
          "totalCharge": "350-Cash",
          "bankCommission": "0",
          "merchantCommission": "150-Cash"
        }
      ]
    },
    {
      "id": 2,
      "code": "TestProduct2",
      "name": "Sample product",
      "effectiveDate": "2024-12-23",
      "expiryDate": "2024-12-23",
      "tariffList": [
        {
          "chargeCode": "COMMISSION.CODE::=DEBIT PLUS CHARGES,COMMISSION.TYPE:1:1=BIMOBISTAR",
          "minAmount": 1001,
          "maxAmount": 10000,
          "totalCharge": "400-CASH",
          "bankCommission": "0",
          "merchantCommission": "200-Cash"
        }
      ]
    }
  ];

  selectedProduct: Product | null = this.products[0];

  selectProduct(product: Product) {
    this.selectedProduct = product;
  }
}
