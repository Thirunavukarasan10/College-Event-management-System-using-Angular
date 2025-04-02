import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Import Router for navigation

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  studentName = 'John Doe';
  studentDept = 'Computer Science';
  studentRoll = 'CSE2025';
  
  activeSection: string = 'upcoming-events'; // ✅ Default section

  events = [
    { title: 'Hackathon 2025', date: 'April 10, 2025', description: 'Compete in coding challenges.', image: 'assets/images/hackathon.jpg' },
    { title: 'CSE Symposium', date: 'April 15, 2025', description: 'Showcase your technical skills.', image: 'assets/images/symposium.jpg' },
    { title: 'Music Concert', date: 'April 20, 2025', description: 'Enjoy live music performances.', image: 'assets/images/concert.jpg' },
    { title: 'Hostel Day', date: 'April 25, 2025', description: 'A fun-filled day for hostel students.', image: 'assets/images/hostel.jpg' },
    { title: 'Women’s Day', date: 'March 8, 2025', description: 'Celebrate the power of women.', image: 'assets/images/womensday.jpg' },
    { title: 'Pongal Celebration', date: 'January 14, 2025', description: 'Traditional Pongal festival event.', image: 'assets/images/pongal.jpg' }
  ];

  constructor(private router: Router) {} // ✅ Inject Router

  navigateTo(section: string) {
    this.activeSection = section;
    if (section === 'logout') {
      setTimeout(() => {
        alert('Logged out successfully!');
        this.router.navigate(['/login']); // ✅ Redirect to login page
      }, 1000);
    }
  }
}
