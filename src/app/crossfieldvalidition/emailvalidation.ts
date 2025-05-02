import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function email(emails:string[]):ValidatorFn
{
    return (controle:AbstractControl):ValidationErrors|null=>{
        let email=controle.get('email')?.value;
        let isexist=emails.includes(email);
        if(isexist)
        {
            return { exist: { email: "This email already exists" } }
        }
        return null;
    }
}
{

}