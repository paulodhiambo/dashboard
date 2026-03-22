import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-reserve-till',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reserve-till.html',
  styles: ``
})
export class ReserveTillComponent {
  private router = inject(Router);

  accountNumber: string = '';
  isSearching: boolean = false;
  accountInfo: any = null;
  isSliderOpen: boolean = false;
  tillNumberToReserve: string = '';

  searchAccount() {
    if (!this.accountNumber.trim()) return;

    this.isSearching = true;
    this.accountInfo = {
      name: 'John Doe',
      accountNumber: this.accountNumber,
      type: 'CURRENT ACCOUNT',
      currency: 'TZS',
      branch: 'Dodoma MAIN',
      status: 'ACTIVE'
    };
    this.isSearching = false;
  }

  proceedToReserve() {
    this.isSliderOpen = true;
  }

  closeSlider() {
    this.isSliderOpen = false;
  }

  submitReservation() {
    if (!this.tillNumberToReserve.trim()) return;

    // Simulate reservation
    alert(`Till ${this.tillNumberToReserve} successfully reserved for account ${this.accountInfo.accountNumber}`);
    this.isSliderOpen = false;
    this.router.navigate(['/tills']);
  }

  goBack() {
    this.router.navigate(['/tills']);
  }
}
