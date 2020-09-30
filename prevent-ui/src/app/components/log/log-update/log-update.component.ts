import { Log } from "../log.model";
import { Router, ActivatedRoute } from "@angular/router";
import { LogService } from "../log.service";
import { Component, OnInit } from "@angular/core";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-log-update",
  templateUrl: "./log-update.component.html",
  styleUrls: ["./log-update.component.css"],
})
export class LogUpdateComponent implements OnInit {

  public datetime = '';
  log: Log = {
    data: '',
    ip: '',
    request: '',
    status: '',
    useragent: ''
  }

  constructor(
    private logService: LogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.logService.readById(id).subscribe((log) => {
      this.log = log;
      this.datetime = formatDate(this.log.data,'yyyy-MM-ddTHH:mm:ss', 'pt-br', '-300');
    });
  }

  updateLog(): void {
    if(this.logService.emptyObject(this.log)==0) {
       this.log.data = this.datetime;
       this.logService.update(this.log).subscribe(() => {
        this.logService.showMessage("Log atualizado com sucesso!");
        this.router.navigate(["/logs"]);
       });
    }else{
      this.logService.showMessage('Os campos marcados com asterisco(*) são de preenchimento obrigatório.');
    }
  }

  cancel(): void {
    this.router.navigate(["/logs"]);
  }

}
