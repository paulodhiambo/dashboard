import { Component } from '@angular/core';

@Component({
  selector: 'app-topnav',
  standalone: true,
  template: `
    <header class="fixed top-0 right-0 left-64 flex justify-between items-center w-[calc(100%-16rem)] h-16 px-8 z-50 bg-[#002C4D] shadow-sm border-b border-white/10">
      <!-- Search -->
      <div class="flex items-center flex-1">
        <div class="relative w-80">
          <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-lg">search</span>
          <input
            class="w-full bg-white/10 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-[#84BD00] focus:bg-white/20 focus:outline-none transition-colors"
            placeholder="Search portal..."
            type="text"
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-5">
        <div class="flex items-center space-x-3">
          <button class="relative text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10" title="Notifications">
            <span class="material-symbols-outlined">notifications</span>
            <span class="absolute top-1 right-1 w-2 h-2 bg-[#84BD00] rounded-full"></span>
          </button>
          <button class="text-white/80 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10" title="Help">
            <span class="material-symbols-outlined">help_outline</span>
          </button>
        </div>
        <div class="h-6 w-px bg-white/20"></div>
        <button class="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/10 transition-colors" title="Change Region">
          <img src="https://flagcdn.com/w40/tz.png" alt="Tanzania" class="w-5 h-auto rounded-[2px] shadow-sm border border-black/10">
          <span class="text-xs font-bold text-white/90">TZ</span>
          <span class="material-symbols-outlined text-[16px] text-white/50">arrow_drop_down</span>
        </button>
        <button class="text-sm font-bold text-white/80 hover:text-white transition-colors">Support</button>
      </div>
    </header>
  `,
})
export class TopnavComponent { }
