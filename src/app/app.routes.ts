import { Routes } from '@angular/router';
import { CryptocurrencyListComponent } from './modules/cryptocurrency/pages/cryptocurrency-list/cryptocurrency-list.component';
import { CryptocurrencyFormComponent } from './modules/cryptocurrency/pages/cryptocurrency-form/cryptocurrency-form.component';

export const routes: Routes = [
    {
        path: 'cryptocurrency',
        component:CryptocurrencyListComponent,
    },
    {
        path: 'cryptocurrency/:id',
        component:CryptocurrencyFormComponent,
    },
    { path: '',   redirectTo: '/cryptocurrency', pathMatch: 'full' }
];
