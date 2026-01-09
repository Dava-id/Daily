// Inisialisasi hearts di background
function createHearts() {
    const heartsContainer = document.querySelector('.hearts-container');
    const heartCount = 50;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        
        // Posisi random
        const left = Math.random() * 100;
        const delay = Math.random() * 8;
        const duration = 8 + Math.random() * 5;
        const size = 15 + Math.random() * 20;
        
        heart.style.left = `${left}%`;
        heart.style.animationDelay = `${delay}s`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.fontSize = `${size}px`;
        
        heartsContainer.appendChild(heart);
    }
}

// Navbar hamburger menu
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Tutup menu saat klik link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Hitung waktu cinta dengan perhitungan yang benar
function calculateLoveTime() {
    // Senin, Rabu, Jumat: 60 menit call, 60 menit nugas, 240 menit inten per hari
    const mwfCall = 60; // menit call per hari
    const mwfTask = 60; // menit nugas per hari
    const mwfInten = 240; // menit inten per hari (16:00-20:00)
    const mwfDays = 3; // hari per minggu
    
    // Selasa, Kamis: 160 menit call, 120+ menit nugas per hari
    const ttCall = 160; // menit call per hari (100+60)
    const ttTask = 120; // menit nugas per hari
    const ttDays = 2; // hari per minggu
    
    // Total per minggu
    const totalCallWeekly = (mwfCall * mwfDays) + (ttCall * ttDays);
    const totalTaskWeekly = (mwfTask * mwfDays) + (ttTask * ttDays);
    const totalIntenWeekly = (mwfInten * mwfDays);
    
    return {
        call: totalCallWeekly,
        task: totalTaskWeekly,
        inten: totalIntenWeekly
    };
}

// Update counter dengan animasi
function updateCounter(elementId, targetValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let currentValue = 0;
    const increment = targetValue / 100;
    const duration = 1500; // ms
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentValue);
    }, stepTime);
}

// Setup love counter di halaman utama
function setupLoveCounter() {
    const calculateBtn = document.getElementById('calculateLove');
    const callCounter = document.getElementById('callCounter');
    const taskCounter = document.getElementById('taskCounter');
    const intenCounter = document.getElementById('intenCounter');
    const loveCounter = document.getElementById('loveCounter');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const times = calculateLoveTime();
            
            updateCounter('callCounter', times.call);
            updateCounter('taskCounter', times.task);
            
            // Tambah counter untuk inten jika ada
            if (intenCounter) {
                updateCounter('intenCounter', times.inten);
            }
            
            // Counter cinta tak terhingga
            let loveValue = 0;
            const loveIncrement = 100;
            const loveInterval = setInterval(() => {
                loveValue += loveIncrement;
                if (loveCounter) {
                    loveCounter.textContent = loveValue + "+";
                    
                    if (loveValue >= 10000) {
                        loveCounter.textContent = "∞";
                        clearInterval(loveInterval);
                    }
                }
            }, 50);
            
            // Tombol berubah setelah diklik
            calculateBtn.textContent = "❤ Waktu Cinta Dihitung! ❤";
            calculateBtn.disabled = true;
            setTimeout(() => {
                calculateBtn.textContent = "Hitung Ulang Waktu Cinta";
                calculateBtn.disabled = false;
            }, 3000);
        });
    }
    
    // Update total di halaman routine jika ada
    const totalCallElement = document.getElementById('totalCall');
    const totalTaskElement = document.getElementById('totalTask');
    const totalIntenElement = document.getElementById('totalInten');
    
    if (totalCallElement && totalTaskElement) {
        const times = calculateLoveTime();
        totalCallElement.textContent = times.call;
        totalTaskElement.textContent = times.task + "+";
        if (totalIntenElement) {
            totalIntenElement.textContent = times.inten;
        }
    }
}

// Tab system untuk daily routine
function setupRoutineTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const routineDays = document.querySelectorAll('.routine-day');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Hapus active dari semua tab
                tabBtns.forEach(b => b.classList.remove('active'));
                routineDays.forEach(day => day.classList.remove('active'));
                
                // Tambah active ke tab yang diklik
                btn.classList.add('active');
                
                // Tampilkan konten yang sesuai
                const dayId = btn.getAttribute('data-day');
                document.getElementById(dayId).classList.add('active');
            });
        });
    }
}

// Filter untuk galeri
function setupGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Hapus active dari semua filter
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Tambah active ke filter yang diklik
                btn.classList.add('active');
                
                // Filter galeri
                const filter = btn.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
}

// Tambah memori baru di galeri
function setupAddMemory() {
    const addMemoryBtn = document.getElementById('addMemoryBtn');
    
    if (addMemoryBtn) {
        addMemoryBtn.addEventListener('click', () => {
            // Buat notifikasi
            const notification = document.createElement('div');
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #ff4d8d;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(255, 77, 141, 0.3);
                z-index: 1000;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideIn 0.5s ease;
            `;
            
            notification.innerHTML = `
                <i class="fas fa-heart"></i>
                <span>Fitur upload foto akan segera tersedia! ❤</span>
            `;
            
            document.body.appendChild(notification);
            
            // Hapus notifikasi setelah 3 detik
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
            
            // Tambah animasi CSS untuk notifikasi
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        });
    }
}

// Highlight nav link berdasarkan halaman aktif
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Inisialisasi semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    createHearts();
    setupHamburgerMenu();
    setupLoveCounter();
    setupRoutineTabs();
    setupGalleryFilter();
    setupAddMemory();
    highlightActiveNav();
    
    // Tambah efek khusus untuk halaman routine
    if (document.querySelector('.routine-day')) {
        // Tambah animasi untuk time cards
        const timeCards = document.querySelectorAll('.time-card');
        timeCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('fade-in');
        });
        
        // Tambah style untuk animasi fade-in
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                animation: fadeIn 0.5s ease forwards;
                opacity: 0;
            }
            
            @keyframes fadeIn {
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Tambah tahun terkini di footer copyright
    const copyrightElements = document.querySelectorAll('.footer-copyright');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(el => {
        el.textContent = el.textContent.replace('2023', currentYear);
    });
    
    // Tampilkan perhitungan waktu otomatis di halaman routine
    const times = calculateLoveTime();
    const totalCallElement = document.getElementById('totalCall');
    const totalTaskElement = document.getElementById('totalTask');
    const totalIntenElement = document.getElementById('totalInten');
    
    if (totalCallElement) totalCallElement.textContent = times.call;
    if (totalTaskElement) totalTaskElement.textContent = times.task + "+";
    if (totalIntenElement) totalIntenElement.textContent = times.inten;
});