import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-org-onboarding',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './org-onboarding.html',
})
export class OrgOnboardingComponent {
  currentStep = 1;
  steps = [1, 2, 3, 4, 5, 6, 7, 8];

  get progressPercentage(): number {
    return (this.currentStep / this.steps.length) * 100;
  }

  get stepTitle(): string {
    switch (this.currentStep) {
      case 1: return 'Search Bank Account';
      case 2: return 'Account Found';
      case 8: return 'Preview & Submit';
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
}
