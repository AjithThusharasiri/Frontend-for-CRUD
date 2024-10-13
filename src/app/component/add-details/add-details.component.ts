import { Component } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {DetailsService } from 'src/app/services/details.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Detail } from 'src/app/model/detail.model';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss'],
})
export class AddDetailsComponent {
  id: any;
  name: string = '';
  age: string = '';
  address: string = '';

  constructor(private detailsService: DetailsService, private dialogRef: MatDialogRef<AddDetailsComponent>) {}

  onSubmit() {
    const newDetail: Detail = {
      id: 0,
      name: this.name,
      age: this.age,
      address: this.address,
    };
  
    this.detailsService.addDetail(newDetail).pipe(
      catchError(error => {
        console.error('Error adding detail', error);
        return of(null); // Handle error and return an observable
      })
    ).subscribe(response => {
      if (response && response.message === 'success') { // Check the message in the response
        alert('Detail added successfully!'); // Show success alert
        console.log('Detail added successfully:', response.data); // Log added detail
      } else {
        alert('Failed to add detail'); // Show failure alert
        console.log('Failed to add detail:', response ? response.message : 'Unknown error');
      }
    });
  
    this.resetForm(); // Reset the form after submission
  }
  
  
  

  resetForm() {
    this.name = '';
    this.age = '';
    this.address = '';
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
