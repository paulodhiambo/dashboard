import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Till {
  id: string;
  businessName: string;
  branchLocation: string;
  dailyLimit: string;
  status: 'Active' | 'Pending Review' | 'Suspended';
}

@Component({
  selector: 'app-till-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './till-management.html',
  styles: ``,
})
export class TillManagement implements OnInit {
  private router = inject(Router);
  searchShortCode: string = '';

  searchOrganization() {
    if (this.searchShortCode.trim()) {
      this.router.navigate(['/organizations/detail', this.searchShortCode.trim().toUpperCase()]);
    }
  }

  tills: Till[] = [
    { id: 'TILL-8921-X', businessName: 'Acme Supermarket', branchLocation: 'Nairobi Central', dailyLimit: 'KES 500,000', status: 'Active' },
    { id: 'TILL-8922-Y', businessName: 'Acme Electronics', branchLocation: 'Westlands Mall', dailyLimit: 'KES 1,000,000', status: 'Pending Review' },
    { id: 'TILL-8923-Z', businessName: 'Global Retail', branchLocation: 'Mombasa Port', dailyLimit: 'KES 250,000', status: 'Active' },
    { id: 'TILL-8924-A', businessName: 'Swift Logistics', branchLocation: 'Industrial Area', dailyLimit: 'KES 2,000,000', status: 'Active' },
    { id: 'TILL-8925-B', businessName: 'Apex Financial', branchLocation: 'Upper Hill', dailyLimit: 'KES 5,000,000', status: 'Pending Review' },
    { id: 'TILL-8926-C', businessName: 'Mara Tours', branchLocation: 'Karen', dailyLimit: 'KES 100,000', status: 'Active' },
    { id: 'TILL-8927-D', businessName: 'Sahara Traders', branchLocation: 'Eastleigh', dailyLimit: 'KES 800,000', status: 'Suspended' },
    { id: 'TILL-8928-E', businessName: 'Equatorial Corp', branchLocation: 'Kilimani', dailyLimit: 'KES 300,000', status: 'Active' },
    { id: 'TILL-8929-F', businessName: 'Atlas Supply', branchLocation: 'JKIA', dailyLimit: 'KES 4,000,000', status: 'Active' },
    { id: 'TILL-8930-G', businessName: 'Nairobi Tech Hub', branchLocation: 'Ngong Road', dailyLimit: 'KES 150,000', status: 'Pending Review' },
    { id: 'TILL-8931-H', businessName: 'Blue Nile', branchLocation: 'Parklands', dailyLimit: 'KES 600,000', status: 'Active' },
    { id: 'TILL-8932-I', businessName: 'Zambezi Ltd', branchLocation: 'Town Centre', dailyLimit: 'KES 200,000', status: 'Suspended' },
  ];

  filteredTills: Till[] = [];
  paginatedTills: Till[] = [];

  // Filtering State
  activeTab: 'All Tills' | 'Active' | 'Pending Review' = 'All Tills';
  searchQuery: string = '';

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 6;
  totalPages: number = 1;

  // KPIs
  get totalActive() { return this.tills.filter(t => t.status === 'Active').length; }
  get pendingApproval() { return this.tills.filter(t => t.status === 'Pending Review').length; }
  get suspendedTills() { return this.tills.filter(t => t.status === 'Suspended').length; }

  ngOnInit() {
    this.applyFilters();
  }

  setTab(tab: 'All Tills' | 'Active' | 'Pending Review') {
    this.activeTab = tab;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearch() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTills = this.tills.filter(till => {
      const matchesTab = this.activeTab === 'All Tills' || till.status === this.activeTab;
      const matchesSearch = till.businessName.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            till.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            till.branchLocation.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });

    this.totalPages = Math.ceil(this.filteredTills.length / this.pageSize) || 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedTills = this.filteredTills.slice(startIndex, startIndex + this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  getStatusStyles(status: string) {
    switch (status) {
      case 'Active': return 'bg-primary/10 text-primary border-primary/20';
      case 'Pending Review': return 'bg-tertiary/10 text-tertiary border-tertiary/20';
      case 'Suspended': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-surface-variant text-on-surface-variant border-outline-variant';
    }
  }

  getStatusIcon(status: string) {
    switch (status) {
      case 'Active': return 'check_circle';
      case 'Pending Review': return 'schedule';
      case 'Suspended': return 'block';
      default: return 'help';
    }
  }
}
