import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent {
  hostName: string = 'John Doe';
  hostOrganization: string = 'ABC University';
  hostEmail: string = 'host@example.com';

  activeSection: string = 'create-event'; // Default section
  newEvent = { title: '', date: '', description: '' };
  
  hostEvents = [
    { 
      title: 'Tech Fest', 
      date: 'April 10, 2025', 
      description: 'Annual Tech Event', 
      image: 'assets/images/techfest.jpg',
      registrations: [
        { name: 'Alice Johnson', email: 'alice@example.com' },
        { name: 'Bob Smith', email: 'bob@example.com' }
      ] 
    },
    { 
      title: 'Science Fair', 
      date: 'May 15, 2025', 
      description: 'Showcase scientific projects', 
      image: 'assets/images/sciencefair.jpg',
      registrations: [
        { name: 'Charlie Brown', email: 'charlie@example.com' }
      ]
    }
  ];

  constructor(private router: Router) {}

  navigateTo(section: string) {
    this.activeSection = section;
    if (section === 'logout') {
      setTimeout(() => {
        alert('Logged out successfully!');
        this.router.navigate(['/login']);
      }, 1000);
    }
  }

  createEvent() {
    if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
      // Format date to match display style
      const formattedDate = new Date(this.newEvent.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      this.hostEvents.push({ 
        title: this.newEvent.title,
        date: formattedDate,
        description: this.newEvent.description,
        image: 'assets/images/event-default.jpg',
        registrations: []
      });
      
      // Reset form
      this.newEvent = { title: '', date: '', description: '' };
    }
  }
}
