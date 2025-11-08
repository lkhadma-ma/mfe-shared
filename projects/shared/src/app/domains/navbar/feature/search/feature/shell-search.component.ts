import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'mfe-company-navbar-search',
    imports: [CommonModule],
    template: `
        <div class="relative">
            <!-- Search Results Dropdown -->
            <div *ngIf="isOpen" class="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <!-- Quick Actions -->
                <div class="p-3 border-b border-gray-100">
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Quick Actions</div>
                    <div class="space-y-1">
                        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2">
                            <svg class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Create new document
                        </button>
                    </div>
                </div>

                <!-- Recent Searches -->
                <div class="p-3 border-b border-gray-100">
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Recent Searches</div>
                    <div class="space-y-1">
                        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between">
                            <span>User authentication</span>
                            <span class="text-xs text-gray-400">2h ago</span>
                        </button>
                        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md flex items-center justify-between">
                            <span>API documentation</span>
                            <span class="text-xs text-gray-400">1d ago</span>
                        </button>
                    </div>
                </div>

                <!-- Popular Searches -->
                <div class="p-3">
                    <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Popular Searches</div>
                    <div class="space-y-1">
                        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                            Getting started guide
                        </button>
                        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                            Installation tutorial
                        </button>
                        <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
                            Troubleshooting common issues
                        </button>
                    </div>
                </div>

                <!-- Keyboard Shortcut Hint -->
                <div class="p-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
                    <div class="flex items-center justify-between text-xs text-gray-500">
                        <span>Press Enter to search</span>
                        <div class="flex items-center gap-1">
                            <kbd class="px-2 py-1 text-xs font-semibold text-gray-600 bg-white border border-gray-300 rounded">⌘K</kbd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
})

export class SearchComponent {
    isOpen = false;

    open() {
        this.isOpen = true;
        console.log('Search opened');
    }

    close() {
        // Add a small delay to allow clicking on results
        setTimeout(() => {
            this.isOpen = false;
            console.log('Search closed');
        }, 150);
    }
}