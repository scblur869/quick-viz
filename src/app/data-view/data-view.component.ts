import { DataService } from './../data.service';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';


interface CsvData {
  header: string[];
  data: string[];
}
interface Header {
  header: string;
  field: string;
}

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css'],
  providers: [MessageService, DialogService]
})
export class DataViewComponent implements OnInit {
  uploadedFiles: any[] = [];
  maxFileSize = 1000000000;
  cols: Header[] = [];
  chkboxGrp?: string;
  radioGrp?: string;
  rows: any[] = [];
  chartData: any[][] = [];
  dataSet: any[][] = [];
  selectedValues: any[] = [];
  selectedValue: any;
  labelSelect: any;
  valueSelect: any;
  enableDs = false;
  selectedArray: any[][] = [];
  chartLabels: any[][] = [];
  options: any;
  first = 0;
  total = 10;
  uploadUrl = environment.api + '/api/v1/upload';
  chartType = [{
    label: 'Pie',
    value: 'pie'
  }, {
    label: 'Line Chart',
    value: 'line'
  },
  {
    label: 'Polar Area',
    value: 'polar'
  },
  {
    label: 'Doughnut',
    value: 'doughnut'
  }
  ];
  constructor(public dialogService: DialogService, private messageService: MessageService, private dataService: DataService) { }

  onUpload(event: any): any {
    this.cols = [];
    this.rows = [];
    this.dataSet = [];
    this.chartData = [];
    this.selectedArray = [];
    this.selectedValues = [];

    this.chartLabels = [];
    const formData: FormData = new FormData();
    const file = event.files[0];
    console.log(file.name);
    formData.append('upload', file, file.name);
    const uploadOb = this.dataService.uploadCsvFile(formData);

    const uploadObserver = {
      next: (r: CsvData) => {
        if (r) {
          for (const h of r.header) {
            this.cols.push({ header: h, field: h });
          }
          this.rows = r.data;
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    };
    // tslint:disable-next-line: deprecation
    uploadOb.subscribe(uploadObserver);
    for (const f of event.files) {
      this.uploadedFiles.push(f);
    }

    this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
  }

  getRandomColor(num: number): any[] {
    const colorArr: any[] = [];
    // tslint:disable-next-line: whitespace
    for (let i = 1;i <= num;i++) {
      const color = Math.floor(0x1000000 * Math.random()).toString(16);

      colorArr.push('#' + ('000000' + color).slice(-6));
    }

    return colorArr;
  }

  checkEvent(event: any): void {
    this.chartLabels = [];
    this.chartData = [];
    this.dataSet = [];
    this.selectedArray = [];
    for (const checkedItem of this.selectedValues) {
      this.selectedArray[checkedItem] = [];
      this.dataSet[checkedItem] = [];
      this.chartData[checkedItem] = [];
      for (const row of this.rows) {
        this.selectedArray[checkedItem].push(row[checkedItem]);
      }

      const unique = [...new Set(this.selectedArray[checkedItem])];
      this.chartLabels[checkedItem] = unique;
      for (const u of unique) {
        const counter = this.selectedArray[checkedItem].reduce((count, item) => item === u ? count + 1 : count, 0);

        this.chartData[checkedItem].push(counter);
      }
      // dataset build

      const colors = this.getRandomColor(this.chartLabels[checkedItem].length);
      const lineColor = this.getRandomColor(1);
      this.dataSet[checkedItem].push(
        {
          labels: this.chartLabels[checkedItem],
          datasets: [
            {

              data: this.chartData[checkedItem],
              backgroundColor: colors,
              fill: false
              ,
              hoverBackgroundColor: colors
            }],
          title: {
            display: true,
            text: checkedItem + ' Chart',
            fontSize: 14
          },
          legend: {
            position: 'left'
          }
        });
    }
  }

  multiDataSetEvent(event: any): void {

    this.chartLabels = [];
    this.chartData = [];
    const xAxisArr = [];


    if (this.labelSelect['header']) {
      console.log('true 1');
       if (this.valueSelect['header']) {
        console.log('true 2');
        for (const row of this.rows) {
          if (row[this.labelSelect['header']] != undefined){
            xAxisArr.push({dataset: row[this.labelSelect['header']], value: row[this.valueSelect['header']] });
          }
         
        }
        console.log(xAxisArr);
       }
    }
  }

  radioEvent(event: any): void {
    console.log(this.selectedValue);
  }

  enableDS(event: boolean): void {
    if (this.enableDs == false ){
      this.labelSelect = null;
      this.valueSelect = null;
    }
  }

  showQuickViz(): void {
    const ref = this.dialogService.open(QuickVisDialogComponent, {
      data: {
        d: this.dataSet,
        cols: this.selectedValues,
        type: this.selectedValue
      },
      header: 'Quick Viz',
      width: '80%',
      contentStyle: { 'max-height': '90%', overflow: 'auto' }
    });
  }
  //    const counter = xAxisArr.reduce((count, item) => item === u ? count + 1 : count, 0);
    //  this.chartData.push(counter);


  ngOnInit(): void {
   this.valueSelect = [
     {
       header: '',
       field: '',
     }
   ];
   this.labelSelect = [
    {
      header: '',
      field: '',
    }
  ];
   }

}



@Component({
  selector: 'app-viz-view',
  templateUrl: './quickviz.html',
  styleUrls: ['./data-view.component.css'],
  providers: [MessageService]
})
export class QuickVisDialogComponent implements OnInit {
  chartList: any[][] = [];
  selectedCols: any[] = [];
  options: any;
  chartType: any;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {

    const data = this.config.data;
    // tslint:disable-next-line: no-string-literal
    this.chartList = data['d'];
    // tslint:disable-next-line: no-string-literal
    this.chartType = data['type'];
    // tslint:disable-next-line: no-string-literal
    this.selectedCols = data['cols'];
    console.log(this.chartList);

  }
}
