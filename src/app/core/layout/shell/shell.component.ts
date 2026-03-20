import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, TopnavComponent],
  template: `
    <div class="flex h-screen overflow-hidden bg-background">
      <app-sidenav />
      <div class="flex-1 flex flex-col ml-64 overflow-hidden">
        <app-topnav />
        <main class="flex-1 overflow-y-auto pt-16">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
})
export class ShellComponent {}
