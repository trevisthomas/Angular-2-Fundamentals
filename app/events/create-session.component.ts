import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { EventService } from './shared/event.service'
import { ISession, restrictedWords } from './index'

@Component({
    templateUrl: 'app/events/create-session.component.html',
    styles: [`
    em { float: right; color:#E05C65; padding-left:10px;}
    .error input {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999; }
    .error :-moz-placeholder { color: #999; }
    .error :-ms-input-placeholder { color: #999; }
  `]
})
export class CreateSessionComponent implements OnInit {

    name: FormControl
    presenter: FormControl
    duration: FormControl
    level: FormControl
    abstract: FormControl

    newSessionForm: FormGroup

    ngOnInit() {
        this.name = new FormControl('', Validators.required)
        this.presenter = new FormControl('', Validators.required)
        this.duration = new FormControl('', Validators.required)
        this.level = new FormControl('', Validators.required)
        //TREVIS Notie that multiple are an array!
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])])
        
        this.newSessionForm = new FormGroup(
            {
                name: this.name,
                presenter: this.presenter,
                duration: this.duration,
                level: this.level,
                abstract: this.abstract
            }
        )
    }

    // private restrictedWords(words) {
    //     return (control: FormControl): {[key: string] : any} => {
    //         // console.log(control.value)

    //         if(!words) { return null }

    //         var invalidWords = words
    //             .map(w => control.value.includes(w) ? w : null)
    //             .filter(w => w != null)

    //         return invalidWords && invalidWords.length > 0 ? 
    //             {'restrictedWords': invalidWords.join(',')} : null
    //     }
    // }

    saveSession(formValues){
        // console.log(formValues)

        //Remaping for type safty

        let session: ISession = {
            id: undefined, //clever
            name: formValues.name,
            presenter: formValues.presenter,
            duration: +formValues.duration, //Casting to a number
            level: formValues.level,
            abstract: formValues.abstract,
            voters: []
        }

        console.log(session)
    }
}