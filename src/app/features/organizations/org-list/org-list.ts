import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Organization {
  id: string;
  name: string;
  regNumber: string;
  country: string;
  branches: number;
  onboardedDate: string;
  status: 'Approved' | 'Pending Review' | 'Under Review' | 'Rejected';
}

@Component({
  selector: 'app-org-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './org-list.html',
})
export class OrgListComponent implements OnInit {
  organizations: Organization[] = [
    { id: 'ORG-001', name: 'Acme Trading Co.', regNumber: 'REG-9021-KE', country: 'Kenya', branches: 12, onboardedDate: '2025-10-12', status: 'Approved' },
    { id: 'ORG-002', name: 'Global Retail Group', regNumber: 'REG-4451-ZA', country: 'South Africa', branches: 4, onboardedDate: '2025-11-05', status: 'Approved' },
    { id: 'ORG-003', name: 'Swift Delivery Logistics', regNumber: 'REG-1102-NG', country: 'Nigeria', branches: 1, onboardedDate: '2026-03-10', status: 'Under Review' },
    { id: 'ORG-004', name: 'Nairobi Tech Hub', regNumber: 'REG-8821-KE', country: 'Kenya', branches: 3, onboardedDate: '2026-01-20', status: 'Approved' },
    { id: 'ORG-005', name: 'Mara Wildlife Tours', regNumber: 'REG-3312-TZ', country: 'Tanzania', branches: 2, onboardedDate: '2026-02-14', status: 'Approved' },
    { id: 'ORG-006', name: 'Sahara Merchants', regNumber: 'REG-9912-EG', country: 'Egypt', branches: 8, onboardedDate: '2026-03-15', status: 'Pending Review' },
    { id: 'ORG-007', name: 'Apex Financial Services', regNumber: 'REG-2210-UG', country: 'Uganda', branches: 15, onboardedDate: '2024-06-30', status: 'Approved' },
    { id: 'ORG-008', name: 'Zambezi Resources', regNumber: 'REG-4432-ZM', country: 'Zambia', branches: 6, onboardedDate: '2025-08-22', status: 'Rejected' },
    { id: 'ORG-009', name: 'Equatorial Corp', regNumber: 'REG-5611-KE', country: 'Kenya', branches: 5, onboardedDate: '2026-03-18', status: 'Pending Review' },
    { id: 'ORG-010', name: 'Atlas Supply Chain', regNumber: 'REG-1092-GH', country: 'Ghana', branches: 22, onboardedDate: '2023-11-10', status: 'Approved' },
    { id: 'ORG-011', name: 'Blue Nile Exports', regNumber: 'REG-8291-ET', country: 'Ethiopia', branches: 2, onboardedDate: '2025-04-05', status: 'Approved' },
    { id: 'ORG-012', name: 'Kalahari Logistics', regNumber: 'REG-5521-BW', country: 'Botswana', branches: 3, onboardedDate: '2026-01-11', status: 'Rejected' },
  ];

  filteredOrgs: Organization[] = [];
  paginatedOrgs: Organization[] = [];

  // Filter State
  activeTab: 'All' | 'Approved' | 'Pending Review' | 'Under Review' | 'Rejected' = 'All';
  searchQuery: string = '';

  // Pagination State
  currentPage: number = 1;
  pageSize: number = 8;
  totalPages: number = 1;

  // KPIs
  get totalOrgs() { return this.organizations.length; }
  get approvedOrgs() { return this.organizations.filter(o => o.status === 'Approved').length; }
  get pendingOrgs() { return this.organizations.filter(o => o.status === 'Pending Review').length; }
  get underReviewOrgs() { return this.organizations.filter(o => o.status === 'Under Review').length; }
  get rejectedOrgs() { return this.organizations.filter(o => o.status === 'Rejected').length; }

  ngOnInit() {
    this.applyFilters();
  }

  setTab(tab: 'All' | 'Approved' | 'Pending Review' | 'Under Review' | 'Rejected') {
    this.activeTab = tab;
    this.currentPage = 1;
    this.applyFilters();
  }

  onSearch() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredOrgs = this.organizations.filter(org => {
      const matchesTab = this.activeTab === 'All' || org.status === this.activeTab;
      const matchesSearch = org.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            org.regNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            org.country.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });

    this.totalPages = Math.ceil(this.filteredOrgs.length / this.pageSize) || 1;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedOrgs = this.filteredOrgs.slice(startIndex, startIndex + this.pageSize);
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

  getInitials(name: string): string {
    return name.substring(0, 2).toUpperCase();
  }

  getStatusStyles(status: string) {
    switch (status) {
      case 'Approved': return 'bg-primary/10 text-primary border-primary/20';
      case 'Pending Review': return 'bg-tertiary/10 text-tertiary border-tertiary/20';
      case 'Under Review': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rejected': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-surface-variant text-on-surface-variant border-outline-variant';
    }
  }

  getStatusIcon(status: string) {
    switch (status) {
      case 'Approved': return 'verified';
      case 'Pending Review': return 'hourglass_empty';
      case 'Under Review': return 'pending_actions';
      case 'Rejected': return 'block';
      default: return 'help';
    }
  }
}
