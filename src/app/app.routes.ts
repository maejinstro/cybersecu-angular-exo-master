import { Routes } from '@angular/router';
import { adminGuard } from '../guards/admin-guard';
import { userGuard } from '../guards/user-guard';

export const routes: Routes = [
    { path : '' , loadComponent: () => import('../features/home/home').then(c => c.Home)},
    { path : 'login' , loadComponent: () => import('../features/auth-feature/login/login').then(c => c.Login)},
    { path : 'register' , loadComponent: () => import('../features/auth-feature/register/register').then(c => c.Register)},
    { path : 'user-details/:id', canActivate: [userGuard] , loadComponent: () => import('../features/user/user-details/user-details').then(c => c.UserDetails)},
    { path : 'user-update/:id', canActivate: [userGuard] , loadComponent: () => import('../features/user/user-update/user-update').then(c => c.UserUpdate)},
    { path : 'item-list' , loadComponent: () => import('../features/item-feature/item-list/item-list').then(c => c.ItemList)},
    { path : 'item-add' , canActivate: [adminGuard], loadComponent: () => import('../features/item-feature/item-add/item-add').then(c => c.ItemAdd)},
    { path : 'item-details/:id' , loadComponent: () => import('../features/item-feature/item-details/item-details').then(c => c.ItemDetails)},
    { path : 'item-update/:id' , canActivate: [adminGuard], loadComponent: () => import('../features/item-feature/item-update/item-update').then(c => c.ItemUpdate)},
    { path : '**' , loadComponent: () => import('../features/home/home').then(c => c.Home)},
    { path : 'contact' , canActivate : [userGuard], loadComponent : () => import('../features/contact-feature/contact-add/contact-add').then(c=>c.ContactAdd)}
    { path : 'list', canActivate : [adminGuard], loadComponent : () => import('../features/contact-feature/contact-list/contact-list').then(c => c.ContactList)}
];
