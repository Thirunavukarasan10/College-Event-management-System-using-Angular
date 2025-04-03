import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  department?: string;
  rollNumber?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Admin login
    if (this.email === "admin@gmail.com" && this.password === "Admin@123") {
      const adminUser = {
        name: "Admin",
        email: this.email,
        role: 'admin',
        department: 'Administration'
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      this.router.navigate(['/admin-dashboard']);
      return;
    }

    // Regular user login
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === this.email && u.password === this.password);

    if (user) {
      // Store only necessary data in currentUser
      const currentUser = {
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        rollNumber: user.rollNumber
      };
      
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      // Redirect based on role
      switch (user.role.toLowerCase()) {
        case 'host':
          this.router.navigate(['/host-dashboard']);
          break;
        case 'student':
          this.router.navigate(['/student-dashboard']);
          break;
        default:
          alert('Invalid role detected.');
      }
    } else {
      alert('Invalid email or password!');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}