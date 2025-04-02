import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
    const adminEmail = "admin@example.com"; // Static Admin Email
    const adminPassword = "Admin@123"; // Static Admin Password

    if (this.email === adminEmail && this.password === adminPassword) {
      localStorage.setItem('loggedInUser', JSON.stringify({ email: adminEmail, role: 'admin' }));
      this.router.navigateByUrl('/admin-dashboard');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));

      switch (user.role.toLowerCase()) {
        case 'host':
          this.router.navigateByUrl('/host-dashboard');
          break;
        case 'student':
          this.router.navigateByUrl('/student-dashboard');
          break;
        default:
          alert('Invalid role detected.');
      }
    } else {
      alert('Invalid email or password!');
    }
  }

  // ✅ Navigate to Register Page
  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }
}
