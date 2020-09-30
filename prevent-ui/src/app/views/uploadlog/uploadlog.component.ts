import { Component, OnInit } from '@angular/core'
import { HeaderService } from "../../components/template/header/header.service";
import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { tap} from 'rxjs/operators';
import { FileService } from '../file.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-uploadlog',
  templateUrl: './uploadlog.component.html',
  styleUrls: ['./uploadlog.component.css']
})

export class UploadlogComponent implements OnInit {

  loaded = 0;
  selectedFiles: FileList;
  currentFileUpload: File;

  ngOnInit(): void {
  }

  constructor(private headerService: HeaderService,
              private http: HttpClient,
              private fileService: FileService,
              private snackBar: MatSnackBar) {
    headerService.headerData = {
      title: 'Upload Logs',
      icon: 'cloud_upload',
      routeUrl: ''
    }
  }

  // Selected file is stored into selectedFiles.
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // Uploads the file to backend server.
  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.fileService.uploadSingleFile(this.currentFileUpload)
      .pipe(tap(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.loaded = Math.round(100 * event.loaded / event.total);
        }
      })).subscribe(event => {
      if (event instanceof HttpResponse) {
        this.snackBar.open('Arquivo carregado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.fileService.fetchFileNames();
      }
    });
  }
}

