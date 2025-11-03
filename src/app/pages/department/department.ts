import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './department.html',
  styleUrl: './department.scss'
})
export class Department {
  form: FormGroup;

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
    this.form = this.fb.group({
      NAME: ['', Validators.required],
      });
  }

  ngOnInit() {
    if (this.queryParams.params.STATUS != "ADD") {
      this.viewData();
    }
    if (this.queryParams.params.STATUS == "VIEW" || this.queryParams.params.STATUS == "DEL") {
      this.form.disable();
    }
  }
  dsExistingData: any[] = [];
  viewData() {
    let postObj: any | undefined = undefined;
    postObj = {
      table: "MSTCOMMDEPARTMENT",
      view: ["*"],
      condition: [{ CODE: this.queryParams.params.CODE }],
      sort: [{ column: ["NAME"], order: "ASC" }]
    };
    this.apiService.getList(postObj).subscribe({
      next: (res: any) => {
        this.dsExistingData = res;

        this.form.patchValue({
          NAME: this.dsExistingData?.[0]?.NAME,
          });
      },
      error: (err: any) => {
        debugger
      }
    })
  }

  onSubmit() {
    let MSTCOMMDEPARTMENT: any = this.form.value;
    debugger
    if (this.queryParams.params.STATUS == "ADD") {
    } else {
      MSTCOMMDEPARTMENT["CODE"] = this.queryParams.params.CODE
    }
    MSTCOMMDEPARTMENT["STATUS_CODE"] = 0;

    this.apiService.POST("api/saveMasterData", {
      MSTCOMMDEPARTMENT: MSTCOMMDEPARTMENT
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

  get NAME() { return this.form.get("NAME") };
}
