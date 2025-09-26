import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import moment from 'moment';
import { GridComponent, GridModule } from 'smart-webcomponents-angular/grid';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [GridModule,],
  templateUrl: './smart-table.html',
  styleUrl: './smart-table.scss',
})
export class SmartTable {
  MenuDocNo: any
  @ViewChild('grid', { read: GridComponent, static: false }) grid!: GridComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.MenuDocNo = params['id'];
      this.loadData()
    })
  }
  dataSource: any = [];
  gridDataSource: any = [];
  gridTranFieldList: any = [];
  gridColumns: any = [];
  navigateUrl: string = "";
  queryParams: any = {};
  loadData() {
    let postObj: any | undefined = undefined;
    this.gridColumns = [];
    this.gridTranFieldList = [];
    if (this.MenuDocNo == "1") {
      postObj = {
        table: "MSTCOMMEMPLOYEE",
        view: ["*"],
        condition: [{ STATUS_CODE: 0 }],
        sort: [{ column: ["NAME"], order: "ASC" }]
      };
      this.gridColumns.push({ label: "Id", dataField: "CODE", width: 50 });
      this.gridTranFieldList.push("CODE:string");

      this.gridColumns.push({ label: "Name", dataField: "NAME" });
      this.gridTranFieldList.push("NAME:string");

      // this.gridColumns.push({ label: "Address", dataField: "ADDRESS" });
      // this.gridTranFieldList.push("ADDRESS:string");

      this.gridColumns.push({ label: "Mobile", dataField: "MOBILE" });
      this.gridTranFieldList.push("MOBILE:string");

      this.gridColumns.push({ label: "Email", dataField: "EMAIL" });
      this.gridTranFieldList.push("EMAIL:string");

    }
    if (!postObj) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid Menu",
      })
      return;
    }


    // this.gridColumns.push({ label: "Added By", dataField: "SYS_ADDUSER" });
    // this.gridTranFieldList.push("SYSADD_LOGIN:string");

    this.gridColumns.push({ label: "Added Time", dataField: "SYSADD_DATETIME" });
    this.gridTranFieldList.push("SYSADD_DATETIME:string");

    // this.gridColumns.push({ label: "Changed By", dataField: "SYS_CHAUSER" });
    // this.gridTranFieldList.push("SYSCHNG_LOGIN:string");

    this.gridColumns.push({ label: "Changed Time", dataField: "SYSCHNG_DATETIME" });
    this.gridTranFieldList.push("SYSCHNG_DATETIME:string");

    this.apiService.getList(postObj).subscribe({
      next: (res: any) => {
        this.dataSource = res.map((ele) => {
          return {
            ...ele,
            STATUS: ele.STATUS_CODE === 0 ? '' : ele.STATUS_CODE === 1 ? '*' : ele.STATUS_CODE === 21 ? 'na' : '',
            TRAN_DATE: moment(ele.TRAN_DATE).format('DD-MM-YYYY'),
            SCH_TIME: moment(ele.SCH_TIME, "YYYYMMDDHH:mm:ss").format('DD-MM-YYYY | HH:mm'),
            SYSADD_DATETIME: moment(ele.SYSADD_DATETIME, "YYYYMMDDHH:mm:ss").format('DD-MM-YYYY | HH:mm'),
            SYSCHNG_DATETIME: moment(ele.SYSCHNG_DATETIME, "YYYYMMDDHH:mm:ss").format('DD-MM-YYYY | HH:mm'),
          }
        });

        if (this.MenuDocNo == '1') {
          this.navigateUrl = '/pages/employee';
          this.queryParams["MENU_DOC_NO"] = 1;
        } else {
          this.navigateUrl = undefined
          this.queryParams = undefined
        }

        this.gridDataSource = new window.Smart.DataAdapter({
          dataSource: this.dataSource,
          dataFields: this.gridTranFieldList,
          columns: this.gridColumns,
        });
      },
      error: (err: any) => {

      }
    })
  }

  onAdd() {
    // let navigateUrl: string | undefined = undefined
    // let queryParams: any = {};

    this.queryParams["STATUS"] = "ADD";

    if (!this.navigateUrl) return;
    this.router.navigate([this.navigateUrl], {
      queryParams: this.queryParams,
      skipLocationChange: true,
    });
  }

  getSelectedGridRows(gridId: string) {
    let selectedArray = new Array();
    const table: any = document.getElementById(gridId);
    let selected = table.rowById;
    for (let item of selected) {
      let user = new Proxy(item, {
        ownKeys(target) {
          return Object.keys(target).filter((key) => key == "selected");
        },
      });
      for (let key in user) {
        if (user[key]) {
          selectedArray.push(user["index"]);
        }
      }
    }

    let selectedRows: any = [];
    for (let index of selectedArray) {
      selectedRows.push(this.dataSource[index]);
    }

    return selectedRows;
  }
  async onEdit() {
    let selectedRows: any = this.getSelectedGridRows("grid");
    if (selectedRows.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select record",
      })
      return;
    }

    this.queryParams["STATUS"] = "EDIT";
    this.queryParams["CODE"] = selectedRows[0].CODE;
    this.queryParams["TRAN_NO"] = selectedRows[0].TRAN_NO;


    if (!this.navigateUrl) return;
    this.router.navigate([this.navigateUrl], {
      queryParams: this.queryParams,
      skipLocationChange: true,
    });

  }


  async onView() {
    let selectedRows: any = this.getSelectedGridRows("grid");
    if (selectedRows.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select record",
      })
      return;
    }

    this.queryParams["STATUS"] = "VIEW";
    this.queryParams["CODE"] = selectedRows[0].CODE;
    this.queryParams["TRAN_NO"] = selectedRows[0].TRAN_NO;


    if (!this.navigateUrl) return;
    this.router.navigate([this.navigateUrl], {
      queryParams: this.queryParams,
      skipLocationChange: true,
    });


  }

  async onDelete() {
    let selectedRows: any = this.getSelectedGridRows("grid");
    if (selectedRows.length == 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please select record",
      })
      return;
    }

    this.queryParams["STATUS"] = "DEl";
    this.queryParams["CODE"] = selectedRows[0].CODE;
    this.queryParams["TRAN_NO"] = selectedRows[0].TRAN_NO;


    if (!this.navigateUrl) return;
    this.router.navigate([this.navigateUrl], {
      queryParams: this.queryParams,
      skipLocationChange: true,
    });
  }




  filtering = {
    enabled: true
  };
  appearance = {
    alternationCount: 2,
    showRowHeader: true,
    showRowStatus: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: false,
    showColumnIcon: false,
    allowHover: true,
    showRowNumber: true
  }
  summaryRow = {
    visible: true,
  }

  sorting = {
    enabled: true,
    mode: 'many'
  }

  editing = {
    enabled: false,
    addNewRow: {
      visible: true,
      displayMode: 'button'
    }
  }
  selection = {
    enabled: true,
    allowCellSelection: false,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    mode: 'single'
  }

  behavior = { allowColumnReorder: true, rowResizeMode: 'growAndShrink', columnResizeMode: 'growAndShrink' }
  grouping = {
    enabled: true,
    renderMode: 'compact',
    groupBar: {
      visible: true
    },
    summaryRow: {
      inline: false
    }
  }
  header = {
    visible: true,
    buttons: ['columns', 'filter', 'sort', /*'delete'*/, 'search'],
    onInit(item) {
    }
  }

  rowDetail = {
    enabled: true,
    dialog: {
      enabled: true
    }
  }

  columnMenu = {
    dsMastList: {
      columnMenuCustomizeType: {
        visible: true
      },
      columnMenuItemDelete: {
        visible: true
      }
    }
  }

}
