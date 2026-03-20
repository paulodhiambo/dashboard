import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approval-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './approval-detail.html',
})
export class ApprovalDetail implements OnInit {
  requestId: string | null = null;
  requestType: 'User' | 'Organization' = 'Organization';
  requestAction: string = 'Update';
  status: string = 'Pending Approval';
  
  // Dummy data for "Create" (Organization)
  orgData = {
    businessName: 'Acme Corp',
    shortCode: 'ACME',
    registrationNo: 'REG-12345',
    primaryAccount: '6600000368',
    directors: [
      { name: 'John Doe', idNumber: '12345678', refNumber: 'REF-001', address: 'Nairobi, Kenya', email: 'john@acme.com', phone: '+254700000000' }
    ],
    tills: [
      { name: 'Main Branch Till', number: 'Till Generated', account: '6600000368' }
    ]
  };
  
  // Dummy data for "Update" (User)
  updateData = [
    { field: 'Role', oldValue: 'Branch Maker', newValue: 'Branch Checker' },
    { field: 'Phone Number', oldValue: '+254700000000', newValue: '+254711111111' },
    { field: 'Daily Limit', oldValue: '500,000', newValue: '1,000,000' }
  ];

  // Action Panel state
  showActionPanel: boolean = false;
  actionReason: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.requestId = this.route.snapshot.paramMap.get('id');
    
    // Mock logic: Ends with 1, 3, 5, 7, 9, 11 -> User
    if (this.requestId && (this.requestId.endsWith('1') || this.requestId.endsWith('3') || this.requestId.endsWith('5'))) {
       this.requestType = 'User';
       this.requestAction = 'Update'; // Just mock
    } else {
       this.requestType = 'Organization';
       this.requestAction = 'Create'; // Just mock
    }
  }

  openActionPanel() {
    this.showActionPanel = true;
    this.actionReason = '';
  }

  closeActionPanel() {
    this.showActionPanel = false;
    this.actionReason = '';
  }

  submitAction(action: 'Approve' | 'Reject' | 'Request Update') {
    if (action === 'Approve') {
      this.status = 'Approved';
    } else if (action === 'Reject') {
      this.status = 'Rejected';
    }
    this.closeActionPanel();
  }
}
