import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { NoContent } from './no-content';

export const ROUTES: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path: '**', component: NoContent },
];
