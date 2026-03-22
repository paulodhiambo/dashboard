import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface TillDetails {
  serviceRequestId: string;
  tillNumber: string;
  orgShortCode: string;
  accountNumber: string;
  accountNumberCurrency: string;
  accountName: string;
  tillName: string;
  productId: number;
  emailAddress: string;
  primaryPhoneNumber: string;
  notificationNumbers: string;
  tillCategory: string;
  notificationLevel: number;
  apiNotification: number;
  language: string;
  status: 'Active' | 'Pending Review' | 'Suspended' | 'Closed';
  settlementAccount: string;
  commissionAccount: string;
  location: string;
}

@Component({
  selector: 'app-till-review',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './till-review.html',
  styles: ``
})
export class TillReviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  tillId: string | null = null;
  tillData: TillDetails = {
    serviceRequestId: 'SR-87-1753964144194-368327',
    tillNumber: '888889',
    orgShortCode: '536921',
    accountNumber: '6600000368',
    accountNumberCurrency: 'BIF',
    accountName: 'BARABWIRIZA APOLLINAIRE',
    tillName: "APOLLINsTill",
    productId: 2,
    emailAddress: 'mail@mail.com',
    primaryPhoneNumber: '25778101003',
    notificationNumbers: '25778101003',
    tillCategory: '3045',
    notificationLevel: 1,
    apiNotification: 0,
    language: 'ENG',
    status: 'Pending Review',
    settlementAccount: '6600000368 (BIF)',
    commissionAccount: '6600000369 (BIF)',
    location: 'Bujumbura Centre'
  };

  ngOnInit() {
    this.tillId = this.route.snapshot.paramMap.get('id');
    // In a real app, we would fetch tillData based on tillId
  }

  isReviewPanelOpen = false;
  reviewRemarks = '';

  openReviewPanel() {
    this.reviewRemarks = '';
    this.isReviewPanelOpen = true;
  }

  submitReview(decision: 'approve' | 'reject' | 'changes') {
    if (!this.reviewRemarks.trim()) return;

    if (decision === 'approve') this.tillData.status = 'Active';
    if (decision === 'reject') this.tillData.status = 'Suspended';
    if (decision === 'changes') this.tillData.status = 'Pending Review'; 

    this.isReviewPanelOpen = false;
  }

  // Other actions for non-pending tills
  isActionPanelOpen = false;
  actionPayload: {
    action: 'suspend' | 'unsuspend' | 'close',
    reason: string
  } = { action: 'suspend', reason: '' };

  openActionPanel(action: 'suspend' | 'unsuspend' | 'close') {
    this.actionPayload = { action, reason: '' };
    this.isActionPanelOpen = true;
  }

  confirmAction() {
    if (!this.actionPayload.reason.trim()) return;

    if (this.actionPayload.action === 'suspend') this.tillData.status = 'Suspended';
    if (this.actionPayload.action === 'unsuspend') this.tillData.status = 'Active';
    if (this.actionPayload.action === 'close') this.tillData.status = 'Closed';

    this.isActionPanelOpen = false;
  }

  getStatusStyles(status: string) {
    switch (status) {
      case 'Active': return 'bg-primary/10 text-primary border-primary/20';
      case 'Pending Review': return 'bg-tertiary/10 text-tertiary border-tertiary/20';
      case 'Suspended': return 'bg-error/10 text-error border-error/20';
      case 'Closed': return 'bg-slate-100 text-slate-600 border-slate-200';
      default: return 'bg-surface-variant text-on-surface-variant border-outline-variant';
    }
  }
}
