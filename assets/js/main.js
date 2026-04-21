const blob = document.createElement('div');
blob.classList.add('aurora-blob');
document.body.appendChild(blob);

const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Загружаем сохранённую тему или светлую по умолчанию
const saved = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);
updateToggleIcon(saved);

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon(next);
});

function updateToggleIcon(theme) {
    toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

document.querySelectorAll('.os-card-header').forEach(header => {
    header.addEventListener('click', () => {
        const card = header.closest('.os-card');
        const isOpen = card.classList.contains('open');
        document.querySelectorAll('.os-card').forEach(c => c.classList.remove('open'));
        if (!isOpen) card.classList.add('open');
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('pre').forEach(pre => {
    const btn = document.createElement('button');
    btn.textContent = 'Copy';
    btn.classList.add('copy-btn');

    btn.addEventListener('click', () => {
        const code = pre.querySelector('code').innerText;
        navigator.clipboard.writeText(code).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = 'Copy', 2000);
        });
    });

    pre.style.position = 'relative';
    pre.appendChild(btn);
});