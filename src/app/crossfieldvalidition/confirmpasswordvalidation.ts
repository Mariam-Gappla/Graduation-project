import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function confirmPassword():ValidatorFn
{
    return (controle:AbstractControl):ValidationErrors|null=>{
        const confirmPassword =controle.get('confirmPassword')?.value;
         const password = controle.get('password')?.value;
         // console.log("password",password);
         // console.log("confirmpassword",confirmPassword)
        if(confirmPassword !== password)
        {
            return { confirm: { password: "Password and confirm password do not match" } }
        }
        return null;
    }
}
