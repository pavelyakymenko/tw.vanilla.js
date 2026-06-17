// drawer.js
export default function initDrawer() {
    const body = document.querySelector('body');

    // Универсальная функция «тумблер»
    function toggleDrawer(drawerElement) {
        if (!drawerElement) return;

        // Извлекаем классы эффектов из data-атрибута (если пусто — ничего не делаем)
        const classesAttr = drawerElement.dataset.drawerClasses;
        if (classesAttr) {
            const classesArray = classesAttr.split(' ');
            classesArray.forEach(cls => drawerElement.classList.toggle(cls));
        }
    }

    // Полный цикл: переключаем и панель, и её фон
    function handleDrawerSystem(drawerId) {
        const panel = document.getElementById(drawerId);
        const overlay = document.getElementById(`${drawerId}-overlay`); // Авто-поиск фона

        toggleDrawer(panel);
        toggleDrawer(overlay);
        body.classList.toggle('overflow-hidden');
    }

    // Делегирование кликов
    document.addEventListener('click', (event) => {
        // 1. Клик по кнопке ОТКРЫТИЯ
        const openBtn = event.target.closest('[data-open-drawer]');
        if (openBtn) {
            const drawerId = openBtn.dataset.openDrawer;
            handleDrawerSystem(drawerId);
            return;
        }

        // 2. Клик по кнопке ЗАКРЫТИЯ внутри панели
        const closeBtn = event.target.closest('[data-close-drawer]');
        if (closeBtn) {
            const panel = closeBtn.closest('aside'); // Находим родительский aside панели
            if (panel) handleDrawerSystem(panel.id);
            return;
        }

        // 3. Клик по фону (если у фона id заканчивается на -overlay)
        if (event.target.id && event.target.id.endsWith('-overlay')) {
            const drawerId = event.target.id.replace('-overlay', '');
            handleDrawerSystem(drawerId);
        }
    });

    // Закрытие по кнопке Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            // Ищем все открытые панели (у которых нет класса скрытия)
            // Для этого проверяем, сместились ли они обратно (ищем по маске класса)
            const panels = document.querySelectorAll('aside[id]');
            panels.forEach(panel => {
                // Если панель сейчас НЕ содержит свой класс скрытия, значит она открыта
                const hideClass = panel.dataset.drawerClasses;
                if (hideClass && !panel.classList.contains(hideClass.split(' ')[0])) {
                    handleDrawerSystem(panel.id);
                }
            });
        }
    });
}
