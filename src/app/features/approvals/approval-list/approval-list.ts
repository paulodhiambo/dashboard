import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface ServiceRequest {
  id: string;
  type: 'User' | 'Organization';
  action: string;
  initiatedBy: string;
  status: string;
  date: string;
}

@Component({
  selector: 'app-approval-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './approval-list.html',
})
export class ApprovalList {
  filter: 'All' | 'User' | 'Organization' = 'All';
  searchTerm: string = '';
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;

  requests: ServiceRequest[] = [
    { id: 'REQ-89201', type: 'User', action: 'Create', initiatedBy: 'Sarah Mitchell', status: 'Pending', date: '2026-03-20' },
    { id: 'REQ-89202', type: 'Organization', action: 'Onboard', initiatedBy: 'John Doe', status: 'Pending', date: '2026-03-20' },
    { id: 'REQ-89203', type: 'User', action: 'Update Role', initiatedBy: 'Admin User', status: 'Pending', date: '2026-03-19' },
    { id: 'REQ-89204', type: 'Organization', action: 'Modify Branches', initiatedBy: 'Jane Smith', status: 'Pending', date: '2026-03-19' },
    { id: 'REQ-89205', type: 'User', action: 'Reset Password', initiatedBy: 'Michael Brown', status: 'Under Review', date: '2026-03-18' },
    { id: 'REQ-89206', type: 'Organization', action: 'Update Limit', initiatedBy: 'Alice Johnson', status: 'Pending', date: '2026-03-18' },
    { id: 'REQ-89207', type: 'User', action: 'Create', initiatedBy: 'David Lee', status: 'Pending', date: '2026-03-17' },
    { id: 'REQ-89208', type: 'Organization', action: 'Onboard', initiatedBy: 'Chris Wilson', status: 'Pending', date: '2026-03-17' },
    { id: 'REQ-89209', type: 'User', action: 'Deactivate', initiatedBy: 'Admin User', status: 'Pending', date: '2026-03-16' },
    { id: 'REQ-89210', type: 'Organization', action: 'Suspend', initiatedBy: 'Admin User', status: 'Under Review', date: '2026-03-16' },
    { id: 'REQ-89211', type: 'User', action: 'Create', initiatedBy: 'Emma Davis', status: 'Pending', date: '2026-03-15' },
    { id: 'REQ-89212', type: 'Organization', action: 'Update Tariff', initiatedBy: 'Finance Team', status: 'Pending', date: '2026-03-15' }
  ];

  get filteredAndSearchedRequests(): ServiceRequest[] {
    return this.requests.filter(req => {
      // 1. Tab Filter
      const matchesTab = this.filter === 'All' || req.type === this.filter;
      
      // 2. Search Filter
      const term = this.searchTerm.toLowerCase();
      const matchesSearch = term === '' || 
                            req.id.toLowerCase().includes(term) ||
                            req.initiatedBy.toLowerCase().includes(term) ||
                            req.action.toLowerCase().includes(term) ||
                            req.status.toLowerCase().includes(term);
                            
      return matchesTab && matchesSearch;
    });
  }

  get pagedRequests(): ServiceRequest[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredAndSearchedRequests.slice(startIndex, endIndex);
  }

  get totalFiltered(): number {
    return this.filteredAndSearchedRequests.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalFiltered / this.pageSize);
  }

  get startIndexDisplay(): number {
    return this.totalFiltered === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndexDisplay(): number {
    const end = this.currentPage * this.pageSize;
    return end > this.totalFiltered ? this.totalFiltered : end;
  }

  setFilter(filter: 'All' | 'User' | 'Organization') {
    this.filter = filter;
    this.currentPage = 1; // Reset to page 1 on filter change
  }

  onSearchChange() {
    this.currentPage = 1; // Reset to page 1 on search
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
