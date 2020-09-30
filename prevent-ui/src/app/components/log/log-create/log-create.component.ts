import { Log } from '../log.model';
import { LogService } from '../log.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-create',
  templateUrl: './log-create.component.html',
  styleUrls: ['./log-create.component.css']
})
export class LogCreateComponent implements OnInit {

  log: Log = {
    data: '',
    ip: '',
    request: '',
    status: '',
    useragent: ''
  }

  constructor(private logService: LogService,
      private router: Router) { }

  ngOnInit(): void {

  }

  createLog(): void {
    if(this.logService.emptyObject(this.log)==0) {

      console.log(this.log.data);

      this.logService.create(this.log).subscribe(() => {
        this.logService.showMessage('Log criado!')
        this.router.navigate(['/logs'])
      });
    }else{
      this.logService.showMessage('Os campos marcados com asterisco(*) são de preenchimento obrigatório.');
    }
  }

  cancel(): void {
    this.router.navigate(['/logs'])
  }

}
