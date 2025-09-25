// Angular import
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-register',
  imports: [RouterModule, NgSelectModule, FormsModule, ReactiveFormsModule, CommonModule],
  providers: [ApiService],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.scss',
  standalone: true
})
export class AuthRegisterComponent {
  // public method
  roles: any = [
    { 'CODE': "1", 'NAME': 'Admin' },
    { 'CODE': "2", 'NAME': 'Doctor' },
    { 'CODE': "3", 'NAME': 'Receptionist' }
  ];
  @Input() queryParamsData: any = {};
  mast_code = 0
  dataForm!: FormGroup
  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router

  ) { }

  userData: any = JSON.parse(localStorage.getItem(environment.userData) || '{}');
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.queryParamsData = params
      this.mast_code = this.queryParamsData.params.CODE || 0;
    });
    this.dataForm = this.formBuilder.group({
      user_id: [''],
      password: [''],
      role: ['3'],
      name: [''],
      mobile: [''],
      email: [''],
      address: [''],
    })

    if (this.queryParamsData.params.STATUS != "ADD") {
      this.onView()
    }
  }
  dsExistingData: any = [];
  onView() {
    if (this.queryParamsData.params.STATUS == 'VIEW' || this.queryParamsData.params.STATUS == 'DEL') {
      this.dataForm.disable()
    }
    this.apiService.getList({
      tablename: "users",
      view: ["*"],
      condition: {
        CODE: this.mast_code
      }
    }).subscribe({
      next: (res: any) => {
        this.dsExistingData = res;
        this.dataForm.patchValue({
          user_id: this.dsExistingData?.[0]?.USER_ID,
          // password: this.dsExistingData?.[0]?.PASSWORD,
          role: this.dsExistingData?.[0]?.ROLE + "",
          name: this.dsExistingData?.[0]?.NAME,
          mobile: this.dsExistingData?.[0]?.MOBILE,
          email: this.dsExistingData?.[0]?.MAIL,
          address: this.dsExistingData?.[0]?.ADDRESS,
        })
      },
      error: (err: any) => { },
    })
  }


  get user_id() {
    return this.dataForm.get('user_id')
  }
  get password() {
    return this.dataForm.get('password')
  }
  get role() {
    return this.dataForm.get('role')
  }
  get name() {
    return this.dataForm.get('name')
  }
  get mobile() {
    return this.dataForm.get('mobile')
  }
  get email() {
    return this.dataForm.get('email')
  }
  get address() {
    return this.dataForm.get('address')
  }

  submit() {
    let users: any = {}
    if (this.mast_code == 0) {
      users['SYS_ADDUSER'] = this.userData.USER_ID
      users['SYS_CHAUSER'] = this.userData.USER_ID
      users['USER_ID'] = this.user_id.value
      users['PASSWORD'] = this.password.value
    }
    else {
      users['SYS_CHAUSER'] = this.userData.USER_ID
      users['CODE'] = this.mast_code
      if (this.password.value.length > 0) {
        users['PASSWORD'] = this.password.value
      }
    }

    users['STATUS_CODE'] = 0
    users['ROLE'] = this.role.value
    users['NAME'] = this.name.value
    users['ADDRESS'] = this.address.value
    users['MOBILE'] = this.mobile.value
    users['MAIL'] = this.email.value

    this.apiService.save({
      users: users
    }).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data saved successfully',
        }).then(() => {
          this.onBack();
        })
      },
      error: (err: any) => {
        debugger
      }
    })
  }

  onBack() {
    this.router.navigate(["/smart_table/" + this.queryParamsData.params.MENU_DOC_NO])
  }

  onDelete() {
    let users: any = {};
    users['SYS_CHAUSER'] = this.userData.USER_ID
    users['CODE'] = this.mast_code
    users['STATUS_CODE'] = 1;

    this.apiService.save({
      users: users
    }).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Data deleted successfully',
        }).then(() => {
          this.onBack();
        })
      },
      error: (err: any) => {
        debugger
      }
    })
  }
}

