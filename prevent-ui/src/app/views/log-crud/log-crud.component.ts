import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-log-crud',
  templateUrl: './log-crud.component.html',
  styleUrls: ['./log-crud.component.css']
})
export class LogCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Cadastro de Logs',
      icon: 'list',
      routeUrl: '/logs'
    }
  }

  ngOnInit(): void {
  }

  navigateToLogCreate(): void {
    this.router.navigate(['/logs/create'])
  }

}
