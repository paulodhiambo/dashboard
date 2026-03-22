import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './user-add.html',
  styles: ``,
})
export class UserAdd {
  branch: string = '';
}
