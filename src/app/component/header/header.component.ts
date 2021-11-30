import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public username: string = 'John Doe';
  public office: string = 'Diretor Itaú BBA';
  constructor() { }

  ngOnInit(): void {
  }

}
