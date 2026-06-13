// modal.js
export default function initModal() {
    const body = document.querySelector('body');

    // Функция для переключения состояния конкретного модального окна
    function toggleModal(modal) {
        if (!modal) return;

        const dialog = modal.querySelector('.modal-dialog');

        // 1. Получаем классы для анимации из data-атрибутов (или ставим дефолтные, если забыли указать)
        const modalClasses = modal.dataset.modalClasses ? modal.dataset.modalClasses.split(' ') : ['opacity-0', 'pointer-events-none'];
        const dialogClasses = dialog && dialog.dataset.dialogClasses ? dialog.dataset.dialogClasses.split(' ') : ['scale-95', 'scale-100'];

        // 2. Переключаем классы у самого окна (overlay)
        modalClasses.forEach(cls => modal.classList.toggle(cls));

        // 3. Переключаем классы у диалогового окна (анимация масштаба/сдвига)
        if (dialog) {
            dialogClasses.forEach(cls => dialog.classList.toggle(cls));
        }

        // 4. Фиксируем прокрутку страницы
        body.classList.toggle('overflow-hidden');
    }

    // Слушаем все клики на странице (Делегирование)
    document.addEventListener('click', (event) => {
        // Проверяем, кликнули ли по кнопке ОТКРЫТИЯ
        const openBtn = event.target.closest('[data-open-modal]');
        if (openBtn) {
            const modalId = openBtn.dataset.openModal;
            const modal = document.getElementById(modalId);
            toggleModal(modal);
            return;
        }

        // Проверяем, кликнули ли по кнопке ЗАКРЫТИЯ
        const closeBtn = event.target.closest('[data-close-modal]');
        if (closeBtn) {
            const modal = closeBtn.closest('.modal');
            toggleModal(modal);
            return;
        }

        // Проверяем клик по серому фону (overlay) для закрытия
        if (event.target.classList.contains('modal')) {
            toggleModal(event.target);
        }
    });

    // Закрытие по кнопке Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            // Находим все открытые модалки (у которых нет класса opacity-0)
            const openModals = document.querySelectorAll('.modal:not(.opacity-0)');
            openModals.forEach(modal => toggleModal(modal));
        }
    });
}
