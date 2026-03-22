import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-org-review',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './org-review.html',
})
export class OrgReviewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  
  orgId: string = '';
  
  // Mock detailed data for the review page
  org = {
    businessName: 'Acme Trading Co.',
    tradingName: 'Acme Global',
    regNumber: 'REG-9021-KE',
    kraPin: 'P051423894X',
    incorporationDate: '2019-04-15',
    sector: 'Retail & Wholesale',
    status: 'Under Review',
    // Contact Info
    email: 'compliance@acmeglobal.co.ke',
    phone: '+254712345678',
    physicalAddress: 'Acme Towers, 4th Floor, Westlands, Nairobi',
    postalAddress: 'P.O. Box 12345 - 00100, Nairobi',
    // Tills
    tills: [
      {
        tillNumber: "888889",
        tillName: "APOLLINsTill",
        tillCategory: "3045",
        productId: 2,
        locationTown: "Nairobi",
        settlementAccount: "6600000368",
        commissionAccount: "6600000399",
        notificationEmail: "mail@mail.com",
        notificationPhone: "25778101003",
        preferredNotificationChannel: "SMS",
        preferredNotificationLanguage: "ENG"
      }
    ],
    // Directors
    directors: [
      { name: 'Alice Wambui', idNumber: '29384756', phone: '+254722000111', role: 'Managing Director', shares: '60%' },
      { name: 'John Doe', idNumber: '11223344', phone: '+254733222111', role: 'Operations Director', shares: '40%' }
    ],
    // Documents
    documents: [
      { name: 'Certificate of Incorporation', type: 'PDF', size: '2.4 MB', status: 'Verified' },
      { name: 'KRA PIN Certificate', type: 'PDF', size: '1.1 MB', status: 'Pending Verification' },
      { name: 'Directors IDs (Combined)', type: 'PDF', size: '4.5 MB', status: 'Uploaded' },
      { name: 'CR12 Document', type: 'PDF', size: '1.8 MB', status: 'Uploaded' }
    ]
  };

  isReviewPanelOpen = false;
  reviewRemarks = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orgId = params.get('id') || 'UNKNOWN';
      if (this.orgId !== 'ORG-001' && this.orgId !== 'UNKNOWN') {
         this.org.businessName = `Organization ${this.orgId}`;
         this.org.regNumber = `REG-${Math.floor(Math.random() * 9000)}-KE`;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  openReviewPanel(): void {
    this.isReviewPanelOpen = true;
    this.reviewRemarks = '';
  }

  closeReviewPanel(): void {
    this.isReviewPanelOpen = false;
  }

  submitReview(action: 'approve' | 'reject' | 'changes'): void {
    if ((action === 'reject' || action === 'changes') && !this.reviewRemarks.trim()) {
      alert('Remarks are required for rejecting or requesting changes.');
      return;
    }

    let statusMsg = '';
    if (action === 'approve') statusMsg = 'APPROVED';
    if (action === 'reject') statusMsg = 'REJECTED';
    if (action === 'changes') statusMsg = 'REQUESTED CHANGES';

    alert(`Application for ${this.org.businessName} has been ${statusMsg}. Remarks: ${this.reviewRemarks || 'None'}`);
    this.closeReviewPanel();
    this.goBack();
  }
}
