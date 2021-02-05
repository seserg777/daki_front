import { AbstractControl, FormGroup } from '@angular/forms';
import { KeyValueInterface } from '../interfaces/key-value.interface';

export class CustomValidator {
    public static emailValidator(email: AbstractControl): KeyValueInterface<boolean> | null {
        if (email.pristine) {
           return null;
        }
        const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        email.markAsTouched();
        if (EMAIL_REGEXP.test(email.value)) {
           return null;
        }
        return {
           invalidEmail: true
        };
    }
    // Validates URL
    public static urlValidator(url: AbstractControl): KeyValueInterface<boolean> | null {
       if (url.pristine) {
          return null;
       }
       const URL_REGEXP = /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
       url.markAsTouched();
       if (URL_REGEXP.test(url.value)) {
          return null;
       }
       return {
          invalidUrl: true
       };
    }

    // Validates passwords
    public static matchPassword(group: FormGroup): KeyValueInterface<boolean> | null {
       const password = group.controls.password;
       const confirm = group.controls.confirm;
       if (password.pristine || confirm.pristine) {
          return null;
       }
       group.markAsTouched();
       if (password.value === confirm.value) {
          return null;
       }
       return {
          invalidPassword: true
       };
    }

    // Validates numbers
    public static numberValidator(number: AbstractControl): KeyValueInterface<boolean> | null {
       if (number.pristine) {
          return null;
       }
       const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/;
       number.markAsTouched();
       if (NUMBER_REGEXP.test(number.value)) {
          return null;
       }
       return {
          invalidNumber: true
       };
    }
    // Validates US SSN
    public static ssnValidator(ssn: AbstractControl): KeyValueInterface<boolean> | null {
       if (ssn.pristine) {
          return null;
       }
       const SSN_REGEXP = /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/;
       ssn.markAsTouched();
       if (SSN_REGEXP.test(ssn.value)) {
          return null;
       }
       return {
          invalidSsn: true
       };
    }
    // Validates US phone numbers
    public static phoneValidator(number: AbstractControl): KeyValueInterface<boolean> | null {
       if (number.pristine) {
          return null;
       }
       const PHONE_REGEXP = /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
       number.markAsTouched();
       if (PHONE_REGEXP.test(number.value)) {
          return null;
       }
       return {
          invalidNumber: true
       };
    }
    // Validates zip codes
    public static zipCodeValidator(zip: AbstractControl): KeyValueInterface<boolean> | null {
       if (zip.pristine) {
          return null;
       }
       const ZIP_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/;
       zip.markAsTouched();
       if (ZIP_REGEXP.test(zip.value)) {
          return null;
       }
       return {
          invalidZip: true
       };
    }
}
