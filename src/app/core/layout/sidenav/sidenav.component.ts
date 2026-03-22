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
    <aside class="fixed left-0 top-0 h-full z-40 flex flex-col bg-[#002C4D] h-screen w-64 border-r border-white/10 tonal-layering-no-border">
      <!-- Brand -->
      <div class="p-6 border-b border-white/10">
        <img src="https://raw.githubusercontent.com/paulodhiambo/gstreamconfserver/refs/heads/main/portal-logo.png" alt="Merchant Portal Logo" class="h-10 w-auto object-contain">
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        @for (item of navItems; track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="bg-white/10 text-white font-bold border-l-4 border-[#8cc63f]"
            [routerLinkActiveOptions]="{ exact: item.route === '/dashboard' }"
            class="flex items-center px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 group"
          >
            <span class="material-symbols-outlined mr-4 text-xl">{{ item.icon }}</span>
            <span class="font-label text-sm font-medium tracking-[0.05em]">{{ item.label }}</span>
          </a>
        }
      </nav>

      <!-- User Profile -->
      <div class="p-4 border-t border-white/10">
        <div class="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
          <div class="w-9 h-9 rounded-full bg-[#8cc63f] flex items-center justify-center text-[#002C4D] font-bold text-sm flex-shrink-0">
            <span class="material-symbols-outlined text-base">person</span>
          </div>
          <div class="overflow-hidden">
            <p class="text-xs font-bold truncate text-white">Admin User</p>
            <p class="text-[10px] text-white/50 truncate">Master Authority</p>
          </div>
          <button class="ml-auto text-white/40 hover:text-[#8cc63f] transition-colors" title="Logout">
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
