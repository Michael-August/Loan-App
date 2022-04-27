import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IndexComponent } from "./pages/index.component";

const appRoute: Routes = [
    { path: '', redirectTo: 'authentication', pathMatch: 'full' },
    { path: 'authentication', loadChildren: () => import('./auths/auth.module').then(mod => mod.AuthModule) },
    { 
        path: 'Authenticated',
        component: IndexComponent,
        children: [
            { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(mod => mod.DashboardModule) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoute, {
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ],
    providers: []
})

export class AppRoutingModule { }