import { Component } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  addressForm !: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      countries: this.formBuilder.array([]),
    });
  }

  // Convenience getter to access countries FormArray
  get countries() {
    return this.addressForm.get('countries') as FormArray;
  }

  addCountry() {
    const countryGroup = this.formBuilder.group({
      countryName: ['', Validators.required],
      room: [''],
      building: [''],
      village: [''],
      dist: [''],
      state: [''],
      country: [''],
      planet: [''],
      solarSystem: [''],
      galaxy: [''],
    });

    this.countries.push(countryGroup);
  }

  removeCountry(index: number) {
    this.countries.removeAt(index);
  }

  onSubmit() {
    if (this.addressForm.valid) {
      // Handle form submission here
      console.log(this.addressForm.value);
      localStorage.setItem("form", JSON.stringify(this.addressForm.value))
    } else {
      // Handle form validation errors
      alert('Please fill in all required fields.');
    }
  }

  pathcValue(){
    let value = JSON.parse(localStorage.getItem("form") || '')
    this.addressForm.patchValue(value)
  }
}
