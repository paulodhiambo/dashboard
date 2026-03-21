import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="fixed left-0 top-0 h-full z-40 flex flex-col bg-slate-50 h-screen w-64 border-r border-slate-200 tonal-layering-no-border">
      <!-- Brand -->
      <div class="p-6 border-b border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-primary-container rounded flex items-center justify-center">
            <span class="material-symbols-outlined text-white text-xl">account_balance_wallet</span>
          </div>
          <div>
            <h1 class="text-base font-bold tracking-widest uppercase text-green-800 font-headline leading-tight">KCB Group</h1>
            <p class="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">Merchant Portal</p>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        @for (item of navItems; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="text-green-800 font-bold border-r-4 border-green-700 bg-white/60"
            [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' }"
            class="flex items-center px-4 py-3 rounded-l-sm text-slate-500 hover:text-green-700 hover:bg-slate-100 transition-all duration-200 group"
          >
            <span class="material-symbols-outlined mr-4 text-xl">{{ item.icon }}</span>
            <span class="font-label text-sm font-medium tracking-[0.05em]">{{ item.label }}</span>
          </a>
        }
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-slate-100">
        <div class="flex items-center space-x-3 p-3 rounded-lg bg-surface-container-low">
          <div class="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            <span class="material-symbols-outlined text-base">person</span>
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold truncate text-on-surface">Admin User</p>
            <p class="text-[10px] text-slate-500 truncate">Master Authority</p>
          </div>
          <button class="ml-auto text-slate-400 hover:text-error transition-colors" title="Logout">
            <span class="material-symbols-outlined text-base">logout</span>
          </button>
        </div>
      </div>
    </aside>
  `,
})
export class SidenavComponent {
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Organizations', icon: 'corporate_fare', route: '/organizations' },
    { label: 'Till Management', icon: 'point_of_sale', route: '/tills' },
    { label: 'Users', icon: 'group', route: '/users' },
    { label: 'Service Requests', icon: 'rule_folder', route: '/approvals' },
    { label: 'Products & Charges', icon: 'inventory_2', route: '/products' }
  ];
}
