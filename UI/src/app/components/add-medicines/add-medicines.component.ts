import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MedicinesService } from './../../services/medicines.service';

@Component({
  selector: 'app-add-medicines',
  templateUrl: './add-medicines.component.html',
  styleUrls: ['./add-medicines.component.css']
})
export class AddMedicinesComponent implements OnInit {
  tutorial = {
    id: '',
    name: '',
    brand: '',
    price: '',
    quantity: '',
    expiryDate: '',
    notes: ''
  };
  submitted = false;

  constructor(private tutorialService: MedicinesService, private router: Router) { }

  ngOnInit(): void {
  }

  saveTutorial(): void {
    const data = {
      name: this.tutorial.name,
      brand: this.tutorial.brand,
      price: parseFloat(this.tutorial.price),
      quantity: parseInt(this.tutorial.quantity),
      expiryDate: this.tutorial.expiryDate,
      notes: this.tutorial.notes
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
      id: '',
      name: '',
      brand: '',
      price: '',
      quantity: '',
      expiryDate: '',
      notes: ''
    };
  }

}
