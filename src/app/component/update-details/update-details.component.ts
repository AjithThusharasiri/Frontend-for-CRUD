import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Detail } from 'src/app/model/detail.model';
import { DetailsService } from 'src/app/services/details.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.scss']
})
export class UpdateDetailsComponent implements OnInit{
  detail: Detail[] = [];
  constructor(private detailService: DetailsService, @Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<UpdateDetailsComponent>){
   // console.log(data)
  }
  ngOnInit(): void {
    console.log(this.data);
    this.detailService.getById(this.data).subscribe(
      (data: Detail) => {
        this.name = data.name;
        this.age = data.age;
        this.address = data.address;
        console.log(data);
      },
      error => {
        console.error('Error fetching details', error);
      }
    );
  }
  
  name: any;
  age: any;
  address: any;
  
  onSubmit() {
    const updatedDetail: Detail = {
      id: this.data,
      name: this.name,
      age: this.age,
      address: this.address
    };
  
    this.detailService.updateDetail(updatedDetail).subscribe(
      response => {
        if (response && response.message === 'success') { 
          alert('Details updated successfully!');
         // console.log('Details updated successfully:', response.data); 
          this.dialogRef.close();
        } else {
          alert('Failed to update details'); 
         // console.log('Failed to update details:', response ? response.message : 'Unknown error');
        }
      },
      error => {
       // console.error('Error updating details', error);
        alert('An error occurred while updating details'); // Show error alert
      }
    );
  }
  

  close() {
    this.dialogRef.close();
  }
}
