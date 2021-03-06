import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { submitForm } from '../../services/api';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class WizardComponent implements OnInit {
  userForm: FormGroup;
  step: number;
  consent: boolean;
  formData: Object;
  formSubmited: boolean;
  formSending: boolean;
  formSuccess: boolean;

  passPattern = '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,24}';

  constructor(public formBuilder: FormBuilder) {
    this.step = 1;
    this.consent = false;
    this.formSubmited = false;
    this.formSending = false;
    this.formSuccess = false;
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        pass: ['', [Validators.required, Validators.pattern(this.passPattern)]],
        repass: ['', [Validators.required]],
        hint: ['', [Validators.maxLength(255)]],
      },
      { validator: this.passwordMatch }
    );
  }

  passwordMatch(frm: FormGroup) {
    return frm.controls['pass'].value === frm.controls['repass'].value
      ? null
      : { mismatch: true };
  }

  get getControl() {
    return this.userForm.controls;
  }

  nextStep() {
    if (this.step < 3) this.step += 1;
  }

  previousStep() {
    if (this.step > 1) this.step -= 1;
  }

  restart() {
    this.step = 1;
  }

  async onSubmit() {
    this.formSubmited = true;
    if (!this.userForm.valid) {
      return;
    }
    this.formSending = true;
    let result;
    try {
      const result = await submitForm(
        this.userForm.controls.pass.value,
        this.userForm.controls.repass.value,
        this.userForm.controls.hint.value
      );
      this.formSending = false;
      console.log(result);

      if (result.status === 200) {
        this.formSuccess = true;
        this.step += 1;
      }
    } catch (e) {
      this.formSending = false;
      this.formSuccess = false;
      this.step += 1;
    }
  }
}
