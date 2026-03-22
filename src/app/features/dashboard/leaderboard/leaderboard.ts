import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

interface LeaderboardItem {
  rank: number;
  name: string;
  initials: string;
  tills: number;
  branches: number;
  volume: string;
  trend: string;
  isUp: boolean;
  colorClass: string;
}

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './leaderboard.html',
  styles: ``
})
export class LeaderboardComponent {
  private router = inject(Router);
  protected readonly Math = Math;

  currentPage: number = 1;
  pageSize: number = 7;
  totalEntries: number = 412; // Total organizations

  leaderboardData: LeaderboardItem[] = [
    { rank: 1, name: 'Safiri Logistics Ltd', initials: 'SL', tills: 890, branches: 12, volume: 'TZS 1.2B', trend: '+12.5%', isUp: true, colorClass: 'bg-slate-800' },
    { rank: 2, name: 'Peak Coffee Exporters', initials: 'PE', tills: 415, branches: 5, volume: 'TZS 850M', trend: '+8.2%', isUp: true, colorClass: 'bg-primary' },
    { rank: 3, name: 'Kwanza Networks', initials: 'KN', tills: 380, branches: 8, volume: 'TZS 720M', trend: '+4.5%', isUp: true, colorClass: 'bg-tertiary' },
    { rank: 4, name: 'Alpha Corp', initials: 'AC', tills: 250, branches: 2, volume: 'TZS 410M', trend: '-2.1%', isUp: false, colorClass: 'bg-secondary' },
    { rank: 5, name: 'Global Finance Corp', initials: 'GF', tills: 180, branches: 4, volume: 'TZS 320M', trend: '+1.8%', isUp: true, colorClass: 'bg-blue-600' },
    { rank: 6, name: 'Unity Merchants', initials: 'UM', tills: 145, branches: 3, volume: 'TZS 280M', trend: '+0.5%', isUp: true, colorClass: 'bg-emerald-600' },
    { rank: 7, name: 'Sunrise Retailers', initials: 'SR', tills: 120, branches: 6, volume: 'TZS 210M', trend: '-1.4%', isUp: false, colorClass: 'bg-orange-600' }
  ];

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
