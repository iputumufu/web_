document.addEventListener('DOMContentLoaded', () => {
    const messagesEl = document.getElementById('chat-messages');
    const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const submitButton = document.getElementById('chat-submit');
    const feedback = document.getElementById('chat-feedback');
    const promptContainer = document.getElementById('quick-prompts');
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
    renderHistory();

    tabButtons.forEach((button) => {
        button.addEventListener('click', () => switchTab(button.dataset.tabTarget));
    });

    document.querySelectorAll('[data-close-parent]').forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('.notice-card')?.remove();
        });
    });

    promptContainer?.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof HTMLButtonElement)) {
            return;
        }

        input.value = target.textContent.trim();
        input.focus();
    });

    plusButton?.addEventListener('click', () => {
        const samples = [
            'Saya punya telur, kol, dan mie instan. Bisa dibuat menu apa?',
            'Buat resep ayam kecap sederhana untuk 3 orang.',
            'Apa pengganti santan untuk opor yang lebih ringan?',
        ];

        input.value = samples[Math.floor(Math.random() * samples.length)];
        input.focus();
    });

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

    function openChat() {
        document.body.classList.add('chat-open');
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
        if (chatOverlay) {
            chatOverlay.hidden = true;
        }
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
