import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './complaints.html'
})
export class ComplaintsComponent {}