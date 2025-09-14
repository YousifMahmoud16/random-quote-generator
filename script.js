// script.js — Random Quote Generator (local quotes + UI actions)
(() => {
    const quotes = [
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt" },
        { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
        { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
        { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
        { text: "What we think, we become.", author: "Buddha" },
        { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
        { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
        { text: "Don't wait. The time will never be just right.", author: "Napoleon Hill" },
        { text: "Great things never came from comfort zones.", author: "Unknown" }
    ];

    // Elements
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newBtn = document.getElementById('new-quote');
    const copyBtn = document.getElementById('copy-quote');
    const tweetLink = document.getElementById('tweet-quote');
    const card = document.getElementById('quote-card');

    let lastIndex = -1;

    function pickRandomIndex() {
        if (quotes.length === 1) return 0;
        let idx;
        do { idx = Math.floor(Math.random() * quotes.length); } while (idx === lastIndex);
        lastIndex = idx;
        return idx;
    }

    function renderQuote(idx) {
        const q = quotes[idx];
        // small fade animation
        card.classList.remove('fade-in');
        void card.offsetWidth; // force reflow
        quoteText.textContent = q.text;
        quoteAuthor.textContent = q.author ? `— ${q.author}` : '— Unknown';
        updateTweetLink(q);
        card.classList.add('fade-in');
    }

    function updateTweetLink(q) {
        const text = `"${q.text}" ${q.author ? '— ' + q.author : ''}`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&via=Yousif`;
        tweetLink.setAttribute('href', url);
    }

    function copyQuote() {
        const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                flashCopy(true);
            }).catch(() => flashCopy(false));
        } else {
            // fallback
            const t = document.createElement('textarea');
            t.value = text;
            document.body.appendChild(t);
            t.select();
            try {
                document.execCommand('copy');
                flashCopy(true);
            } catch (e) {
                flashCopy(false);
            } finally {
                document.body.removeChild(t);
            }
        }
    }

    function flashCopy(success) {
        const old = copyBtn.innerHTML;
        copyBtn.innerHTML = success ? '<i class="fas fa-check"></i>' : '<i class="fas fa-exclamation"></i>';
        setTimeout(() => copyBtn.innerHTML = old, 1100);
    }

    // initial render
    renderQuote(pickRandomIndex());

    newBtn.addEventListener('click', () => {
        renderQuote(pickRandomIndex());
    });

    copyBtn.addEventListener('click', copyQuote);

    // keyboard support: N or Space
    window.addEventListener('keydown', (e) => {
        if (e.key === 'n' || e.key === 'N' || e.code === 'Space') {
            e.preventDefault();
            renderQuote(pickRandomIndex());
        }
    });

    // accessibility: allow clicking tweet via Enter when focused
    tweetLink.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') tweetLink.click();
    });

})();
