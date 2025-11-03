import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { table } from 'console';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss'
})
export class Employee {
  userForm: FormGroup;

  dsSex: any = [
    { CODE: 1, NAME: "Male" },
    { CODE: 2, NAME: "Female" },
    { CODE: 3, NAME: "Other" },
  ];

  queryParams: any = {};

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.queryParams = params;
    })
    this.userForm = this.fb.group({
      NAME: ['', Validators.required],
      SEX: [1, Validators.required], // default Male
      SHORT_NAME: [''],
      MOBILE: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      EMAIL: ['', [Validators.required, Validators.email]],
      ADDRESS1: [''],
      ADDRESS2: [''],
      USER_ID: ['', Validators.required],
      PASSWORD: ['', Validators.required],
      IS_WATCHMAN: [false, Validators.required],
      VIEW_ALL_VISITOR: [false, Validators.required],
      DEP_CODE: ['', Validators.required],
    });
  }
  dsDepartment: any[] = [];
  ngOnInit() {
    this.apiService.getList({
      table: "MSTCOMMDEPARTMENT",
      view: ["*"],
      condition: [{ STATUS_CODE: 0 }],
      sort: [{ column: ["NAME"], order: "ASC" }]
    }).subscribe({
      next: (res: any) => {
        this.dsDepartment = res;
        this.userForm.patchValue({
          DEP_CODE: this.dsDepartment?.[0]?.CODE
        })
        if (this.queryParams.params.STATUS != "ADD") {
          this.viewData();
        }
        if (this.queryParams.params.STATUS == "VIEW" || this.queryParams.params.STATUS == "DEL") {
          this.userForm.disable();
        }
      },
      error: (err: any) => {
        debugger;
      }
    })
  }
  dsExistingData: any[] = [];
  viewData() {
    let postObj: any | undefined = undefined;
    postObj = {
      table: "MSTCOMMEMPLOYEE",
      view: ["*"],
      condition: [{ CODE: this.queryParams.params.CODE }],
      sort: [{ column: ["NAME"], order: "ASC" }]
    };
    this.apiService.getList(postObj).subscribe({
      next: (res: any) => {
        this.dsExistingData = res;
        this.userForm.patchValue({
          NAME: this.dsExistingData?.[0]?.NAME,
          SEX: this.dsExistingData?.[0]?.SEX,
          SHORT_NAME: this.dsExistingData?.[0]?.SHORT_NAME,
          MOBILE: this.dsExistingData?.[0]?.MOBILE,
          EMAIL: this.dsExistingData?.[0]?.EMAIL,
          ADDRESS1: this.dsExistingData?.[0]?.ADDRESS1,
          ADDRESS2: this.dsExistingData?.[0]?.ADDRESS2,
          USER_ID: this.dsExistingData?.[0]?.USER_ID,
          DEP_CODE : this.dsExistingData?.[0]?.DEP_CODE 
        });
        if (this.dsExistingData?.[0]?.EMP_TYPE == 2) {
          this.IS_WATCHMAN.setValue(true)
        } else if (this.dsExistingData?.[0]?.EMP_TYPE == 1) {
          this.VIEW_ALL_VISITOR.setValue(true)
        }
      },
      error: (err: any) => {
        debugger
      }
    })
  }

  onSubmit() {
    let MSTCOMMEMPLOYEE_TB: any = this.userForm.value;
    debugger
    if (this.queryParams.params.STATUS == "ADD") {
      MSTCOMMEMPLOYEE_TB["PASSWORD"] = this.PASSWORD.value;
    } else {
      MSTCOMMEMPLOYEE_TB["CODE"] = this.queryParams.params.CODE
      if (this.PASSWORD?.value?.length > 0) {
        MSTCOMMEMPLOYEE_TB["PASSWORD"] = this.PASSWORD.value;
      }
    }
    debugger
    if (this.IS_WATCHMAN.value == true) {
      MSTCOMMEMPLOYEE_TB["EMP_TYPE"] = 2;
    } else {
      if (this.VIEW_ALL_VISITOR.value == true) {
        MSTCOMMEMPLOYEE_TB["EMP_TYPE"] = 1;
      } else {
        MSTCOMMEMPLOYEE_TB["EMP_TYPE"] = 0;
      }
    }
    MSTCOMMEMPLOYEE_TB["STATUS_CODE"] = 0;

    this.apiService.POST("api/saveMasterData", {
      MSTCOMMEMPLOYEE_TB: MSTCOMMEMPLOYEE_TB
    }).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: "success",
          title: "Data save successfully."
        });
        this.onBack();
      },
      error: (res: any) => {

      }
    })
  }

  onBack() {
    this.router.navigate([this.queryParams.params.backUrl])
  }

  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  setUserId() {
    let companyShortName: any = localStorage.getItem(environment.userData);
    companyShortName = JSON.parse(companyShortName);
    companyShortName = companyShortName?.COMPANY_CODE;
    if (!companyShortName) {
      Swal.fire({
        icon: "error",
        text: "Fail to generate user id!"
      });
      this.SHORT_NAME.setValue(null);
    }

    this.USER_ID.setValue(
      `${this.SHORT_NAME.value}@${companyShortName.SHORT_NAME}`
    )
  }

  get NAME() { return this.userForm.get("NAME") };
  get SEX() { return this.userForm.get("SEX") };
  get SHORT_NAME() { return this.userForm.get("SHORT_NAME") };
  get MOBILE() { return this.userForm.get("MOBILE") };
  get EMAIL() { return this.userForm.get("EMAIL") };
  get ADDRESS1() { return this.userForm.get("ADDRESS1") };
  get ADDRESS2() { return this.userForm.get("ADDRESS2") };
  get USER_ID() { return this.userForm.get("USER_ID") };
  get PASSWORD() { return this.userForm.get("PASSWORD") };
  get IS_WATCHMAN() { return this.userForm.get("IS_WATCHMAN") }
  get VIEW_ALL_VISITOR() { return this.userForm.get("VIEW_ALL_VISITOR") }
}
