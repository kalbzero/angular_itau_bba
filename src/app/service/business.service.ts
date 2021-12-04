import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBusiness } from '../interfaces/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private business: IBusiness[] = [
    {
      id: 1,
      name: 'Itaú BBA',
      business: 'Financial Center',
      valuation: 850000000.50,
      active: true,
      cep: '92000000',
      cnpj: 20877633000112,
    },
    {
      id: 2,
      name: 'Itaú Ceic',
      business: 'Centro Empresarial Itaú',
      valuation: 54000000.45,
      active: true,
      cep: '92000000',
      cnpj: 20877633000112,
    },
    {
      id: 3,
      name: 'Cubo Itaú',
      business: 'Startups Center',
      valuation: 22000000000.20,
      active: true,
      cep: '92000000',
      cnpj: 20877633000112,
    },
    {
      id: 4,
      name: 'Itaú disabled',
      business: 'Polo Fake',
      valuation: 0.00,
      active: false,
      cep: '92000000',
      cnpj: 20877633000112,
    }
  ];

  constructor() { }

  getBusinessList(): Observable<IBusiness[]> {
    return of(this.business);
  }
}
