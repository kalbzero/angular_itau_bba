import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBusiness } from 'src/app/interfaces/business';
import { BusinessService } from 'src/app/service/business.service';

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
    cep: new FormControl(0, [Validators.required]),
    active: new FormControl(false, [Validators.required]),
  });

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
        }
      }
    });
  }

  goBack() {
    this.location.back();
  }

  onSubmit() {

  }
}
