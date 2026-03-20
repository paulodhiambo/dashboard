import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-org-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './org-list.html',
})
export class OrgListComponent {}
