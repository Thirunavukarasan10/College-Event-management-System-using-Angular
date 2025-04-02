import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule], // Import CommonModule
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  events = [
    { title: 'Tech Conference 2025', date: 'March 20, 2025', description: 'Join us for a tech-filled event.', image: 'https://via.placeholder.com/300' },
    { title: 'AI Workshop', date: 'April 5, 2025', description: 'Learn about AI and ML.', image: 'https://via.placeholder.com/300' },
    { title: 'Startup Meetup', date: 'April 15, 2025', description: 'Network with entrepreneurs.', image: 'https://via.placeholder.com/300' },
    { title: 'Hackathon 2025', date: 'May 10, 2025', description: 'Participate in a 24-hour coding challenge!', image: 'https://via.placeholder.com/300' },
    { title: 'CSE Symposium', date: 'June 25, 2025', description: 'A gathering of Computer Science experts and students.', image: 'https://via.placeholder.com/300' },
    { title: 'Music Concert', date: 'July 15, 2025', description: 'Enjoy performances by local bands and musicians.', image: 'https://via.placeholder.com/300' },
    { title: 'Hostel Day', date: 'August 30, 2025', description: 'Celebrate hostel life with games and activities.', image: 'https://via.placeholder.com/300' },
    { title: 'Women\'s Day Celebration', date: 'March 8, 2025', description: 'Celebrating women\'s achievements and contributions.', image: 'https://via.placeholder.com/300' },
    { title: 'Pongal Celebration', date: 'January 14, 2025', description: 'Celebrate the harvest festival with cultural events.', image: 'https://via.placeholder.com/300' }
  ];

  // ✅ Add register() function to fix error
  register(eventTitle: string) {
    alert(`Registered for ${eventTitle}!`);
  }
}
