import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventsComponent } from '../events/events.component';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

interface User {
  name: string;
  email: string;
  role: string;
  department?: string;
  rollNumber?: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  studentName: string = 'Student';
  studentEmail: string = '';
  studentDept: string = '';
  studentRoll: string = '';
  
  activeSection: string = 'upcoming-events';
  registeredEvents: Event[] = [];
  isEditingProfile: boolean = false;

  // Get all events from the central EventsComponent
  events: Event[] = EventsComponent.getAllEvents();

  constructor(private router: Router) {
    this.verifyUserSession();
    this.loadUserData();
    this.loadRegisteredEvents();
  }

  private verifyUserSession(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      this.router.navigate(['/login']);
      return;
    }

    const currentUser: User = JSON.parse(currentUserStr);
    if (currentUser.role !== 'student') {
      this.router.navigate(['/login']);
    }
  }

  private loadUserData(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) return;

    const currentUser: User = JSON.parse(currentUserStr);
    this.studentName = currentUser.name || 'Student';
    this.studentEmail = currentUser.email || '';
    this.studentDept = currentUser.department || '';
    this.studentRoll = currentUser.rollNumber || '';
  }

  private loadRegisteredEvents(): void {
    if (!this.studentEmail) return;

    const userEventsStr = localStorage.getItem('userEvents') || '{}';
    const userEvents: Record<string, number[]> = JSON.parse(userEventsStr);
    
    if (userEvents[this.studentEmail]) {
      this.registeredEvents = this.events.filter(event => 
        userEvents[this.studentEmail].includes(event.id)
      );
    }
  }

  navigateTo(section: string): void {
    this.activeSection = section;
    if (section === 'logout') {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }

  isRegistered(eventId: number): boolean {
    return this.registeredEvents.some(e => e.id === eventId);
  }

  registerForEvent(eventId: number): void {
    if (!this.studentEmail) {
      alert('Session error. Please login again!');
      this.router.navigate(['/login']);
      return;
    }

    let userEvents: Record<string, number[]> = JSON.parse(localStorage.getItem('userEvents') || '{}');
    
    if (!userEvents[this.studentEmail]) {
      userEvents[this.studentEmail] = [];
    }

    if (!userEvents[this.studentEmail].includes(eventId)) {
      userEvents[this.studentEmail].push(eventId);
      localStorage.setItem('userEvents', JSON.stringify(userEvents));
      
      // Register student in the central event system
      EventsComponent.registerForEvent(eventId, this.studentEmail, this.studentName);
      
      this.loadRegisteredEvents();
      alert('Successfully registered for the event!');
    } else {
      alert('You have already registered for this event!');
    }
  }

  unregisterFromEvent(eventId: number): void {
    if (!this.studentEmail) return;

    const userEvents: Record<string, number[]> = JSON.parse(localStorage.getItem('userEvents') || '{}');
    
    if (userEvents[this.studentEmail]) {
      userEvents[this.studentEmail] = userEvents[this.studentEmail].filter(id => id !== eventId);
      localStorage.setItem('userEvents', JSON.stringify(userEvents));
      this.loadRegisteredEvents();
      alert('Successfully unregistered from the event!');
    }
  }

  toggleEditProfile(): void {
    this.isEditingProfile = !this.isEditingProfile;
  }

  saveProfile(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (!currentUserStr) {
      this.router.navigate(['/login']);
      return;
    }

    const currentUser: User = JSON.parse(currentUserStr);
    const updatedUser = {
      ...currentUser,
      department: this.studentDept,
      rollNumber: this.studentRoll
    };

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update in users array if exists
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
      users[userIndex] = {
        ...users[userIndex],
        department: this.studentDept,
        rollNumber: this.studentRoll
      };
      localStorage.setItem('users', JSON.stringify(users));
    }

    this.isEditingProfile = false;
    alert('Profile updated successfully!');
  }
}