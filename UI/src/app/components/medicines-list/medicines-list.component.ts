import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MedicinesService } from './../../services/medicines.service';

@Component({
  selector: 'app-medicines-list',
  templateUrl: './medicines-list.component.html',
  styleUrls: ['./medicines-list.component.css']
})
export class MedicinesListComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  medName = '';
  source;
  originalSource: any =
    {
        localdata:
        [
            ['1', 'ABC', 'Cipla', '123.00', '12', '01-12-2022', 'No notes'],
            ['2', 'DEF', 'Ranbaxy', '123.00', '5', '01-12-2021', 'No notes'],
            ['3', 'GHI', 'Lipin', '123.00', '5', '01-12-2023', 'No notes'],
            ['4', 'JKL', 'Glenmark', '123.00', '15', '02-05-2021', 'No notes'],
            ['5', 'MNO', 'Cipla', '123.00', '5', '01-12-2021', 'No notes'],
            ['6', 'PQR', 'Sun Pharma', '123.00', '5', '01-12-2021', 'No notes'],
            ['7', 'adga', 'Dr. Reddy', '123.00', '5', '01-12-2025', 'No notes'],
            ['8', 'hgkfjfh', 'Ranbaxy', '123.00', '5', '01-12-2024', 'No notes'],
            ['9', 'sdfg sfdg', 'Lupin', '123.00', '18', '01-12-2021', 'No notes'],
            ['10', 'it7dijxf', 'Torrent', '123.00', '5', '01-12-2021', 'No notes'],
            ['11', 'dsg', 'Mankind', '123.00', '5', '01-12-2021', 'No notes'],
            ['12', 'plksh', 'Piramal', '123.00', '5', '01-12-2021', 'No notes']
        ],
        datafields:
        [
            { name: 'Id', type: 'string', map: '0' },
            { name: 'Name', type: 'string', map: '1' },
            { name: 'Brand', type: 'string', map: '2' },
            { name: 'Price', type: 'string', map: '3' },
            { name: 'Quantity', type: 'string', map: '4' },
            { name: 'ExpiryDate', type: 'string', map: '5' },
            { name: 'Notes', type: 'string', map: '6' }
        ],
        datatype: 'array'
    };
    dataAdapter: any = new jqx.dataAdapter(this.originalSource);
    columns: any[] =
    [
        { text: 'Serial No.', datafield: 'Id', width: 80, cellsrenderer: this.cellsrenderer},
        { text: 'Name', datafield: 'Name', width: 200, cellsrenderer: this.cellsrenderer},
        { text: 'Brand', datafield: 'Brand', width: 200, cellsrenderer: this.cellsrenderer},
        { text: 'Price', datafield: 'Price', width: 80, cellsrenderer: this.cellsrenderer},
        { text: 'Quantity', datafield: 'Quantity', width: 80, cellsrenderer: this.cellsrenderer},
        { text: 'Expiry Date', datafield: 'ExpiryDate', width: 120, cellsrenderer: this.cellsrenderer},
    ];


  constructor(private medicinesService: MedicinesService, private cd: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    this.retrieveTutorials();  
  }

  retrieveTutorials(): void {
    this.medicinesService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.originalSource.localdata = this.transform(data);
          this.source = JSON.parse(JSON.stringify(this.originalSource));
          this.dataAdapter = new jqx.dataAdapter(this.source);
         //this.cd.markForCheck();
        },
        error => {
          console.log(error);
        });
  }

  transform(data){
    const myData = [];
    for (const d of data) {
        myData.push(Object.values(d));
    }
    return myData;
  }

  refreshList(): void {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial, index): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials(): void {
    this.medicinesService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(name): void {
    if (name) {
      const searchText = name.toLowerCase();
      this.source.localdata = this.originalSource.localdata.filter(x => x[1].toLowerCase().indexOf(searchText) > -1);
      this.dataAdapter = new jqx.dataAdapter(this.source);
    } else {
      this.dataAdapter = new jqx.dataAdapter(this.originalSource);
    }
    this.cd.markForCheck();
    /* this.medicinesService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data;
          console.log(data);
        },
        error => {
          console.log(error);
        }); */
  }

  onCellClickGrid(e) {
    console.log('onCellClickGrid- ', e);
  }

  cellsrenderer(e) {
    const columnName = arguments[1];
    console.log(columnName, ' - ', arguments[2]);
    if (columnName === 'Quantity' && arguments[2] < 10) {
      return '<span style="background-color: yellow; padding: 36px">' + arguments[2] + '</span>';
    }
    if (columnName === 'ExpiryDate' && arguments[2] ) {
      const curDate = new Date();
      curDate.setDate(curDate.getDate() + 30);
      const expDate = new Date(arguments[2]);
      return curDate > expDate ? '<span style="background-color: red;  padding: 22px">' + arguments[2] + '</span>' : arguments[2];
    }
  }

  onRowClickEvent(e) {
    console.log('onRowClickEvent- ', e);
    this.router.navigate(['/medicines', e.args.row.bounddata.Id]);
  }

  cellClassName(e) {
    const columnName = arguments[1];
    console.log(columnName, ' - ', arguments[2]);
    if (columnName === 'Quantity' && arguments[2] < 10) {
      return 'low-stock';
    }
    if (columnName === 'ExpiryDate' && arguments[2] ) {
      const curDate = new Date();
      curDate.setDate(curDate.getDate() + 30);
      const expDate = new Date(arguments[2]);
      return curDate > expDate ? 'near-expiry' : '';
    }
  }

  cellTemplate(e) {
    console.log('cellTemplate- ', e);
  }
}
