import { Routes } from '@angular/router';

import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { PrivacyStatementComponent } from './privacy-statement/privacy-statement.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'privacy-statement', component: PrivacyStatementComponent },
    { path: '**', component: NoContentComponent },
];
