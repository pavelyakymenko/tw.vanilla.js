// tabs.js
export default function initTabs() {
    
    document.addEventListener('click', (event) => {
        const clickedTab = event.target.closest('[data-tab-target]');
        if (!clickedTab) return;

        // Если кликнули по уже активной вкладке — игнорируем
        if (clickedTab.classList.contains('active')) return;

        const tabList = clickedTab.closest('[role="tablist"]');
        if (!tabList) return;

        // 1. ДЕАКТИВАЦИЯ СТАРЫХ ЭЛЕМЕНТОВ
        const currentActiveTab = tabList.querySelector('[data-tab-target].active');
        if (currentActiveTab) {
            // Возвращаем старой кнопке дефолтные классы Tailwind
            currentActiveTab.classList.remove('active', 'border-gray-200', 'border-b-transparent', 'bg-white', 'font-bold');
            currentActiveTab.classList.add('opacity-60');

            // Прячем старую текстовую панель с помощью утилиты hidden
            const oldPanel = document.querySelector(currentActiveTab.dataset.tabTarget);
            if (oldPanel) {
                oldPanel.classList.remove('block');
                oldPanel.classList.add('hidden');
            }
        }

        // 2. АКТИВИЗАЦИЯ НОВЫХ ЭЛЕМЕНТОВ
        clickedTab.classList.add('active', 'border-gray-200', 'border-b-transparent', 'bg-white', 'font-bold');
        clickedTab.classList.remove('opacity-60');

        // Показываем новую панель контента, заменяя hidden на block
        const newPanel = document.querySelector(clickedTab.dataset.tabTarget);
        if (newPanel) {
            newPanel.classList.remove('hidden');
            newPanel.classList.add('block');
        }
    });
}
