import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface LogEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  module: string;
  status: 'Success' | 'Warning' | 'Error' | 'Info';
  details: string;
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './logs.html',
  styles: ``
})
export class LogsComponent {
  private router = inject(Router);
  protected readonly Math = Math;

  currentPage: number = 1;
  pageSize: number = 7;
  totalEntries: number = 14290;

  logs: LogEntry[] = [
    { id: 'LOG-33128', timestamp: '2026-10-25 09:42:15', user: 'admin_paul', action: 'Merchant Approved', module: 'Onboarding', status: 'Success', details: 'Safiri Logistics Ltd (ORG-88219) was approved for live production.' },
    { id: 'LOG-33127', timestamp: '2026-10-25 09:15:30', user: 'system', action: 'Till Allocated', module: 'Tills', status: 'Info', details: '5 new tills allocated to Nairobi Central Branch.' },
    { id: 'LOG-33126', timestamp: '2026-10-25 08:30:00', user: 'manager_sarah', action: 'Tariff Update', module: 'Configuration', status: 'Warning', details: 'Bulk tariff update initiated for Small Enterprise tier.' },
    { id: 'LOG-33125', timestamp: '2026-10-24 17:45:12', user: 'admin_paul', action: 'New User Registered', module: 'Access Control', status: 'Success', details: 'User "John Doe" (teller) added to Mombasa Port Authority.' },
    { id: 'LOG-33124', timestamp: '2026-10-24 16:20:05', user: 'system', action: 'Connection Timeout', module: 'POS API', status: 'Error', details: 'Gateway timeout while communicating with Terminal pos-8821-2.' },
    { id: 'LOG-33123', timestamp: '2026-10-24 14:30:00', user: 'system', action: 'Merchant Onboarded', module: 'Onboarding', status: 'Info', details: 'Peak Coffee Exporters moved to "Pending Review" status.' },
    { id: 'LOG-33122', timestamp: '2026-10-24 11:10:45', user: 'admin_paul', action: 'System Backup', module: 'Database', status: 'Success', details: 'Daily incremental backup completed successfully (2.4GB).' }
  ];

  getStatusClass(status: string): string {
    switch(status) {
      case 'Success': return 'bg-primary/10 text-primary border-primary/20';
      case 'Warning': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Error': return 'bg-error/10 text-error border-error/20';
      case 'Info': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  getStatusIcon(status: string): string {
    switch(status) {
      case 'Success': return 'check_circle';
      case 'Warning': return 'warning';
      case 'Error': return 'error';
      case 'Info': return 'info';
      default: return 'help';
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= Math.ceil(this.totalEntries / this.pageSize)) {
      this.currentPage = page;
      // In a real app, this would trigger a data fetch
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
