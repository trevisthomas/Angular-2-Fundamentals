import { Directive } from '@angular/core'
import {  Validator, FormGroup, NG_VALIDATORS } from '@angular/forms'

@Directive({
    selector:  '[validateLocation]',
    //The funky 'multi' thing is so that we can add a new validator to the list of validators, not replace!
    providers: [{provide: NG_VALIDATORS, useExisting: LocationValidator, multi: true}]
})
export class LocationValidator implements Validator {
    validate(formGroup: FormGroup): {[key: string]: any} {
         let addressControl = formGroup.controls['address']
         let cityControl = formGroup.controls['city']
         let countryControl = formGroup.controls['country']
         let onlineUrlControl = (<FormGroup>formGroup.root).controls['onlineUrl']

         if( (addressControl && addressControl.value 
         && cityControl && cityControl.value 
         && countryControl && countryControl.value) ||
          onlineUrlControl && onlineUrlControl.value) {

             console.log("good i guess")
             return null 
         } else {
             console.log("not good")
             return {validateLocation: false}
         }
    } 
    // registerOnValidatorChange(fn: () => void): void {
    //     throw new Error("Method not implemented.");
    // }

}