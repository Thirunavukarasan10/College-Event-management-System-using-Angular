import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Registration {
  name: string;
  email: string;
}

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
  hostEmail: string;
  registrations: Registration[];
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {
  private static readonly EVENTS_KEY = 'storedEvents';
  
  // Public property to expose events to template
  events: Event[] = EventsComponent.getAllEvents();

  private static _allEvents: Event[] = [];

  // Initialize from localStorage
  private static initializeEvents() {
    const storedEvents = localStorage.getItem(this.EVENTS_KEY);
    this._allEvents = storedEvents ? JSON.parse(storedEvents) : [
      { 
        id: 1,
        title: 'Tech Conference 2025', 
        date: 'March 20, 2025', 
        description: 'Annual technology conference', 
        image: 'https://imgs.search.brave.com/6UFZ-LYf9TVOooSHrB3mF1pOPhOM4PG0vPBrJj91MMU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTMw/Njg1Nzk3L3Bob3Rv/L2dyb3VwLW9mLWJ1/c2luZXNzLXBlb3Bs/ZS1zdGFuZGluZy1h/bmQtdGFsa2luZy1p/bi1vZmZpY2UuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU1v/UFZOQzBURTFyaDdC/VkV5UlJPTFpjbE1r/R2xkWEthamlMUlVP/WjhtZWM9',
        hostEmail: 'admin@college.edu',
        registrations: []
      },
      { 
        id: 2,
        title: 'Science Fair', 
        date: 'April 15, 2025', 
        description: 'Student science projects exhibition', 
        image: 'https://imgs.search.brave.com/ho-bLfXcTGZxvvQ54XyBjgAVPsYuTEGxKHh0niwzqdY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE2/NjA4NTQ4Ni9waG90/by93b21hbi1hc2tp/bmctcXVlc3Rpb25z/LWR1cmluZy1sYXVu/Y2gtZXZlbnQuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPVlU/aWNSN1JQcy1HWEdB/Vm5TekE2cnZIZXVo/WUhoMjVNTFE2akxS/MWFMZEU9',
        hostEmail: 'admin@college.edu',
        registrations: []
      }
    ];
    this.saveEvents();
  }

  private static saveEvents() {
    localStorage.setItem(this.EVENTS_KEY, JSON.stringify(this._allEvents));
  }

  public static getAllEvents(): Event[] {
    if (this._allEvents.length === 0) {
      this.initializeEvents();
    }
    return [...this._allEvents];
  }

  public static addEvent(event: Omit<Event, 'id' | 'registrations'>): Event {
    if (this._allEvents.length === 0) {
      this.initializeEvents();
    }
    
    const newId = this._allEvents.length > 0 ? 
      Math.max(...this._allEvents.map(e => e.id)) + 1 : 1;
    
    const newEvent: Event = {
      ...event,
      id: newId,
      registrations: []
    };
    
    this._allEvents.push(newEvent);
    this.saveEvents();
    return newEvent;
  }

  public static getEventsByHost(hostEmail: string): Event[] {
    if (this._allEvents.length === 0) {
      this.initializeEvents();
    }
    return this._allEvents.filter(event => event.hostEmail === hostEmail);
  }

  public static registerForEvent(eventId: number, studentEmail: string, studentName: string): void {
    if (this._allEvents.length === 0) {
      this.initializeEvents();
    }
    
    const event = this._allEvents.find(e => e.id === eventId);
    if (event && !event.registrations.some(reg => reg.email === studentEmail)) {
      event.registrations.push({
        name: studentName,
        email: studentEmail
      });
      this.saveEvents();
    }
  }

  public static getRegistrationCount(eventId: number): number {
    if (this._allEvents.length === 0) {
      this.initializeEvents();
    }
    
    const event = this._allEvents.find(e => e.id === eventId);
    return event ? event.registrations.length : 0;
  }

  // Add this method to your EventsComponent class
public static deleteEvent(eventId: number): boolean {
  if (this._allEvents.length === 0) {
    this.initializeEvents();
  }
  
  const initialLength = this._allEvents.length;
  this._allEvents = this._allEvents.filter(event => event.id !== eventId);
  
  if (this._allEvents.length !== initialLength) {
    this.saveEvents();
    return true;
  }
  return false;
}
}