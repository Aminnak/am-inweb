import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule , FormBuilder ,FormGroup , Validators, AbstractControlOptions} from "@angular/forms";
import { passValidator , confirmPassword} from '../../shared/Validations';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router , RouterModule } from '@angular/router';
import { user_data } from '../../app.component';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule , RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
    user? : user_data ;
    Form! : FormGroup;
    errorMsg! : any ;


    constructor(
        private formBuilder : FormBuilder,
        private router : Router,
        private userService : UserService,
        private authService : AuthService
    ){}


    ngOnInit(): void {
        this.Form = this.formBuilder.group(
                {
                    full_name : ['',[Validators.required,Validators.minLength(4),Validators.pattern(/^(?=((.*[A-Za-z]){4})[A-Za-z0-9])/)]],
                    password : ['',[Validators.required,passValidator]],
                    confirm_password : ['',[Validators.required]],
                    postal_code : ['',[Validators.pattern(/^\d{10}$/)]],
                    email : ['',[Validators.required,Validators.email]],
                    telephone_number : ['',[Validators.pattern(/^09\d{9}$/)]]
                },
                {
                    validators : confirmPassword()
                } as AbstractControlOptions
        )
    }

    submitForm(){
        const registerFormData = this.Form.value
        this.authService.createUser(registerFormData)
            .subscribe ({
                next : res => {
                    this.userService.setUser(res.user)
                    this.authService.saveTokens(res.access , res.refresh)
                    this.router.navigate(['/home'])
                },
                error : err => {
                    this.errorMsg = err.error.message
                }
            })

    }
}
