import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailsService } from 'src/app/services/details.service';
import { AddDetailsComponent } from '../add-details/add-details.component';
import { UpdateDetailsComponent } from '../update-details/update-details.component';
import { Detail } from 'src/app/model/detail.model';


@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
    details: Detail[] = [];
    nextId: number = 1; 
    errorMessage: string = '';
  
    constructor(private detailService: DetailsService, private _dialog: MatDialog) { }
  
    ngOnInit(): void {
      this.loadDetails();
    }
  
    // Load details from the API
    loadDetails(): void {
      this.detailService.getDetails().subscribe({
        next: (data) => {
          this.details = data;
          const ids = this.details.map(d => d.id);
          this.nextId = ids.length > 0 ? Math.max(...ids) + 1 : 1;
          console.log(this.details)
        },
        error: (error) => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        }
      });
    }
  
    // Add a new detail
    addDetail(): void {
      const dialogRef = this._dialog.open(AddDetailsComponent, {
        width: '500px',
        height: '500x',
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadDetails();
      });
    }
  
    // Update an existing detail
    updateDetail(id:number): void {
      console.log(id)
      const dialogRef = this._dialog.open(UpdateDetailsComponent, {
        width: '500px',
        height: '500x',
        data: id
      });
      dialogRef.afterClosed().subscribe(() => {
        this.loadDetails();
      });
    }
  
    // Delete a detail
    deleteDetail(id: number): void {
      this.detailService.deleteDetail(id).subscribe({
        next: (response) => {
          // Assuming the response has a property 'status' or similar
          if (response === 'success') { // Adjust this condition based on your actual response
            alert('Delete successful!');
          }
          this.details = this.details.filter(detail => detail.id !== id);
        },
        error: (error) => {
          this.errorMessage = error;
          console.error('There was an error!', error);
        }
      });
    }
}
