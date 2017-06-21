import { Directive, OnInit, Inject, ElementRef, Input} from '@angular/core'
import { JQ_TOKEN } from "./jQuery.service"

@Directive({
    selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {
    private nativeElement: HTMLElement
    //Aliasing because dashes arent alowed in variable names
    @Input('modal-trigger') elementId: string 

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any){
        this.nativeElement = ref.nativeElement
    }

    ngOnInit() {
        this.nativeElement.addEventListener('click', e=> {
            //The object passed into modal are settings being passed to JQuery
            
            //Or the old busted way, this works too
            // this.$('#'+this.elementId).modal({})

            //An "es6 interpolation string"
            this.$(`#${this.elementId}`).modal({})
        })
    }
}

