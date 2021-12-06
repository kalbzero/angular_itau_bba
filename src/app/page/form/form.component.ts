import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { IBusiness } from 'src/app/interfaces/business';
import { BusinessService } from 'src/app/service/business.service';
import { ErrorStateMatcher } from '@angular/material/core';

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

    // rua: new FormControl(''),
    // bairro: new FormControl(''),
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private businessService: BusinessService,
    private location: Location,
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

    }
  }

  onSubmit() {

  }
}
