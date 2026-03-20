import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ActivityItem {
  id: string;
  name: string;
  type: string;
  date: string;
  status: 'Active' | 'Pending' | 'Review';
  amount?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styles: ``,
})
export class Dashboard {
  activeFilter: string = 'This Month';

  // KPIs
  kpis = {
    merchants: { value: '1,284', trend: '+12.5%', isUp: true },
    orgs: { value: '412', trend: '+4.2%', isUp: true },
    tills: { value: '8,902', trend: '-2.4%', isUp: false },
    requests: { value: '56', urgent: 12 }
  };
  
  targetAttainment: number = 78;

  recentActivity: ActivityItem[] = [
    { id: 'ORG-88219', name: 'Safiri Logistics Ltd', type: 'Merchant Onboarding', date: 'Today, 09:42 AM', status: 'Active' },
    { id: 'TRX-94812', name: 'Nairobi Central Branch', type: 'Till Allocation', date: 'Today, 08:15 AM', status: 'Review', amount: '5 Tills' },
    { id: 'ORG-88220', name: 'Peak Coffee Exporters', type: 'Merchant Onboarding', date: 'Yesterday, 14:30 PM', status: 'Pending' },
    { id: 'REQ-10943', name: 'Global Finance Corp', type: 'Tariff Update', date: 'Yesterday, 11:20 AM', status: 'Active' },
    { id: 'USR-B9921', name: 'Mombasa Port Authority', type: 'User Role Change', date: 'Oct 24, 2026', status: 'Active' }
  ];

  setFilter(filter: string) {
    this.activeFilter = filter;
    
    // Mock updating data based on filter
    if (filter === 'This Month') {
      this.kpis = {
        merchants: { value: '1,284', trend: '+12.5%', isUp: true },
        orgs: { value: '412', trend: '+4.2%', isUp: true },
        tills: { value: '8,902', trend: '-2.4%', isUp: false },
        requests: { value: '56', urgent: 12 }
      };
      this.targetAttainment = 78;
    } else if (filter === 'Last Quarter') {
      this.kpis = {
        merchants: { value: '3,842', trend: '+18.1%', isUp: true },
        orgs: { value: '1,105', trend: '+9.3%', isUp: true },
        tills: { value: '24,105', trend: '+1.2%', isUp: true },
        requests: { value: '142', urgent: 5 }
      };
      this.targetAttainment = 92;
    } else if (filter === 'YTD') {
      this.kpis = {
        merchants: { value: '14,290', trend: '+45.0%', isUp: true },
        orgs: { value: '4,891', trend: '+32.4%', isUp: true },
        tills: { value: '89,440', trend: '+15.8%', isUp: true },
        requests: { value: '812', urgent: 24 }
      };
      this.targetAttainment = 85;
    }
  }

  getAttainmentOffset(): number {
    // Circumference = 2 * Math.PI * 45 = ~282.74
    // Offset = Circumference - (Circumference * (percentage / 100))
    const circumference = 282.74;
    return circumference - (circumference * (this.targetAttainment / 100));
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Active': return 'bg-primary-container text-on-primary-container border-primary-container';
      case 'Pending': return 'bg-tertiary-container text-on-tertiary-container border-tertiary-container';
      case 'Review': return 'bg-error-container text-on-error-container border-error-container';
      default: return 'bg-surface-variant text-on-surface-variant';
    }
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'Active': return 'check_circle';
      case 'Pending': return 'schedule';
      case 'Review': return 'error';
      default: return 'help';
    }
  }
}
