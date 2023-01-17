import { Repositories } from './home/repository/repository.service';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AppState } from './app.service';
import { CategoriesComponent } from './categories/categories.component';
import { RepositoryComponent } from './home/repository';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RepositoryComponent,
    CategoriesComponent,
    PrivacyStatementComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [
    AppState,
    Repositories
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
