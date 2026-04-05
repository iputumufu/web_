document.addEventListener('DOMContentLoaded', () => {
    const messagesEl = document.getElementById('chat-messages');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const submitButton = document.getElementById('chat-submit');
    const feedback = document.getElementById('chat-feedback');
    const serverNoticeText = document.getElementById('server-notice-text');
    const historyList = document.getElementById('history-list');
    const tabButtons = document.querySelectorAll('.chat-tab');
    const plusButton = document.getElementById('chat-plus');
    const floatingChatLabel = document.getElementById('floating-chat-label');
    const floatingChatButton = document.getElementById('floating-chat-button');
    const floatingChatCta = document.getElementById('floating-chat-cta');
    const chatSection = document.getElementById('recipe-cs');
    const chatOverlay = document.getElementById('chat-overlay');
    const chatCloseButton = document.getElementById('chat-close-button');

    if (!messagesEl || !form || !input || !submitButton || !feedback || !historyList) {
        return;
    }

    const endpoint = window.RECIPE_ASSISTANT_API_URL || 'http://127.0.0.1:8000/api/recipe-assistant';
    const history = [];
    const storageKey = 'masakYukRecipeAssistantHistory';
    let scrollLockY = 0;

    const starterMessages = [
        {
            role: 'assistant',
            content: 'Halo, saya customer service resep Masak Yuk. Sebutkan bahan yang kamu punya atau menu yang ingin dibuat, nanti saya bantu buatkan saran resepnya.',
        },
        {
            role: 'assistant',
            content: 'Contoh pertanyaan: "Saya punya tempe, telur, cabai, dan bawang. Bisa dibuat menu apa untuk 2 orang?"',
        },
    ];
    starterMessages.forEach((message) => appendMessage(message.role, message.content));
    syncTextareaHeight();
    renderHistory();

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => switchTab(button.dataset.tabTarget));
    });

    document.querySelectorAll('[data-close-parent]').forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('.notice-card')?.remove();
        });
    });

    plusButton?.addEventListener('click', () => {
        const samples = [
            'Saya punya telur, kol, dan mie instan. Bisa dibuat menu apa?',
            'Buat resep ayam kecap sederhana untuk 3 orang.',
            'Apa pengganti santan untuk opor yang lebih ringan?',
        ];

        input.value = samples[Math.floor(Math.random() * samples.length)];
        syncTextareaHeight();
        input.focus();
    });

    input.addEventListener('input', syncTextareaHeight);

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            form.requestSubmit();
        }
    });

    [floatingChatLabel, floatingChatButton].forEach((button) => {
        button?.addEventListener('click', openChat);
    });

    chatOverlay?.addEventListener('click', closeChat);
    chatCloseButton?.addEventListener('click', closeChat);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeChat();
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const message = input.value.trim();

        if (!message) {
            return;
        }

        appendMessage('user', message);
        history.push({ role: 'user', content: message });
        input.value = '';
        syncTextareaHeight();

        const localReply = getLocalReply(message);

        if (localReply) {
            appendMessage('assistant', localReply);
            history.push({ role: 'assistant', content: localReply });
            persistConversation(message, localReply);
            setLoading(false, 'CS menampilkan rekomendasi dari katalog Masak Yuk.');
            updateServerNotice('Rekomendasi lokal aktif. CS bisa mengambil resep dari katalog yang tersedia di halaman ini.');
            return;
        }

        setLoading(true, 'CS sedang menyiapkan jawaban resep...');

        const loadingBubble = appendMessage('assistant', 'Sedang memproses pertanyaanmu...', true);

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    history: history.slice(0, -1),
                    localContext: getAssistantContext(),
                }),
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(payload.message || 'Permintaan ke server gagal.');
            }

            loadingBubble.remove();

            const reply = typeof payload.reply === 'string'
                ? payload.reply
                : 'Maaf, saya belum bisa memberi jawaban saat ini.';

            appendMessage('assistant', reply);
            history.push({ role: 'assistant', content: reply });
            persistConversation(message, reply);
            setLoading(false, 'Terhubung ke endpoint customer service resep.');
            updateServerNotice('Backend terhubung. Chat siap digunakan untuk konsultasi resep.');
        } catch (error) {
            loadingBubble.remove();
            const messageText = getErrorMessage(error);

            appendMessage('system', messageText);
            setLoading(false, messageText);
            updateServerNotice(messageText);
        }
    });

    function appendMessage(role, content, isLoading = false) {
        const bubble = document.createElement('article');
        bubble.className = `chat-bubble ${role}${isLoading ? ' loading' : ''}`;
        bubble.textContent = content;
        messagesEl.appendChild(bubble);
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return bubble;
    }

    function setLoading(isLoading, message) {
        submitButton.disabled = isLoading;
        submitButton.innerHTML = `<span>${isLoading ? '…' : '➜'}</span>`;
        feedback.textContent = message;
    }

    function syncTextareaHeight() {
        input.style.height = 'auto';
        input.style.height = `${Math.min(input.scrollHeight, 180)}px`;
    }

    function openChat() {
        scrollLockY = window.scrollY || window.pageYOffset || 0;
        document.body.classList.add('chat-open');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollLockY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        if (chatOverlay) {
            chatOverlay.hidden = false;
        }
        switchTab('chat-panel');
        window.setTimeout(() => {
            input.focus();
        }, 220);
    }

    function closeChat() {
        document.body.classList.remove('chat-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.width = '';
        if (chatOverlay) {
            chatOverlay.hidden = true;
        }
        window.scrollTo(0, scrollLockY);
    }

    function switchTab(targetId) {
        tabButtons.forEach((button) => {
            const isActive = button.dataset.tabTarget === targetId;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-selected', String(isActive));
        });

        document.querySelectorAll('.chat-panel').forEach((panel) => {
            const isActive = panel.id === targetId;
            panel.classList.toggle('active', isActive);
            panel.hidden = !isActive;
        });
    }

    function updateServerNotice(message) {
        if (serverNoticeText) {
            serverNoticeText.textContent = message;
        }
    }

    function getAssistantContext() {
        const favoriteRecipes = getFavoriteRecipes();
        const catalogRecipes = getCatalogRecipes().slice(0, 12).map((recipe) => ({
            nama: recipe.nama,
            negara: recipe.negara,
            tipe: recipe.tipe,
            level: recipe.level,
            summary: recipe.summary,
        }));

        return {
            favoriteRecipes: favoriteRecipes.map((recipe) => ({
                nama: recipe.nama,
                negara: recipe.negara,
                tipe: recipe.tipe,
                level: recipe.level,
                summary: recipe.summary,
            })),
            catalogRecipes,
        };
    }

    function getLocalReply(message) {
        const normalizedMessage = message.toLowerCase();

        if (isFavoriteQuestion(normalizedMessage)) {
            return buildFavoriteReply();
        }

        if (isCatalogQuestion(normalizedMessage)) {
            return buildCatalogReply(normalizedMessage);
        }

        return '';
    }

    function isFavoriteQuestion(message) {
        return /favorit|favorite|terfavorit|paling disukai|menu populer|resep populer/.test(message);
    }

    function isCatalogQuestion(message) {
        return /menu apa|rekomendasi|katalog|dessert|pembuka|utama|penutup/.test(message);
    }

    function buildFavoriteReply() {
        const favorites = getFavoriteRecipes();

        if (!favorites.length) {
            return 'Saat ini belum ada data favorit yang menonjol. Kamu bisa lihat section Resep Favorit di halaman utama, lalu tandai beberapa menu agar rekomendasinya makin akurat.';
        }

        const lines = favorites.slice(0, 4).map((recipe, index) => {
            const favoriteCount = typeof recipe.favoriteCount === 'number' ? `, ${recipe.favoriteCount} favorit` : '';
            return `${index + 1}. ${recipe.nama} (${recipe.negara}, ${recipe.tipe}, ${recipe.level}${favoriteCount})`;
        });

        return [
            'Resep favorit yang ada di Masak Yuk saat ini:',
            ...lines,
            '',
            'Kalau kamu mau, saya bisa lanjut rekomendasikan salah satu berdasarkan bahan yang kamu punya.',
        ].join('\n');
    }

    function buildCatalogReply(message) {
        const recipes = filterRecipesByIntent(message).slice(0, 4);

        if (!recipes.length) {
            return '';
        }

        const lines = recipes.map((recipe, index) => (
            `${index + 1}. ${recipe.nama} (${recipe.negara}, ${recipe.tipe}, ${recipe.level})`
        ));

        return [
            'Saya menemukan beberapa resep dari katalog Masak Yuk yang cocok:',
            ...lines,
            '',
            'Kalau mau, sebutkan bahan yang kamu punya supaya saya pilihkan yang paling pas.',
        ].join('\n');
    }

    function filterRecipesByIntent(message) {
        let recipes = getCatalogRecipes();

        if (message.includes('dessert') || message.includes('penutup')) {
            recipes = recipes.filter((recipe) => recipe.tipe === 'Penutup');
        } else if (message.includes('pembuka')) {
            recipes = recipes.filter((recipe) => recipe.tipe === 'Pembuka');
        } else if (message.includes('utama')) {
            recipes = recipes.filter((recipe) => recipe.tipe === 'Utama');
        }

        return recipes;
    }

    function getFavoriteRecipes() {
        if (typeof window.getTopFavoriteRecipes === 'function') {
            return window.getTopFavoriteRecipes(4);
        }

        return [];
    }

    function getCatalogRecipes() {
        if (typeof window.getBaseCatalogRecipes === 'function') {
            return window.getBaseCatalogRecipes();
        }

        return [];
    }

    function persistConversation(question, answer) {
        const savedHistory = readConversationHistory();
        const nextHistory = [
            {
                question,
                answer,
                createdAt: new Date().toISOString(),
            },
            ...savedHistory,
        ].slice(0, 8);

        localStorage.setItem(storageKey, JSON.stringify(nextHistory));
        renderHistory();
    }

    function renderHistory() {
        const savedHistory = readConversationHistory();

        if (savedHistory.length === 0) {
            historyList.innerHTML = '<article class="history-empty">Belum ada riwayat percakapan. Mulai chat lalu hasilnya akan tersimpan di sini.</article>';
            return;
        }

        historyList.innerHTML = savedHistory.map((item, index) => `
            <article class="history-item">
                <div>
                    <strong>${escapeHtml(item.question)}</strong>
                    <p>${escapeHtml(item.answer.slice(0, 140))}${item.answer.length > 140 ? '...' : ''}</p>
                </div>
                <button type="button" data-history-index="${index}">Buka</button>
            </article>
        `).join('');

        historyList.querySelectorAll('[data-history-index]').forEach((button) => {
            button.addEventListener('click', () => {
                const item = savedHistory[Number(button.dataset.historyIndex)];

                if (!item) {
                    return;
                }

                switchTab('chat-panel');
                appendMessage('user', item.question);
                appendMessage('assistant', item.answer);
            });
        });
    }

    function readConversationHistory() {
        try {
            const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    }

    function getErrorMessage(error) {
        if (error instanceof TypeError) {
            return 'Server lokal belum terhubung. Jalankan Laravel di http://127.0.0.1:8000 lalu kirim ulang pertanyaan.';
        }

        if (error instanceof Error) {
            return error.message;
        }

        return 'Terjadi kesalahan yang tidak diketahui.';
    }

    function escapeHtml(value) {
        return value
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#39;');
    }
});
