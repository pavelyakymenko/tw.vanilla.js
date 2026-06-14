// masks.js
export default function initMasks() {
    
    document.addEventListener('input', (event) => {
        const input = event.target;
        const mask = input.dataset.mask;
        if (!mask) return;

        // Нам нужно отслеживать нажатие Backspace (удаление)
        // Если пользователь стирает, мы временно ослабляем жесткость маски
        const isDeleting = event.inputType === 'deleteContentBackward';
        
        let rawValue = input.value;
        let formattedValue = '';
        
        let maskIndex = 0;
        let dataIndex = 0;

        // Вычищаем из ввода только то, что пользователь реально набрал, 
        // но игнорируем системные символы маски, если они стоят не на своих местах
        let cleanData = rawValue.replace(/\D/g, '');

        // Если пользователь стёр всё до кода страны, очищаем поле полностью
        if (isDeleting && cleanData === '7') {
            input.value = '';
            return;
        }

        // Идем по маске и пошагово собираем строку
        while (maskIndex < mask.length && dataIndex < cleanData.length) {
            const maskChar = mask[maskIndex];
            const nextDataChar = cleanData[dataIndex];

            if (maskChar === '9') {
                // Если в маске '9', а пользователь ввел цифру — вставляем её
                formattedValue += nextDataChar;
                dataIndex++;
                maskIndex++;
            } else {
                // Если в маске статический символ (+7, пробел, скобка)
                formattedValue += maskChar;
                maskIndex++;
                
                // Хак: если пользователь сам ввел статический символ (например, '7' в начале),
                // мы просто продвигаем указатель данных вперед, чтобы не дублировать её
                if (nextDataChar === maskChar) {
                    dataIndex++;
                }
            }
        }

        // Если мы удаляем символы, и на конце остался дефис или скобка — подрезаем её принудительно
        if (isDeleting) {
            while (formattedValue.length > 0 && mask[formattedValue.length - 1] !== '9') {
                formattedValue = formattedValue.slice(0, -1);
            }
        }

        // Возвращаем результат в инпут
        input.value = formattedValue;
    });
}
