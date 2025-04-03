import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EventsComponent } from '../events/events.component';

interface User {
  name: string;
  email: string;
  role: 'student' | 'host' | 'admin';
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  activeSection: string = 'dashboard';
  adminName: string = 'Admin';
  
  users: User[] = [];
  events = EventsComponent.getAllEvents();

  constructor(private router: Router) {
    this.loadAdminData();
    this.loadUsers();
  }

  private loadAdminData(): void {
    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      const currentUser = JSON.parse(currentUserStr);
      this.adminName = currentUser.name || 'Admin';
    }
  }

  private loadUsers(): void {
    const usersStr = localStorage.getItem('users');
    this.users = usersStr ? JSON.parse(usersStr) : [];
  }

  navigateTo(section: string): void {
    this.activeSection = section;
    if (section === 'logout') {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }

  getTotalUsers(): number {
    return this.users.length;
  }

  getTotalEvents(): number {
    return this.events.length;
  }
}