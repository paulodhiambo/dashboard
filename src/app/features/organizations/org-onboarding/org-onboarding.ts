import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
interface Account {
  accountNumber: string;
  accountTitle: string;
  currency: string;
  alternateAccountNumber: string;
}

interface CustomerData {
  customerName: string;
  customerDateOfBirth: string;
  customerMobileNo: string;
  customerEmail: string;
  customerLegalId: string;
  customerLegalDocName: string;
  customerDao: string;
  customerTown: string;
  customerStreet: string;
  customerNo: string;
  customerRiskClassification: string;
  accounts: Account[];
}

export interface Director {
  id: string;
  fullName: string;
  idNumber: string;
  nationality: string;
  kraPin: string;
  phoneNumber: string;
  email: string;
  role: string;
  isPrimary: boolean;
}

interface BusinessSubCategory {
  name: string;
  mcc: string;
}

interface BusinessCategory {
  name: string;
  subcategories: BusinessSubCategory[];
}

@Component({
  selector: 'app-org-onboarding',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './org-onboarding.html',
})
export class OrgOnboardingComponent {
  currentStep = 1; // Default to 6
  steps = [1, 2, 3, 4, 5, 6];
  searchType: 'account' = 'account';

  mockCustomerInfo: CustomerData = {
    customerName: "John Doe",
    customerDateOfBirth: "1970-01-01",
    customerMobileNo: "25776835442, 22254851, 78835442",
    customerEmail: "Not Provided",
    customerLegalId: "0201102971",
    customerLegalDocName: "NATIONAL.ID",
    customerDao: "4750",
    customerTown: "Dodoma",
    customerStreet: "KIBENGA RURAL, No 3",
    customerNo: "31883845",
    customerRiskClassification: "HIGH",
    accounts: [
      {
        accountNumber: "8991127447",
        accountTitle: "John Doe",
        currency: "TZS",
        alternateAccountNumber: ""
      },
      {
        accountNumber: "8600000368",
        accountTitle: "John Doe",
        currency: "TZS",
        alternateAccountNumber: ""
      }
    ]
  };

  selectedAccount: string = "8600000368";

  // Step 3: Directors State
  directors: Director[] = [
    {
      id: "DIR-001",
      fullName: "John Doe",
      idNumber: "0201102971",
      nationality: "Tanzanian",
      kraPin: "A001234567Z",
      phoneNumber: "25776835442",
      email: "b.apollinaire@example.com",
      role: "Managing Director",
      isPrimary: true
    }
  ];

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

  showDirectorForm: boolean = false;
  editingDirector: Director | null = null;
  newDirector: Director = this.getEmptyDirector();



  // Step 4: Communication & Settings State
  orgShortCode: string = '';
  notificationPhone: string = '';
  notificationEmail: string = '';
  notificationLanguage: 'English' | 'French' | 'Swahili' = 'English';
  notificationChannel: 'SMS' | 'Email' | 'Both' = 'Both';

  // Step 5: Till Creation State
  businessName: string = '';
  tillName: string = '';
  tillNumberType: 'generate' | 'reserved' = 'generate';
  reservedTillNumber: string = '';
  generatedTillNumber: string = '';
  tillNotificationPhone: string = '';
  tillNotificationEmail: string = '';
  tillNotificationChannel: 'SMS' | 'Email' | 'Both' = 'Both';
  tillNotificationLanguage: 'English' | 'French' | 'Swahili' = 'English';
  tillBankAccount: string = '';
  tillCommissionAccount: string = '';

  selectedCategory: string = '';
  selectedSubCategory: string = '';
  selectedMcc: string = '';

  get subCategories(): BusinessSubCategory[] {
    const category = this.businessCategories.find(c => c.name === this.selectedCategory);
    return category ? category.subcategories : [];
  }

  onSubCategoryChange() {
    const sub = this.subCategories.find(s => s.name === this.selectedSubCategory);
    this.selectedMcc = sub ? sub.mcc : '';
  }

  get progressPercentage(): number {
    return Math.round((this.currentStep / this.steps.length) * 100);
  }

  get stepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Search Bank Account';
      case 2: return 'Account Found';
      case 3: return 'Organization Directors';
      case 4: return 'Communication Settings';
      case 5: return 'Till Creation';
      case 6: return 'Preview & Submit';
      default: return `Step ${this.currentStep} Details`;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step >= 1 && step <= this.steps.length) {
      this.currentStep = step;
    }
  }

  // --- Director Management Methods --- //

  getEmptyDirector(): Director {
    return {
      id: `DIR-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      fullName: '',
      idNumber: '',
      nationality: 'Kenyan',
      kraPin: '',
      phoneNumber: '',
      email: '',
      role: 'Director',
      isPrimary: false
    };
  }

  openAddDirector() {
    this.editingDirector = null;
    this.newDirector = this.getEmptyDirector();
    this.showDirectorForm = true;
  }

  openEditDirector(director: Director) {
    this.editingDirector = director;
    this.newDirector = { ...director };
    this.showDirectorForm = true;
  }

  cancelDirectorForm() {
    this.showDirectorForm = false;
    this.editingDirector = null;
  }

  saveDirector() {
    if (this.editingDirector) {
      // Update existing
      const idx = this.directors.findIndex(d => d.id === this.editingDirector!.id);
      if (idx !== -1) {
        this.directors[idx] = { ...this.newDirector };
      }
    } else {
      // Add new
      this.directors.push({ ...this.newDirector });
    }
    this.showDirectorForm = false;
    this.editingDirector = null;
  }

  deleteDirector(id: string) {
    this.directors = this.directors.filter(d => d.id !== id);
  }

  // --- Step 4 Methods --- //

  generateShortCode() {
    // Generates a random 5 digit shortcode
    this.orgShortCode = Math.floor(10000 + Math.random() * 90000).toString();
  }

  // --- Step 5 Methods --- //
  generateTillNumber() {
    // Generates a random 6 digit till number
    this.generatedTillNumber = Math.floor(100000 + Math.random() * 900000).toString();
  }
}
