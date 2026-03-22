import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-org-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './org-detail.html',
})
export class OrgDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  
  shortCode: string = '';
  
  orgData = {
    businessName: 'Acme Corp',
    shortCode: 'ACME',
    registrationNo: 'REG-12345',
    primaryAccount: '6600000368',
    status: 'Active',
    email: 'info@acmecorp.com',
    phone: '+254700112233',
    physicalAddress: 'Acme Towers, Westlands, Nairobi',
    postalAddress: 'P.O BOX 12345-00100',
    directors: [
      { name: 'John Doe', idNumber: '12345678', email: 'john@acme.com', phone: '+254700000000' },
      { name: 'Jane Smith', idNumber: '87654321', email: 'jane@acme.com', phone: '+254711111111' }
    ],
    tills: [
      { name: 'Main Branch Till', number: '543210', account: '6600000368', status: 'Active' },
      { name: 'Westlands Till', number: '987654', account: '6600000455', status: 'Pending Review' }
    ]
  };

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.shortCode = params.get('code') || 'UNKNOWN';
      this.orgData.shortCode = this.shortCode.toUpperCase();
      this.orgData.businessName = this.shortCode.toUpperCase() + ' Enterprises';
    });
  }

  activeTillMenu: string | null = null;
  
  toggleMenu(tillNumber: string) {
    if (this.activeTillMenu === tillNumber) {
      this.activeTillMenu = null;
    } else {
      this.activeTillMenu = tillNumber;
    }
  }

  closeMenu() {
    this.activeTillMenu = null;
  }

  // Organization Menu & Edit Logic
  isOrgMenuOpen = false;
  isEditOrgPanelOpen = false;

  orgEditModel = { email: '', phone: '', physicalAddress: '', postalAddress: '' };

  toggleOrgMenu() { this.isOrgMenuOpen = !this.isOrgMenuOpen; }
  closeOrgMenu() { this.isOrgMenuOpen = false; }
  
  isActionPanelOpen = false;
  actionPayload: {
    type: 'organization' | 'till',
    action: 'suspend' | 'unsuspend' | 'close',
    tillNumber?: string,
    reason: string
  } = { type: 'organization', action: 'suspend', reason: '' };

  openActionPanel(type: 'organization' | 'till', action: 'suspend' | 'unsuspend' | 'close', tillNumber?: string) {
    this.closeOrgMenu();
    this.closeMenu();
    this.actionPayload = { type, action, tillNumber, reason: '' };
    this.isActionPanelOpen = true;
  }

  confirmAction() {
    if (!this.actionPayload.reason.trim()) return;

    if (this.actionPayload.type === 'organization') {
      if(this.actionPayload.action === 'suspend') this.orgData.status = 'Suspended';
      if(this.actionPayload.action === 'unsuspend') this.orgData.status = 'Active';
      if(this.actionPayload.action === 'close') this.orgData.status = 'Closed';
    } else if (this.actionPayload.type === 'till') {
      const till = this.orgData.tills.find(t => t.number === this.actionPayload.tillNumber);
      if (till) {
        if(this.actionPayload.action === 'suspend') till.status = 'Suspended';
        if(this.actionPayload.action === 'unsuspend') till.status = 'Active';
        if(this.actionPayload.action === 'close') till.status = 'Closed';
      }
    }

    this.isActionPanelOpen = false;
  }

  openEditOrgPanel() {
    this.closeOrgMenu();
    this.orgEditModel = {
      email: this.orgData.email,
      phone: this.orgData.phone,
      physicalAddress: this.orgData.physicalAddress,
      postalAddress: this.orgData.postalAddress
    };
    this.isEditOrgPanelOpen = true;
  }

  saveOrgEdit() {
    this.orgData = { ...this.orgData, ...this.orgEditModel };
    this.isEditOrgPanelOpen = false;
  }

  // Directors Logic
  isDirectorModalOpen = false;
  editingDirectorIndex: number | null = null;
  directorForm = { name: '', idNumber: '', email: '', phone: '' };

  openAddDirector() {
    this.editingDirectorIndex = null;
    this.directorForm = { name: '', idNumber: '', email: '', phone: '' };
    this.isDirectorModalOpen = true;
  }

  openEditDirector(index: number) {
    this.editingDirectorIndex = index;
    this.directorForm = { ...this.orgData.directors[index] };
    this.isDirectorModalOpen = true;
  }

  saveDirector() {
    if (this.editingDirectorIndex !== null) {
      this.orgData.directors[this.editingDirectorIndex] = { ...this.directorForm };
    } else {
      this.orgData.directors.push({ ...this.directorForm });
    }
    this.isDirectorModalOpen = false;
  }

  removeDirector(index: number) {
    if(confirm('Are you sure you want to remove this director?')) {
      this.orgData.directors.splice(index, 1);
    }
  }
}
