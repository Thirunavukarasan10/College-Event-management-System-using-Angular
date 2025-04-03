import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsComponent } from '../events/events.component';

@Component({
  selector: 'app-host-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.css']
})
export class HostDashboardComponent {
  hostName: string = 'John Doe';
  hostEmail: string = 'host@example.com';
  activeSection: string = 'create-event';
  
  newEvent = { 
    title: '', 
    date: '', 
    description: '', 
    image: 'assets/images/event-default.jpg' 
  };

  constructor(private router: Router) {
    this.loadHostData();
  }

  private loadHostData(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      this.hostName = currentUser.name || 'Host';
      this.hostEmail = currentUser.email || 'host@example.com';
    }
  }

  navigateTo(section: string) {
    this.activeSection = section;
    if (section === 'logout') {
      setTimeout(() => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
      }, 1000);
    }
  }

  createEvent() {
    if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
      const formattedDate = new Date(this.newEvent.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Add event to central repository
      EventsComponent.addEvent({
        title: this.newEvent.title,
        date: formattedDate,
        description: this.newEvent.description,
        image: this.newEvent.image,
        hostEmail: this.hostEmail
      });
      
      // Reset form
      this.newEvent = { 
        title: '', 
        date: '', 
        description: '', 
        image: 'assets/images/event-default.jpg' 
      };
      
      alert('Event created successfully!');
    }
  }

  getHostEvents() {
    return EventsComponent.getEventsByHost(this.hostEmail);
  }
  // Add this method to your HostDashboardComponent class
deleteEvent(eventId: number) {
  if (confirm('Are you sure you want to delete this event?')) {
    const success = EventsComponent.deleteEvent(eventId);
    if (success) {
      alert('Event deleted successfully!');
    } else {
      alert('Failed to delete event. It may have already been removed.');
    }
  }
}
}