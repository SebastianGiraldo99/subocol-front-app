import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { WeatherComponent } from './components/weather/weather.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'login', component : LoginComponent},
    {path: 'weather', component : WeatherComponent, canActivate: [authGuard]},
    {path: '**', redirectTo: '/login'},
];
