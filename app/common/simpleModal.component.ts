import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core'
import { JQ_TOKEN } from './jQuery.service'
@Component({
    //Notice the angular 2 local ref of #modalContainer!
    selector: 'simple-modal',
    template: `
        <div id="{{elementId}}" #modalContainer class="modal fade"  tabindex="1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"> <span>&times;</span> </button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal.body" (click)="closeModal()">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .modal-body { height: 250px; overflow-y: scroll;}
    `]

    // Trevis, note that the 'select=' element can also take '.' and '#' style selectors
})

export class SimpleModalComponent {

    @Input() title: string
    @Input() elementId: string
    @ViewChild('modalContainer') containerElementRef: ElementRef


    closeModal() {
        console.log("Hm?")
        this.$(this.containerElementRef.nativeElement).modal('hide')
    }

    constructor(@Inject(JQ_TOKEN) private $:any) {

    }



}