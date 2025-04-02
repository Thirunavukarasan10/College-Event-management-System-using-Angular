import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exam-schedule',
  standalone: true,
  imports: [CommonModule], // Import CommonModule for *ngFor
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.css']
})
export class ExamScheduleComponent {
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  selectedExam: any = null;

  examCategories = [
    {
      title: 'Unit Tests',
      exams: [
        { subject: 'Full Stack Development', date: new Date(this.currentYear, this.currentMonth + 1, 10), time: '10:00 AM - 11:30 AM' },
        { subject: 'DevOps', date: new Date(this.currentYear, this.currentMonth + 1, 12), time: '10:00 AM - 11:30 AM' },
        { subject: 'Digital Marketing', date: new Date(this.currentYear, this.currentMonth + 1, 14), time: '10:00 AM - 11:30 AM' }
      ]
    },
    {
      title: 'Model Exams',
      exams: [
        { subject: 'Full Stack Development', date: new Date(this.currentYear, this.currentMonth + 1, 20), time: '2:00 PM - 4:00 PM' },
        { subject: 'DevOps', date: new Date(this.currentYear, this.currentMonth + 1, 22), time: '2:00 PM - 4:00 PM' },
        { subject: 'Digital Marketing', date: new Date(this.currentYear, this.currentMonth + 1, 24), time: '2:00 PM - 4:00 PM' }
      ]
    },
    {
      title: 'Semester Exams',
      exams: [
        { subject: 'Full Stack Development', date: new Date(this.currentYear, this.currentMonth + 1, 28), time: '9:00 AM - 12:00 PM' },
        { subject: 'DevOps', date: new Date(this.currentYear, this.currentMonth + 1, 30), time: '9:00 AM - 12:00 PM' },
        { subject: 'Digital Marketing', date: new Date(this.currentYear, this.currentMonth + 1, 31), time: '9:00 AM - 12:00 PM' }
      ]
    }
  ];

  // Function to assign room numbers based on register number
  getRoomNumber(registerNumber: string): string {
    const lastThreeDigits = parseInt(registerNumber.slice(-3), 10);
    return lastThreeDigits <= 153 ? 'Room 101' : 'Room 102';
  }

  // Filter upcoming exams for next month only
  getUpcomingExams() {
    return this.examCategories.map(category => ({
      title: category.title,
      exams: category.exams.filter(exam => exam.date.getMonth() === this.currentMonth + 1)
    })).filter(category => category.exams.length > 0);
  }

  // Show exam details when clicking "View Details"
  viewDetails(exam: any) {
    this.selectedExam = {
      subject: exam.subject,
      date: exam.date,
      time: exam.time,
      students: [
        { regNo: '6176AC22UCS116', room: this.getRoomNumber('6176AC22UCS116') },
        { regNo: '6176AC22UCS191', room: this.getRoomNumber('6176AC22UCS191') }
      ]
    };
  }

  // Hide details when clicking "Close"
  closeDetails() {
    this.selectedExam = null;
  }
}
