import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './org-search.html'
})
export class OrgSearchComponent {
  searchMode: 'account' | 'shortcode' = 'account';
  searchQuery: string = '';

  constructor(private router: Router, private location: Location) {}

  goBack(): void {
    this.location.back();
  }

  onSearch(): void {
    if (!this.searchQuery.trim()) return;

    // Simulate search resolving to a specific Organization ID
    // In real app, make API call here, then route to detail view with fetched ID
    const dummyResolvedId = `ORG-${Math.floor(Math.random() * 9000)}`;
    this.router.navigate(['/organizations/detail', dummyResolvedId]);
  }
}
