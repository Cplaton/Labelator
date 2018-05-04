import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateSeedFactory() {
  return (c: FormControl) => {
    console.log("str = "+c.value);
    if (c.value=="" || c.value==null)
      return null
    let real
    try{
      real = atob(c.value);
    }
    catch(e) {
      console.log(e);
      return {
        validateSeed: false
      };
    }
    console.log("réelle = "+real);
    let SEED_REGEXP = /(hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\);){3}(hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\))/g;
    console.log("regex = "+SEED_REGEXP.test(real));
    console.log("returning = "+{
      validateSeed:(SEED_REGEXP.test(real) ? true : false)
    });
    return (SEED_REGEXP.test(real) ? null : {
      validateSeed: false
    });
  };
}

@Directive({
  selector: '[validateSeed][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => SeedValidator), multi: true }
  ]
})
export class SeedValidator {

  validator: Function;

  constructor() {
    this.validator = validateSeedFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}
