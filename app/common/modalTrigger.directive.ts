import { Directive, OnInit, Inject, ElementRef} from '@angular/core'
import { JQ_TOKEN } from "./jQuery.service"

@Directive({
    selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit {
    private nativeElement: HTMLElement

    constructor(ref: ElementRef, @Inject(JQ_TOKEN) private $: any){
        this.nativeElement = ref.nativeElement
    }

    ngOnInit() {
        this.nativeElement.addEventListener('click', e=> {
            //The object passed into modal are settings being passed to JQuery
            this.$('#simple-modal').modal({})
        })
    }
}

