// Authentication functions for frontend

const API_URL = 'http://localhost:8000/api';
const OAUTH_BASE_URL = 'http://localhost:8000';

function getFrontendBaseUrl() {
    const currentPath = window.location.pathname;
    const lastSlashIndex = currentPath.lastIndexOf('/');
    const basePath = lastSlashIndex >= 0 ? currentPath.slice(0, lastSlashIndex) : '';

    return `${window.location.origin}${basePath}`;
}

function redirectToOAuth(provider) {
    const frontendUrl = encodeURIComponent(getFrontendBaseUrl());
    window.location.href = `${OAUTH_BASE_URL}/${provider}/redirect?frontend_url=${frontendUrl}`;
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user');
}

/**
 * Get current user from localStorage
 */
function getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

/**
 * Update user menu in navbar
 */
function updateUserMenu() {
    const user = getCurrentUser();
    const container = document.getElementById('user-menu-container');
    
    if (!container) return;
    
    if (isLoggedIn() && user) {
        const userInitial = user.name.charAt(0).toUpperCase();
        
        container.innerHTML = `
            <div class="relative group">
                <button class="flex items-center gap-3 p-1.5 rounded-xl hover:bg-cream/50 dark:hover:bg-primary-dark/10 transition-colors border border-primary/20 hover:border-primary/40">
                    <div class="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-cream font-semibold text-sm shadow-md shadow-primary/20">
                        ${userInitial}
                    </div>
                    <span class="hidden md:block text-sm font-bold text-gray-800 dark:text-gray-200">${user.name}</span>
                    <svg class="w-4 h-4 text-primary dark:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                
                <!-- Dropdown Menu -->
                <div class="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-primary/10 dark:border-gray-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div class="px-5 py-4 border-b border-cream/50 dark:border-gray-700">
                        <p class="text-base font-bold text-gray-800 dark:text-white truncate">${user.name}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">${user.email}</p>
                    </div>
                    <a href="profile.html" class="flex items-center gap-4 px-5 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-cream hover:dark:bg-gray-700/50 hover:shadow-sm transition-all rounded-xl mx-1 my-1">
                        <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                        Profil Saya
                    </a>
                    <button onclick="logout()" class="w-full flex items-center gap-4 px-5 py-3 text-sm font-semibold text-primary-dark hover:bg-cream/70 dark:hover:bg-gray-700/50 hover:shadow-sm transition-all rounded-xl mx-1 my-1 group">
                        <svg class="w-5 h-5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                        </svg>
                        Keluar
                    </button>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="flex items-center gap-3">
                <a href="login.html" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-bold text-sm border-b border-transparent hover:border-primary/50 transition-all">Masuk</a>
                <a href="register.html" class="bg-primary hover:bg-primary-dark text-cream px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200">Daftar</a>
            </div>
        `;
    }
}

/**
 * Logout user
 */
async function logout() {
    try {
        await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        });
    } catch (error) {
        // Continue with logout even if API fails
    }
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
}

/**
 * Update navbar based on auth state
 */
function updateNavbar() {
    updateUserMenu();
}

/**
 * Fetch user data from API
 */
async function fetchUserData(token) {
    try {
        const response = await fetch(`${API_URL}/user`, {
            headers: { 
                'Authorization': 'Bearer ' + token, 
                'Accept': 'application/json' 
            }
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data.user));
            updateNavbar();
            // Clean URL params
            window.history.replaceState({}, document.title, window.location.pathname);
            return true;
        } else {
            console.error('Failed to fetch user:', data);
            return false;
        }
    } catch (error) {
        console.error('Fetch user error:', error);
        return false;
    }
}

// Run on page load if DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Handle OAuth token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const resetEmail = urlParams.get('email');
    const isResetPasswordPage = window.location.pathname.includes('reset-password.html');
    const hasResetPasswordParams = isResetPasswordPage && token && resetEmail;
    if (token && !hasResetPasswordParams) {
        localStorage.setItem('token', token);
        fetchUserData(token);
    }
    
    // Redirect if logged in on auth pages
    if (
        isLoggedIn() &&
        !hasResetPasswordParams &&
        (
            window.location.pathname.includes('login.html') ||
            window.location.pathname.includes('register.html') ||
            window.location.pathname.includes('forgot-password.html') ||
            window.location.pathname.includes('reset-password.html')
        )
    ) {
        window.location.href = 'index.html';
    }
    
    updateNavbar();
});

/**
 * Send password reset email
 */
async function sendPasswordResetEmail(email) {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ email })
    });
    
    return await response.json();
}

/**
 * Reset password with token
 */
async function resetPassword(token, email, password, passwordConfirmation) {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ 
            token, 
            email, 
            password, 
            password_confirmation: passwordConfirmation 
        })
    });
    
    return await response.json();
}

/**
 * Login with Google
 */
function loginWithGoogle() {
    redirectToOAuth('google');
}

/**
 * Login with Facebook
 */
function loginWithFacebook() {
    redirectToOAuth('facebook');
}

/**
 * Register with Google
 */
function registerWithGoogle() {
    redirectToOAuth('google');
}

/**
 * Register with Facebook
 */
function registerWithFacebook() {
    redirectToOAuth('facebook');
}
