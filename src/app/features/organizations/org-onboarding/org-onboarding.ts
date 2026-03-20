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

@Component({
  selector: 'app-org-onboarding',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './org-onboarding.html',
})
export class OrgOnboardingComponent {
  currentStep = 6; // Default to 6
  steps = [1, 2, 3, 4, 5, 6];
  searchType: 'account' | 'paybill' | 'registration' | 'phone' = 'phone';

  mockCustomerInfo: CustomerData = {
    customerName: "BARABWIRIZA APOLLINAIRE",
    customerDateOfBirth: "1970-01-01",
    customerMobileNo: "25776835442, 22254851, 78835442",
    customerEmail: "Not Provided",
    customerLegalId: "0201102971",
    customerLegalDocName: "NATIONAL.ID",
    customerDao: "4750",
    customerTown: "BUJUMBURA",
    customerStreet: "KIBENGA RURAL, No 3",
    customerNo: "3188384",
    customerRiskClassification: "HIGH",
    accounts: [
      {
        accountNumber: "6691127447",
        accountTitle: "BARABWIRIZA APOLLINAIRE",
        currency: "BIF",
        alternateAccountNumber: ""
      },
      {
        accountNumber: "6600000368",
        accountTitle: "BARABWIRIZA APOLLINAIRE",
        currency: "BIF",
        alternateAccountNumber: ""
      }
    ]
  };

  selectedAccount: string = "6600000368";

  // Step 3: Directors State
  directors: Director[] = [
    {
      id: "DIR-001",
      fullName: "BARABWIRIZA APOLLINAIRE",
      idNumber: "0201102971",
      nationality: "Kenyan",
      kraPin: "A001234567Z",
      phoneNumber: "25776835442",
      email: "b.apollinaire@example.com",
      role: "Managing Director",
      isPrimary: true
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

  get progressPercentage(): number {
    return (this.currentStep / this.steps.length) * 100;
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
