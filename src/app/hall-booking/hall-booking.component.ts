import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hall-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hall-booking.component.html',
  styleUrls: ['./hall-booking.component.css']
})
export class HallBookingComponent {
  hallBooking = {
    name: '',
    email: '',
    date: '',
    timeSlot: '',
    purpose: ''
  };

  bookings: any[] = [];

  submitBooking() {
    if (this.hallBooking.name && this.hallBooking.email && this.hallBooking.date && this.hallBooking.timeSlot && this.hallBooking.purpose) {
      this.bookings.push({ ...this.hallBooking });
      alert('Hall booked successfully!');
      this.hallBooking = { name: '', email: '', date: '', timeSlot: '', purpose: '' };
    } else {
      alert('Please fill in all fields.');
    }
  }
}
