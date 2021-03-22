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
  maxFileSize = 100000000;
  cols: Header[] = [];
  chkboxGrp?: string;
  rows: any[] = [];
  chartData: any[][] = [];
  dataSet: any[][] = [];
  selectedValues: any[] = [];
  selectedArray: any[][] = [];
  chartLabels: any[][] = [];
  options: any;
  first = 0;
  total = 10;
  uploadUrl = environment.api + '/api/v1/upload';
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
          //   console.log(this.rows);
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
      this.dataSet[checkedItem].push({
        labels: this.chartLabels[checkedItem],
        datasets: [
          {
            data: this.chartData[checkedItem],
            backgroundColor: colors
            ,
            hoverBackgroundColor: colors
          }]
      });
    }
  }

  showQuickViz(): void {
    const ref = this.dialogService.open(QuickVisDialogComponent, {
      data: {
        d: this.dataSet,
        cols: this.selectedValues
      },
      header: 'Quick Viz',
      width: '80%',
      contentStyle: { 'max-height': '90%', overflow: 'auto' }
    });
  }


  ngOnInit(): void {
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
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.options = {
      title: {
        display: true,
        text: 'pie chart',
        fontSize: 14
      },
      legend: {
        position: 'left'
      }
    };
    const data = this.config.data;
    // tslint:disable-next-line: no-string-literal
    this.chartList = data['d'];
    // tslint:disable-next-line: no-string-literal
    this.selectedCols = data['cols'];
    console.log(this.chartList);

  }
}
