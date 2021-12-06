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

  /**
   * Para evitar o alerta 'Not all code paths return a value' adicionei uma variável para armazenar o objeto.
   * Pois não é muito recomendado pela comunidade do stackOverFlow mudar a regra no arquivo tsconfig para '"noImplicitReturns": false,'.
   *
   * Por algum motivo, o id estava vindo 'string' mesmo tipando para 'number' e o if sempre dava false, pois comparava number com string. Então deixei string e usei o parseInt no IF.
   *
   * @param id identificador do objeto Business
   * @returns o objeto business com o id igual ao recebido no parâmetro
   */
  getBusinessById(id: string): Observable<IBusiness> {
    let objBusiness: IBusiness = {} as IBusiness;
    this.business.forEach((b: IBusiness) => {
      if (b.id === parseInt(id)) {
        objBusiness = b;
      }
    });
    return of(objBusiness);
  }

  /**
   * Criei uma variasvel auxiliar para evitar o alerta citado acima
   *
   * @param obj Objeto do tipo Business
   * @returns o objeto salvo
   */
  setBusiness(obj: IBusiness): Observable<IBusiness> {
    let objBusiness: IBusiness = {} as IBusiness;
    this.business.forEach((b: IBusiness) => {
      if (b.id === obj.id) {
        let index = this.business.indexOf(b);
        this.business[index] = obj;
        objBusiness = obj;
      }
    });
    return of(objBusiness);
  }
}
