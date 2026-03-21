import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface PortalUser {
  id: string;
  name: string;
  username: string;
  email: string;
  role: 'BRANCH_MAKER' | 'BRANCH_CHECKER' | 'USER_MAKER' | 'USER_CHECKER';
  branch: string;
  status: 'Active' | 'Pending Approval' | 'Suspended';
  lastActive: string;
}

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './user-list.html',
})
export class UserListComponent {
  filter: 'All' | 'Branch Maker' | 'Branch Checker' | 'User Maker' | 'User Checker' = 'All';
  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 5;

  users: PortalUser[] = [
    { id: 'USR-001', name: 'Alexander Pierce', username: 'apierce_sv', email: 'a.pierce@vault.com', role: 'BRANCH_MAKER', branch: 'DFS', status: 'Active', lastActive: '2 mins ago' },
    { id: 'USR-002', name: 'Sarah Jenkins', username: 'sjenkins_ops', email: 's.jenkins@vault.com', role: 'BRANCH_CHECKER', branch: 'DFS', status: 'Pending Approval', lastActive: 'Never' },
    { id: 'USR-003', name: 'Michael Chen', username: 'mchen_admin', email: 'm.chen@vault.com', role: 'USER_MAKER', branch: 'DFS', status: 'Active', lastActive: '1 hr ago' },
    { id: 'USR-004', name: 'Elena Rossi', username: 'erossi_it', email: 'e.rossi@vault.com', role: 'USER_CHECKER', branch: 'DFS', status: 'Active', lastActive: '5 mins ago' },
    { id: 'USR-005', name: 'James Wilson', username: 'jwilson_bm', email: 'j.wilson@vault.com', role: 'BRANCH_MAKER', branch: 'DFS', status: 'Suspended', lastActive: '3 days ago' },
    { id: 'USR-006', name: 'Emily Davis', username: 'edavis_ops', email: 'e.davis@vault.com', role: 'BRANCH_CHECKER', branch: 'DFS', status: 'Active', lastActive: '2 hrs ago' },
    { id: 'USR-007', name: 'David Kim', username: 'dkim_sv', email: 'd.kim@vault.com', role: 'BRANCH_MAKER', branch: 'DFS', status: 'Pending Approval', lastActive: 'Never' },
    { id: 'USR-008', name: 'Sophia Martinez', username: 'smartinez', email: 's.martinez@vault.com', role: 'USER_MAKER', branch: 'DFS', status: 'Active', lastActive: '1 day ago' }
  ];

  get filteredUsers(): PortalUser[] {
    return this.users.filter(user => {
      // Role Filter Check
      let matchesTab = true;
      if (this.filter === 'Branch Maker') matchesTab = user.role === 'BRANCH_MAKER';
      if (this.filter === 'Branch Checker') matchesTab = user.role === 'BRANCH_CHECKER';
      if (this.filter === 'User Maker') matchesTab = user.role === 'USER_MAKER';
      if (this.filter === 'User Checker') matchesTab = user.role === 'USER_CHECKER';

      // Search Filter Check
      const term = this.searchTerm.toLowerCase();
      const matchesSearch = term === '' ||
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term);

      return matchesTab && matchesSearch;
    });
  }

  get pagedUsers(): PortalUser[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  get totalFiltered(): number {
    return this.filteredUsers.length;
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

  setFilter(filter: 'All' | 'Branch Maker' | 'Branch Checker' | 'User Maker' | 'User Checker') {
    this.filter = filter;
    this.currentPage = 1;
  }

  onSearchChange() {
    this.currentPage = 1;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  // --- Approval Action Panel Methods ---

  selectedUserForAction: PortalUser | null = null;
  actionReason: string = '';

  openActionPanel(user: PortalUser) {
    this.selectedUserForAction = user;
    this.actionReason = '';
  }

  closeActionPanel() {
    this.selectedUserForAction = null;
    this.actionReason = '';
  }

  submitAction(action: 'Approve' | 'Reject' | 'Request Update') {
    if (this.selectedUserForAction) {
      if (action === 'Approve') {
        this.selectedUserForAction.status = 'Active';
      } else if (action === 'Reject') {
        this.selectedUserForAction.status = 'Suspended';
      }
      this.closeActionPanel();
    }
  }

  getRoleColorClass(role: string): string {
    switch (role) {
      case 'USER_CHECKER': return 'bg-error-container text-on-error-container border-error-container';
      case 'BRANCH_CHECKER': return 'bg-tertiary-container text-on-tertiary-container border-tertiary-container';
      case 'BRANCH_MAKER': return 'bg-primary-container text-on-primary-container border-primary-container';
      case 'USER_MAKER': return 'bg-secondary-container text-on-secondary-container border-secondary-container';
      default: return 'bg-surface text-on-surface border-outline';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Active': return 'check_circle';
      case 'Pending Approval': return 'schedule';
      case 'Suspended': return 'block';
      default: return 'help';
    }
  }

  getStatusColorClass(status: string): string {
    switch (status) {
      case 'Active': return 'text-primary bg-primary/10';
      case 'Pending Approval': return 'text-tertiary bg-tertiary/10';
      case 'Suspended': return 'text-error bg-error/10';
      default: return 'text-outline bg-surface-variant';
    }
  }
}
