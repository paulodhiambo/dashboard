import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface BusinessSubCategory {
  name: string;
  mcc: string;
}

interface BusinessCategory {
  name: string;
  subcategories: BusinessSubCategory[];
}

@Component({
  selector: 'app-allocate-till',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './allocate-till.html',
  styles: ``
})
export class AllocateTillComponent {
  private router = inject(Router);

  // Form State
  businessName: string = '';
  selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedMcc: string = '';
  
  tillNumberType: 'generate' | 'reserved' = 'generate';
  generatedTillNumber: string = '';
  reservedTillNumber: string = '';
  
  notificationPhone: string = '';
  notificationEmail: string = '';
  notificationChannel: 'SMS' | 'Email' | 'Both' = 'Both';
  notificationLanguage: 'English' | 'French' | 'Swahili' = 'English';
  
  tillBankAccount: string = '';
  tillCommissionAccount: string = '';

  businessCategories: BusinessCategory[] = [
    {
      name: 'Retail',
      subcategories: [
        { name: 'Grocery Stores', mcc: '5411' },
        { name: 'Clothing Stores', mcc: '5651' },
        { name: 'Electronics Stores', mcc: '5732' }
      ]
    },
    {
      name: 'Hospitality',
      subcategories: [
        { name: 'Hotels', mcc: '7011' },
        { name: 'Restaurants', mcc: '5812' },
        { name: 'Fast Food', mcc: '5814' }
      ]
    },
    {
      name: 'Transport',
      subcategories: [
        { name: 'Taxi Services', mcc: '4121' },
        { name: 'Airlines', mcc: '4511' },
        { name: 'Bus Lines', mcc: '4131' }
      ]
    },
    {
      name: 'Professional Services',
      subcategories: [
        { name: 'Legal Services', mcc: '8111' },
        { name: 'Accounting', mcc: '8931' },
        { name: 'Consulting', mcc: '7392' }
      ]
    }
  ];

  // Mock accounts for dropdown
  mockAccounts = [
    { accountNumber: "8991127447", currency: "TZS" },
    { accountNumber: "8600000368", currency: "TZS" }
  ];

  get subCategories(): BusinessSubCategory[] {
    const category = this.businessCategories.find(c => c.name === this.selectedCategory);
    return category ? category.subcategories : [];
  }

  onSubCategoryChange() {
    const sub = this.subCategories.find(s => s.name === this.selectedSubCategory);
    this.selectedMcc = sub ? sub.mcc : '';
  }

  generateTillNumber() {
    this.generatedTillNumber = Math.floor(100000 + Math.random() * 900000).toString();
  }

  createTill() {
    // Simulate creation
    const tillNum = this.tillNumberType === 'generate' ? this.generatedTillNumber : this.reservedTillNumber;
    alert(`Till ${tillNum} allocation request submitted successfully!`);
    this.router.navigate(['/tills']);
  }

  cancel() {
    this.router.navigate(['/tills']);
  }

  goBack() {
    this.router.navigate(['/tills']);
  }
}
