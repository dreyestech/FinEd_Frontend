import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators {
    //custom method to not contain space must take typ AbstractControl b/c validators inherit from there
    //b/c static method call UsernameValidators.cannotContainSpace from outside this ts file no ()
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        //return error if white space (' ') is greater than 0 
        if((control.value as string).indexOf(' ')>=0)
            return { cannotContainSpace: true };

        return null;
    }
    //calling server to get info is an asynchronous operation
    //server called behind the scenes and displayed when ready but does not block user
    static shouldBeUnique(control: AbstractControl) : ValidationErrors | null {
        //return error if the below if error is true
        if (control.value==='testname')
            return {shouldBeUnique: true}
        
        return null;
    }
}

