import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
}
