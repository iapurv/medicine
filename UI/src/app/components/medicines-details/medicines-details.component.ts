import { Component, OnInit } from '@angular/core';
import { MedicinesService } from 'src/app/services/medicines.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-medicines-details',
  templateUrl: './medicines-details.component.html',
  styleUrls: ['./medicines-details.component.css']
})
export class MedicinesDetailsComponent implements OnInit {
  currentTutorial = null;
  message = '';
  dummyRes = {Id: '1', Name: 'ABC', Brand: 'Cipla', Price: '123.00', Quantity: '5', ExpiryDate: '01-12-2021', Notes: 'No notes'};

  constructor(
    private medicinesService: MedicinesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getTutorial(this.route.snapshot.paramMap.get('id'));
  }

  getTutorial(id): void {
    this.currentTutorial = this.dummyRes;
    /* this.medicinesService.get(id)
      .subscribe(
        data => {
          // this.currentTutorial = data;
          this.currentTutorial = {title: 'Sumit', description: 'Description'};
          console.log(data);
        },
        error => {
          console.log(error);
        }); */
  }

  updatePublished(status): void {
    const data = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.medicinesService.update(this.currentTutorial.id, data)
      .subscribe(
        response => {
          this.currentTutorial.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateTutorial(): void {
    this.medicinesService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The medicine was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteTutorial(): void {
    this.medicinesService.delete(this.currentTutorial.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/medicines']);
        },
        error => {
          console.log(error);
        });
  }
}
