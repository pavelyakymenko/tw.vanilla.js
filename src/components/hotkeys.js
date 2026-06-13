// hotkeys.js
export default function initHotkeys() {
    document.addEventListener('keydown', (event) => {
        const target = event.target;

        // 1. Игнорируем хоткеи, если пользователь пишет текст в полях ввода
        if (
            target instanceof HTMLInputElement ||
            target instanceof HTMLTextAreaElement ||
            target.isContentEditable
        ) {
            return;
        }

        // 2. Игнорируем нажатие «голых» клавиш-модификаторов (Ctrl, Shift и т.д.)
        if (['Control', 'Shift', 'Alt', 'Meta'].includes(event.key)) {
            return;
        }

        // 3. Строим строгую каноничную строку строго в нижнем регистре.
        // ПОРЯДОК СБОРКИ ВАЖЕН: control+ -> alt+ -> shift+ -> клавиша
        let pressedKey = '';
        if (event.ctrlKey) pressedKey += 'control+';
        if (event.altKey) pressedKey += 'alt+';
        if (event.shiftKey) pressedKey += 'shift+';
        
        pressedKey += event.key.toLowerCase();

        // 4. Ищем ПЕРВЫЙ элемент с таким хоткеем на странице
        const targetElement = document.querySelector(`[data-hotkey="${pressedKey}"]`);

        // 5. Если хоткей найден — полностью отменяем стандартное действие браузера и кликаем!
        if (targetElement) {
            event.preventDefault(); // Назначил хоткей — браузер отдыхает
            targetElement.click();   // Просто эмулируем клик мышкой
        }
    });
}
