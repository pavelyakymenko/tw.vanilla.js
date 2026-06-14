// tooltips.js
export default function initTooltips() {
    let tooltipElement = null;

    // 1. Мышь НАВЕДЕНА
    document.addEventListener('mouseover', (event) => {
        const target = event.target.closest('[data-tooltip]');
        if (!target) return;

        // Получаем данные из HTML-атрибутов
        const text = target.dataset.tooltip;
        const customClasses = target.dataset.tooltipClass; // Ищем кастомные стили пользователя

        // Создаем элемент подсказки «на лету»
        tooltipElement = document.createElement('div');
        
        // Базовые системные классы, без которых тултип сломается (позиционирование и анимация)
        const baseClasses = 'fixed z-50 pointer-events-none opacity-0 transition-opacity duration-200';

        // Если пользователь передал свои классы — берем их. Если нет — дефолтный темный стиль
        const visualClasses = customClasses ? customClasses : 'px-2 py-1 text-xs text-white bg-stone-900 rounded shadow-md font-mono';

        // Соединяем стили и добавляем текст
        tooltipElement.className = `${baseClasses} ${visualClasses}`;
        tooltipElement.textContent = text;

        // Добавляем в body, чтобы он появился на странице
        document.body.appendChild(tooltipElement);

        // Вычисляем координаты ссылки на экране
        const rect = target.getBoundingClientRect();
        
        // Позиционируем подсказку строго по центру НАД элементом
        const tooltipRect = tooltipElement.getBoundingClientRect();
        const top = rect.top - tooltipRect.height - 8; // 8px отступ сверху
        const left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

        tooltipElement.style.top = `${top}px`;
        tooltipElement.style.left = `${left}px`;

        // Включаем плавное появление через анимацию Tailwind
        requestAnimationFrame(() => {
            if (tooltipElement) {
                tooltipElement.classList.remove('opacity-0');
            }
        });
    });

    // 2. Мышь УШЛА
    document.addEventListener('mouseout', (event) => {
        const target = event.target.closest('[data-tooltip]');
        if (!target || !tooltipElement) return;

        // Полностью удаляем элемент из структуры страницы
        tooltipElement.remove();
        tooltipElement = null;
    });
}
