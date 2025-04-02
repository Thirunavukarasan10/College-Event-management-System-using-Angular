import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'student'; // Default role

  constructor(private router: Router) {}

  register() {
    if (this.name && this.email && this.password) {
      const newUser = { name: this.name, email: this.email, password: this.password, role: this.role };
      
      // Store in localStorage
      let users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      alert('Registration successful! Please log in.');
      this.router.navigateByUrl('/login'); // ✅ Redirect to login page
    } else {
      alert('Please fill in all fields!');
    }
  }

  // ✅ Navigate to Login Page
  navigateToLogin() {
    this.router.navigateByUrl('/login');
  }
}
