import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { AppState } from './app.service';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { RepositoryComponent } from './home/repository';
import { Repositories } from './home/repository/repository.service';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';

// import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
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
    RouterModule.forRoot(ROUTES, { useHash: false }),
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
