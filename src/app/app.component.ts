import { Component, OnInit } from "@angular/core";
import {
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  isDisabled: boolean = true;
  units!: any[];
  frameworks: any[] = [
    {
      framework: "Angular",
      versions: ["1.1.1", "1.2.1", "1.3.3"],
    },
    {
      framework: "Vue",
      versions: ["3.3.1", "5.2.1", "5.3.1"],
    },
    {
      framework: "React",
      versions: ["2.1.2", "5.2.1", "4.3.1"],
    },
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      birth: new FormControl(Validators.required),
      framework: new FormControl("", Validators.required),
      frameworkVersion: new FormControl("", Validators.required),
      email: new FormControl(
        "",
        [Validators.required, Validators.email],
        this.forbiddenEmails.bind(this) as AsyncValidatorFn
      ),
      hobbies: new FormArray([], Validators.required),
    });

    this.form.get("framework")?.valueChanges.subscribe((item) => {
      this.units = item.versions;
    });
  }

  getControls() {
    return(<FormArray>this.form.get('hobbies') as FormArray).controls
  }

  onAddHobby() {
    const hobby = new FormGroup({
      title: new FormControl("", Validators.required),
      duration: new FormControl("", Validators.required),
    });
    (<FormArray>this.form.get('hobbies')).push(hobby)
  }

  onDeleteHobby(hobbyIndex: number) {
    
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "test@test.test") {
          resolve({ emailForbidden: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }

  onSubmit() {
    console.warn(this.form.value);
  }
}
