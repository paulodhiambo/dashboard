import { Component } from '@angular/core';

@Component({
  selector: 'app-topnav',
  standalone: true,
  template: `
    <header class="fixed top-0 right-0 left-64 flex justify-between items-center w-[calc(100%-16rem)] h-16 px-8 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-100">
      <!-- Search -->
      <div class="flex items-center flex-1">
        <div class="relative w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
          <input
            class="w-full bg-surface-container-low border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-container focus:outline-none"
            placeholder="Search portal..."
            type="text"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-5">
        <div class="flex items-center space-x-3">
          <button class="relative text-slate-600 hover:text-green-700 transition-colors p-1.5 rounded-full hover:bg-slate-100" title="Notifications">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-1 right-1 w-2 h-2 bg-tertiary rounded-full"></span>
          </button>
          <button class="text-slate-600 hover:text-green-700 transition-colors p-1.5 rounded-full hover:bg-slate-100" title="Help">
            <span class="material-symbols-outlined">help_outline</span>
          </button>
        </div>
        <div class="h-6 w-px bg-slate-200"></div>
        <button class="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-slate-100 transition-colors" title="Change Region">
          <img src="https://flagcdn.com/w40/tz.png" alt="Tanzania" class="w-5 h-auto rounded-[2px] shadow-sm border border-black/10">
          <span class="text-xs font-bold text-slate-600">TZ</span>
          <span class="material-symbols-outlined text-[16px] text-slate-400">arrow_drop_down</span>
        </button>
        <button class="text-sm font-bold text-slate-600 hover:text-green-700 transition-colors">Support</button>
      </div>
    </header>
  `,
})
export class TopnavComponent { }
