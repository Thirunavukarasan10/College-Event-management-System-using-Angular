export class HostDashboardComponent {
  hostName: string = 'John Doe';
  hostOrganization: string = 'ABC University';
  hostEmail: string = 'host@example.com';

  activeSection: string = 'create-event';
  newEvent = { title: '', date: '', description: '' };
  hostEvents = [
    { 
      title: 'Tech Fest', 
      date: '2025-04-10', 
      description: 'Annual Tech Event', 
      image: 'event.jpg', 
      registrations: [
        { name: 'Alice Johnson', email: 'alice@example.com' },
        { name: 'Bob Smith', email: 'bob@example.com' }
      ] 
    }
  ];

  createEvent() {
    if (this.newEvent.title && this.newEvent.date && this.newEvent.description) {
      this.hostEvents.push({ 
        ...this.newEvent, 
        image: 'default.jpg', 
        registrations: []  // ✅ Initialize with an empty array
      });
      this.newEvent = { title: '', date: '', description: '' };
    }
  }
}
