/* ==========================================================================
   Govt. Graduate College Hafizabad - Main Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initScrollTop();
  initQuickSearch();
  initNoticeTicker();
  highlightActiveNavLink();
  initGlobalModals();
});

// Toast Notification System
function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: 'fa-check-circle text-emerald-500',
    info: 'fa-info-circle text-blue-500',
    warning: 'fa-exclamation-triangle text-amber-500',
    error: 'fa-times-circle text-red-500'
  };

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <i class="fas ${icons[type] || icons.info} text-xl"></i>
    <div class="flex-1 text-sm font-medium">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-gray-400 hover:text-gray-600">
      <i class="fas fa-times text-xs"></i>
    </button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Dark / Light Mode Toggle
function initTheme() {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('ggc_theme') || 'light';

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcons(true);
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      localStorage.setItem('ggc_theme', isDark ? 'dark' : 'light');
      updateThemeIcons(isDark);
      showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info', 2000);
    });
  });
}

function updateThemeIcons(isDark) {
  document.querySelectorAll('.theme-toggle-btn i').forEach(icon => {
    if (isDark) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun', 'text-amber-400');
    } else {
      icon.classList.remove('fa-sun', 'text-amber-400');
      icon.classList.add('fa-moon');
    }
  });
}

// Mobile Menu Navigation
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }

  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }
}

// Back to Top Button
function initScrollTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Notice Marquee
function initNoticeTicker() {
  const tickerEl = document.getElementById('notice-ticker');
  if (!tickerEl || typeof COLLEGE_DATA === 'undefined') return;

  const urgentNotices = COLLEGE_DATA.notices.map(n => 
    `<span class="mx-6 inline-flex items-center gap-2 cursor-pointer hover:underline text-amber-300" onclick="viewNoticeModal(${n.id})">
      <i class="fas fa-bullhorn text-xs"></i> ${n.title}
    </span>`
  ).join('');

  tickerEl.innerHTML = urgentNotices + urgentNotices;
}

// Highlight Active Nav Link
function highlightActiveNavLink() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || 'index.html';
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Global Notice Details Modal
function viewNoticeModal(noticeId) {
  if (typeof COLLEGE_DATA === 'undefined') return;
  const notice = COLLEGE_DATA.notices.find(n => n.id === noticeId);
  if (!notice) return;

  const modal = document.getElementById('global-modal');
  const modalContent = document.getElementById('global-modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between border-b pb-4 mb-4">
        <div>
          <span class="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase rounded-full mb-2">
            ${notice.category}
          </span>
          <h3 class="text-xl font-bold text-gray-900">${notice.title}</h3>
          <p class="text-xs text-gray-500 mt-1"><i class="far fa-calendar-alt mr-1"></i> Issued Date: ${notice.date}</p>
        </div>
        <button onclick="closeGlobalModal()" class="text-gray-400 hover:text-gray-600 text-xl font-bold p-2">
          &times;
        </button>
      </div>

      <div class="prose text-gray-700 text-sm leading-relaxed mb-6">
        <p class="font-medium text-gray-900 mb-2">${notice.summary}</p>
        <p>${notice.details}</p>
      </div>

      <div class="bg-gray-50 rounded-xl p-4 border flex items-center justify-between flex-wrap gap-4">
        <div class="flex items-center gap-3">
          <i class="far fa-file-pdf text-red-500 text-3xl"></i>
          <div>
            <div class="text-xs font-bold text-gray-800">Official_Notification_${notice.id}.pdf</div>
            <div class="text-xs text-gray-500">Government Notification • Size: 245 KB</div>
          </div>
        </div>
        <div class="flex gap-2">
          <button onclick="window.print()" class="px-3 py-1.5 text-xs font-semibold bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            <i class="fas fa-print mr-1"></i> Print
          </button>
          <button onclick="downloadFakePdf('${notice.title}')" class="px-4 py-1.5 text-xs font-semibold bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 shadow">
            <i class="fas fa-download mr-1"></i> Download Circular
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeGlobalModal() {
  const modal = document.getElementById('global-modal');
  if (modal) modal.classList.remove('active');
}

function initGlobalModals() {
  const modal = document.getElementById('global-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeGlobalModal();
    });
  }
}

function downloadFakePdf(title) {
  showToast(`Downloading official circular: "${title.substring(0, 30)}..."`, 'success');
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('GOVERNMENT GRADUATE COLLEGE HAFIZABAD\n\nOfficial Circular: ' + title + '\nIssued by Order of Principal\nDate: ' + new Date().toLocaleDateString()));
  element.setAttribute('download', 'GGC_Hafizabad_Notice.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

// Quick Universal Search Modal (Ctrl + K)
function initQuickSearch() {
  const searchBtn = document.getElementById('quick-search-trigger');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('quick-search-input');
  const searchResults = document.getElementById('quick-search-results');

  if (!searchModal) return;

  function openSearch() {
    searchModal.classList.add('active');
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }

  function closeSearch() {
    searchModal.classList.remove('active');
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    }
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });

  const searchCloseBtn = document.getElementById('close-search-btn');
  if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  if (searchInput && searchResults && typeof COLLEGE_DATA !== 'undefined') {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (q.length < 2) {
        searchResults.innerHTML = `<div class="p-8 text-center text-gray-400 text-sm">Type program name, faculty member, or notice keyword...</div>`;
        return;
      }

      // Search programs
      const matchedPrograms = COLLEGE_DATA.programs.filter(p => 
        p.title.toLowerCase().includes(q) || p.department.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );

      // Search faculty
      const matchedFaculty = COLLEGE_DATA.faculty.filter(f => 
        f.name.toLowerCase().includes(q) || f.department.toLowerCase().includes(q) || f.role.toLowerCase().includes(q)
      );

      // Search facilities
      const matchedFacilities = COLLEGE_DATA.facilities.filter(f => 
        f.title.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
      );

      let html = '';

      if (matchedPrograms.length > 0) {
        html += `<div class="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 rounded uppercase tracking-wider">Programs (${matchedPrograms.length})</div>`;
        matchedPrograms.slice(0, 4).forEach(p => {
          html += `
            <a href="academics.html" class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition border-b border-gray-100">
              <div>
                <div class="font-semibold text-sm text-gray-900">${p.title}</div>
                <div class="text-xs text-gray-500">${p.department} • ${p.duration}</div>
              </div>
              <span class="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">${p.level.toUpperCase()}</span>
            </a>
          `;
        });
      }

      if (matchedFaculty.length > 0) {
        html += `<div class="px-4 py-2 mt-3 text-xs font-bold text-amber-800 bg-amber-50 rounded uppercase tracking-wider">Faculty Members (${matchedFaculty.length})</div>`;
        matchedFaculty.slice(0, 4).forEach(f => {
          html += `
            <a href="faculty.html" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition border-b border-gray-100">
              <div class="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                ${f.name.charAt(f.name.indexOf(' ') + 1) || 'F'}
              </div>
              <div>
                <div class="font-semibold text-sm text-gray-900">${f.name}</div>
                <div class="text-xs text-gray-500">${f.role} - Department of ${f.department}</div>
              </div>
            </a>
          `;
        });
      }

      if (matchedFacilities.length > 0) {
        html += `<div class="px-4 py-2 mt-3 text-xs font-bold text-blue-800 bg-blue-50 rounded uppercase tracking-wider">Facilities (${matchedFacilities.length})</div>`;
        matchedFacilities.slice(0, 3).forEach(f => {
          html += `
            <a href="facilities.html" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition border-b border-gray-100">
              <i class="fas ${f.icon} text-emerald-700 text-base"></i>
              <div>
                <div class="font-semibold text-sm text-gray-900">${f.title}</div>
                <div class="text-xs text-gray-500">${f.category}</div>
              </div>
            </a>
          `;
        });
      }

      if (!html) {
        html = `<div class="p-8 text-center text-gray-500 text-sm">No results found for "${q}". Try another term.</div>`;
      }

      searchResults.innerHTML = html;
    });
  }
}

// Animated Numbers
function animateCounters() {
  const counters = document.querySelectorAll('.stat-counter');
  counters.forEach(counter => {
    const target = counter.innerText;
    // Clean target
    const numeric = parseInt(target.replace(/[^0-9]/g, ''));
    if (isNaN(numeric)) return;

    let count = 0;
    const speed = Math.ceil(numeric / 40);
    const updateCount = () => {
      count += speed;
      if (count < numeric) {
        counter.innerText = count + (target.includes('+') ? '+' : (target.includes('%') ? '%' : ''));
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}

// Generic Form Handler with Validation
function handleFormSubmit(event, formName = 'Inquiry') {
  event.preventDefault();
  const form = event.target;
  
  // Basic validation
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('border-red-500');
    } else {
      input.classList.remove('border-red-500');
    }
  });

  if (!isValid) {
    showToast('Please fill in all required fields accurately.', 'warning');
    return false;
  }

  showToast(`${formName} received successfully! Our admission office will get back to you.`, 'success');
  form.reset();
  return true;
}
