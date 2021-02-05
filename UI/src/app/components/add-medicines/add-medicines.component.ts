import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MedicinesService } from 'src/app/services/medicines.service';

@Component({
  selector: 'app-add-medicines',
  templateUrl: './add-medicines.component.html',
  styleUrls: ['./add-medicines.component.css']
})
export class AddMedicinesComponent implements OnInit {
  tutorial = {
    Id: '',
    Name: '',
    Brand: '',
    Price: '',
    Quantity: '',
    ExpiryDate: '',
    Notes: ''
  };
  submitted = false;

  constructor(private tutorialService: MedicinesService, private router: Router) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      Id: this.tutorial.Id,
      Name: this.tutorial.Name,
      Brand: this.tutorial.Brand,
      Price: this.tutorial.Price,
      Quanitity: this.tutorial.Quantity,
      ExpiryDate: this.tutorial.ExpiryDate,
      Notes: this.tutorial.Notes
    };

    this.tutorialService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/medicines']);
        },
        error => {
          console.log(error);
          // this.router.navigate(['/medicines']);
        });
  }

  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      Id: '',
      Name: '',
      Brand: '',
      Price: '',
      Quantity: '',
      ExpiryDate: '',
      Notes: ''
    };
  }

}
