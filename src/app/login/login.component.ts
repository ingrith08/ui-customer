import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { LoginService } from './login.service';
import {AES} from 'crypto-js';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formData;
  formButtonDisabled = false;
  hide = true;
  error = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
    this.formData = this.buildForm(formBuilder);
  }

  get userName() {return this.formData.get('userName'); }
  get password() {return this.formData.get('password'); }

  buildForm(formBuilder: FormBuilder): FormGroup {
    const controlsConfig = {
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
    return formBuilder.group(controlsConfig);
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formButtonDisabled = true;
    this.loginService.login({
      userName: this.userName.value,
      password: AES.encrypt(this.password.value, environment.cryptoJSKey).toString(),
    })
    .pipe(
      finalize(() => {
        this.formButtonDisabled = false;
      })
    )
    .subscribe(() => {
      this.router.navigate([`../customers/${this.password.value}`], { relativeTo: this.route });
    }, (error) => {
      this.error = true;
    });
  }

}
