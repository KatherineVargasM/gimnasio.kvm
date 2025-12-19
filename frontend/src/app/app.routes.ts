import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { SociosComponent } from './components/socios/socios';
import { ClasesComponent } from './components/clases/clases';
import { MembresiasComponent } from './components/membresias/membresias';
import { PagosComponent } from './components/pagos/pagos';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'socios', component: SociosComponent },
    { path: 'clases', component: ClasesComponent },
    { path: 'membresias', component: MembresiasComponent },
    { path: 'pagos', component: PagosComponent }
];