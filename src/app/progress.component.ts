import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-progress',
    template: `
        <div class="stepper">
            <div class="circle" [class]="{'done': firstStage}"><h3 *ngIf="step === 1">1</h3><i class="fa fa-check fa-2x" *ngIf="SecondStage === true"></i></div>
            <div class="line" [class]="{'done': firstStage}"></div>
            <div class="circle" [class]="{'done': SecondStage}"><h3>2</h3><i class="fa fa-check fa-2x" *ngIf="thirdStage === true"></i></div>
            <div class="line" [class]="{'done': SecondStage}"></div>
            <div class="circle" [class]="{'done': thirdStage}"><h3 >3</h3><i class="fa fa-check fa-2x" *ngIf="fourthStage === true"></i></div>
            <div class="line" [class]="{'done': thirdStage}"></div>
            <div class="circle" [class]="{'done': fourthStage}"><h3 >4</h3><i class="fa fa-check fa-2x" *ngIf="fifthStage === true"></i></div>
            <div class="line" [class]="{'done': fourthStage}"></div>
            <div class="circle" [class]="{'done': fifthStage}"><h3 >5</h3><i class="fa fa-check fa-2x" *ngIf="sixthStage === true"></i></div>
            <div class="line" [class]="{'done': fifthStage}"></div>
            <div class="circle" [class]="{'done': sixthStage}"><h3 >6</h3><i class="fa fa-check fa-2x" *ngIf="step === 6"></i></div>
        </div>
    `,
    styles: [`
        .stepper {
            margin-top: 100%;
        }

        .circle {
            width: 1rem;
            height: 1rem;
            background: transparent;
            border-radius: 100%;
            border: 1px solid white;
            padding: 70%;
            position: relative;
        }

        .line {
            width: .1rem;
            height: 2.5rem;
            background: grey;
            margin-left: .7rem;
        }

        .fa {
            font-size: 16px;
            /* font-weight: 300; */
            position: absolute;
            top: 20%;
            left: 18%;
        }

        h3 {
            font-size: 14px;
            font-weight: 300;
            position: absolute;
            top: 18%;
            left: 27%;
        }

        .done {
            background: green;
            color: white;
            border: none;
        }
    `]
})

export class ProgressComponent implements OnInit {
    @Input() step: number | undefined
    @Input() firstStage: boolean | undefined
    @Input() SecondStage: boolean | undefined
    @Input() thirdStage: boolean | undefined
    @Input() fourthStage: boolean | undefined
    @Input() fifthStage: boolean | undefined
    @Input() sixthStage: boolean | undefined

    ngOnInit(): void {
        
    }
    
}
