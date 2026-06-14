// popovers.js
export default function initPopovers() {
    let popoverElement = null;
    let currentTrigger = null;

    document.addEventListener('click', (event) => {
        const target = event.target.closest('[data-toggle="popover"]');

        // 1. КЛИК МИМО: закрываем текущий поповер
        if (popoverElement && !event.target.closest('.my-popover') && !target) {
            destroyPopover();
            return;
        }

        if (!target) return;

        // 2. TOGGLE: Клик по той же кнопке закрывает поповер
        if (currentTrigger === target) {
            destroyPopover();
            return;
        }

        if (popoverElement) destroyPopover();

        currentTrigger = target;

        // Читаем настройки из атрибутов кнопки
        const contentText = target.dataset.content;
        const placement = target.dataset.placement || 'top'; // дефолт — top
        const customClasses = target.dataset.popoverClass;

        // 3. СБОРКА ШАБЛОНА НА ЛЕТУ
        popoverElement = document.createElement('div');
        
        // Системные классы (позиционирование и анимация)
        const baseClasses = 'my-popover fixed z-40 pointer-events-auto opacity-0 transition-opacity duration-200';
        
        // Внешний вид: если юзер дал свои классы — берем их, если нет — стандартный стиль Bootstrap
        const visualClasses = customClasses ? customClasses : 'bg-white text-dark border rounded shadow p-3 text-sm';
        
        popoverElement.className = `${baseClasses} ${visualClasses}`;
        popoverElement.textContent = contentText;

        // Добавляем в body, чтобы замерить размеры
        document.body.appendChild(popoverElement);

        // 4. МАТЕМАТИКА ПОЗИЦИОНИРОВАНИЯ (Top / Bottom)
        const rect = target.getBoundingClientRect();
        const popoverRect = popoverElement.getBoundingClientRect();
        
        let top = 0;
        // Центрирование по горизонтали одинаковое для обоих вариантов
        const left = rect.left + (rect.width / 2) - (popoverRect.width / 2);

        if (placement === 'top') {
            top = rect.top - popoverRect.height - 8; // Сверху кнопки
        } else if (placement === 'bottom') {
            top = rect.bottom + 8; // Снизу кнопки
        }

        // Применяем вычисленные координаты
        popoverElement.style.top = `${top}px`;
        popoverElement.style.left = `${left}px`;

        // Плавное появление
        requestAnimationFrame(() => {
            if (popoverElement) popoverElement.classList.remove('opacity-0');
        });
    });

    function destroyPopover() {
        if (popoverElement) {
            popoverElement.remove();
            popoverElement = null;
            currentTrigger = null;
        }
    }
}
