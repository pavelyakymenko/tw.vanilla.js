// dropdowns.js
export default function initDropdowns() {
    let currentDropdown = null;
    let currentTrigger = null;

    document.addEventListener('click', (event) => {
        const target = event.target.closest('[data-dropdown-target]');

        // 1. КЛИК МИМО: Если кликнули вне открытого меню и вне кнопки триггера — закрываем меню
        if (currentDropdown && !event.target.closest('.my-dropdown-menu') && !target) {
            closeDropdown();
            return;
        }

        if (!target) return;

        // Получаем целевое меню по ID
        const dropdownId = target.dataset.dropdownTarget;
        const dropdown = document.getElementById(dropdownId);

        // 2. TOGGLE: Клик по той же кнопке повторно закрывает выпадашку
        if (currentTrigger === target) {
            closeDropdown();
            return;
        }

        // Если уже открыта другая выпадашка — тушим её
        if (currentDropdown) closeDropdown();

        if (!dropdown) return;

        // Запоминаем активные элементы
        currentDropdown = dropdown;
        currentTrigger = target;

        // 3. ОТКРЫВАЕМ МЕНЮ (Убираем блокировку и плавно проявляем)
        dropdown.classList.remove('pointer-events-none');
        
        requestAnimationFrame(() => {
            if (currentDropdown) currentDropdown.classList.remove('opacity-0');
        });
    });

    function closeDropdown() {
        if (currentDropdown) {
            currentDropdown.classList.add('opacity-0', 'pointer-events-none');
            currentDropdown = null;
            currentTrigger = null;
        }
    }
}
