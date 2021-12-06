import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { IBusiness } from 'src/app/interfaces/business';
import { BusinessService } from 'src/app/service/business.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { CepService } from 'src/app/service/cep.service';
import { Endereco } from 'src/app/interfaces/endereco';
import { MessageService } from 'src/app/service/message.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public business: IBusiness = {} as IBusiness;
  public idBusiness: string = '';
  public options = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];

  businessForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    business: new FormControl('', [Validators.required]),
    valuation: new FormControl(0, [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    cep: new FormControl(null, [Validators.required]),
    active: new FormControl(false, [Validators.required]),

    rua: new FormControl({ value: '', disabled: true }),
    bairro: new FormControl({ value: '', disabled: true }),
    estado: new FormControl({ value: '', disabled: true }),
    cidade: new FormControl({ value: '', disabled: true }),
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private location: Location,
    private cepService: CepService,
    private messageService: MessageService,
  ) {
    this.idBusiness = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getBusiness();
  }

  getBusiness() {
    this.businessService.getBusinessById(this.idBusiness).subscribe({
      next: (business: IBusiness) => {
        if (Object.keys(business).length === 0) {
          // Caso não exista o objeto, manda para a PageNotFound
          this.router.navigateByUrl('/404', { skipLocationChange: true })
        } else {
          this.business = business;
          this.businessForm.patchValue({
            id: business.id,
            name: business.name,
            business: business.business,
            valuation: business.valuation,
            active: business.active,
            cep: business.cep,
            cnpj: business.cnpj,
          });
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }

  getCepInfos() {
    if (this.businessForm.controls['cep'].value.length == 8) {
      this.cepService.getCepInfos(this.businessForm.controls['cep'].value).subscribe({
        next: (endereco: Endereco) => {
          if (endereco.erro) {
            this.messageService.showError({ title: 'CEP Error', message: 'CEP não encontrado' });
          } else {
            this.messageService.showSucess({ title: 'CEP Encontrado', message: 'CEP encontrado com sucesso!' });
            this.businessForm.patchValue({
              rua: endereco.logradouro,
              bairro: endereco.bairro,
              cidade: endereco.localidade,
              estado: endereco.uf,
            });
          }
        }
      });
    }
  }

  onSubmit() {
    console.log(this.businessForm.valid, this.businessForm.value)
    if (this.businessForm.valid) {

      // Pegar apeans as informações que precisam ser salvas
      const obj: IBusiness = {
        id: this.businessForm.controls['id'].value,
        name: this.businessForm.controls['name'].value,
        business: this.businessForm.controls['business'].value,
        valuation: this.businessForm.controls['valuation'].value,
        active: this.businessForm.controls['active'].value,
        cep: this.businessForm.controls['cep'].value,
        cnpj: this.businessForm.controls['cnpj'].value,
      }

      this.businessService.setBusiness(obj).subscribe({
        next: (response: IBusiness) => {
          if (response === {} as IBusiness) {
            this.messageService.showWarning({ title: 'Business Alert', message: 'Pólo não encontrado na lista' });
          } else {
            this.messageService.showSucess({ title: 'Business Success', message: 'Pólo atualizado com sucesso!' });
          }
          this.router.navigateByUrl('');
        }
      });
    }
  }
}
