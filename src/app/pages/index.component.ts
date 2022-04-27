import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'index',
    template: `
        <app-navbar></app-navbar>
        <router-outlet></router-outlet>
    `,
})

export class IndexComponent implements OnInit {
    ngOnInit(): void {
        
    }
    
}
