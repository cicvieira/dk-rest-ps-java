import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/template/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';

import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatCardModule } from  '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './views/home/home.component';
import { LogCrudComponent } from './views/log-crud/log-crud.component';
import { LogCreateComponent } from './components/log/log-create/log-create.component';
import { MatButtonModule } from  '@angular/material/button';
import { MatSnackBarModule } from  '@angular/material/snack-bar';
import { HttpClientModule } from  '@angular/common/http';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LogReadComponent } from './components/log/log-read/log-read.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RedDirective } from './directives/red.directive';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from  '@angular/common';
import { ForDirective } from './directives/for.directive';
import { LogUpdateComponent } from './components/log/log-update/log-update.component';
import { LogDeleteComponent } from './components/log/log-delete/log-delete.component';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from "@angular/material/datepicker";

import { MatIconModule } from '@angular/material/icon';
import { UploadlogComponent }  from './views/uploadlog/uploadlog.component';
//import { MultiFileUploadComponent } from './multi-file-upload/multi-file-upload.component';
//import { DownloadComponent } from './download/download.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressBarModule } from '@angular/material/progress-bar';

registerLocaleData(localePt);

const appRoutes: Routes = [
  {path: '', component: UploadlogComponent, pathMatch: 'full'},
  //{path: 'multi-upload', component: MultiFileUploadComponent},
  //{path: 'download', component: DownloadComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    LogCrudComponent,
    LogCreateComponent,
    LogReadComponent,
    RedDirective,
    ForDirective,
    LogUpdateComponent,
    LogDeleteComponent,
    UploadlogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatDatepickerModule,
    FlexLayoutModule,
    MatProgressBarModule,
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
