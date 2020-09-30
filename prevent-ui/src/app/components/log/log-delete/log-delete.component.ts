import { Router, ActivatedRoute } from "@angular/router";
import { LogService } from "../log.service";
import { Log } from "../log.model";
import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import {formatDate} from "@angular/common";

@Component({
  selector: "app-log-delete",
  templateUrl: "./log-delete.component.html",
  styleUrls: ["./log-delete.component.css"],
})
export class LogDeleteComponent implements OnInit {

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
    const id = +this.route.snapshot.paramMap.get('id');
    this.logService.readById(id).subscribe((log) => {
      this.log = log;
      this.datetime = formatDate(this.log.data,'yyyy-MM-dd HH:mm:ss.SSS', 'pt-br', '-300');
    });
  }

  deleteLog(): void {
    this.logService.delete(this.log.id).subscribe(() => {
      this.logService.showMessage("Log excluido com sucesso!");
      this.router.navigate(["/logs"]);
    });
  }

  cancel(): void {
    this.router.navigate(["/logs"]);
  }
}
