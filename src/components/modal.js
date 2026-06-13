// modal.js
export default function initModal() {
    const body = document.querySelector('body');

    // Намерение 1: Принудительное ОТКРЫТИЕ
    function openModal(modal) {
        if (!modal) return;
        
        const dialog = modal.querySelector('.modal-dialog');
        const modalClasses = modal.dataset.modalClasses ? modal.dataset.modalClasses.split(' ') : ['opacity-0', 'pointer-events-none'];
        const dialogClasses = dialog && dialog.dataset.dialogClasses ? dialog.dataset.dialogClasses.split(' ') : ['scale-95', 'scale-100'];

        // Мы УДАЛЯЕМ классы скрытия (показываем окно), независимо от того, сколько раз нажали
        modalClasses.forEach(cls => modal.classList.remove(cls));
        
        // Переключаем классы диалога на состояние "открыто"
        if (dialog) {
            dialog.classList.remove('scale-95');
            dialog.classList.add('scale-100');
        }

        body.classList.add('overflow-hidden');
    }

    // Намерение 2: Принудительное ЗАКРЫТИЕ
    function closeModal(modal) {
        if (!modal) return;

        const dialog = modal.querySelector('.modal-dialog');
        const modalClasses = modal.dataset.modalClasses ? modal.dataset.modalClasses.split(' ') : ['opacity-0', 'pointer-events-none'];

        // Мы ДОБАВЛЯЕМ классы скрытия (прячем окно)
        modalClasses.forEach(cls => modal.classList.add(cls));
        
        if (dialog) {
            dialog.classList.remove('scale-100');
            dialog.classList.add('scale-95');
        }

        // Освобождаем скролл, только если на экране не осталось других ОТКРЫТЫХ модалок (задел на будущее для стека!)
        const anyOpen = document.querySelector('.modal:not(.opacity-0)');
        if (!anyOpen) {
            body.classList.remove('overflow-hidden');
        }
    }

    // Диспетчер кликов (Делегирование)
    document.addEventListener('click', (event) => {
        // Клик по кнопке ОТКРЫТИЯ -> Намерение OPEN
        const openBtn = event.target.closest('[data-open-modal]');
        if (openBtn) {
            const modalId = openBtn.dataset.openModal;
            const modal = document.getElementById(modalId);
            openModal(modal); // Вызываем строго open
            return;
        }

        // Клик по кнопке ЗАКРЫТИЯ -> Намерение CLOSE
        const closeBtn = event.target.closest('[data-close-modal]');
        if (closeBtn) {
            const modal = closeBtn.closest('.modal');
            closeModal(modal); // Вызываем строго close
            return;
        }

        // Клик по фону -> Намерение CLOSE
        if (event.target.classList.contains('modal')) {
            closeModal(event.target); // Вызываем строго close
        }
    });

    // Нажатие Escape -> Намерение CLOSE для всех активных окон
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            const openModals = document.querySelectorAll('.modal:not(.opacity-0)');
            openModals.forEach(modal => closeModal(modal));
        }
    });
}
