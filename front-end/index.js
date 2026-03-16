const html = document.documentElement;
        const icon = document.getElementById('toggle-icon');
        const checkbox = document.getElementById('dark-toggle');

        function toggleDarkMode() {
            if (checkbox.checked) {
                html.classList.add('dark');
                icon.innerText = '🌙';
                localStorage.setItem('theme', 'dark');
            } else {
                html.classList.remove('dark');
                icon.innerText = '☀️';
                localStorage.setItem('theme', 'light');
            }
        }

        // Cek preferensi saat halaman dimuat
        function initTheme() {
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                html.classList.add('dark');
                checkbox.checked = true;
                icon.innerText = '🌙';
            } else {
                html.classList.remove('dark');
                checkbox.checked = false;
                icon.innerText = '☀️';
            }
        }

        initTheme();