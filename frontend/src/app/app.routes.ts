import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { SociosComponent } from './components/socios/socios';
import { ClasesComponent } from './components/clases/clases';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'socios', component: SociosComponent },
    { path: 'clases', component: ClasesComponent }
];