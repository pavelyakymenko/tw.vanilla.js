const MODAL_SELECTOR = 'dialog[data-tw-modal], dialog[data-modal], dialog.modal, dialog[id]';
const MODAL_PANEL_SELECTOR = '[data-modal-panel]';
const OPEN_TRIGGER_SELECTOR = '[data-tw-toggle="modal"][data-tw-target], [data-modal-target], [data-open-modal]';
const CLOSE_TRIGGER_SELECTOR = '[data-tw-dismiss="modal"], [data-modal-close], [data-close-modal]';
const ACTIVE_MODAL_ATTRIBUTE = 'data-modal-open';
const POSITION_ATTRIBUTE = 'data-tw-position';
const ANIMATION_ATTRIBUTE = 'data-tw-animation';
const DEFAULT_OPEN_CLASS = 'opacity-100';
const DEFAULT_CLOSING_CLASS = 'opacity-0';
const DEFAULT_ANIMATION_DURATION = 300;
const DEFAULT_POSITION = 'center';
const DEFAULT_ANIMATION = 'fade';
const LAYOUT_BASE_CLASSES = ['flex'];

const POSITION_CLASS_MAP = {
    'top-start': ['items-start', 'justify-start'],
    top: ['items-start', 'justify-center'],
    'top-end': ['items-start', 'justify-end'],
    start: ['items-center', 'justify-start'],
    center: ['items-center', 'justify-center'],
    end: ['items-center', 'justify-end'],
    right: ['items-center', 'justify-end'],
    'bottom-start': ['items-end', 'justify-start'],
    bottom: ['items-end', 'justify-center'],
    'bottom-end': ['items-end', 'justify-end'],
};

const POSITION_CLASSES = [...new Set(Object.values(POSITION_CLASS_MAP).flat())];
const PANEL_ANIMATION_CLASSES = ['scale-90', 'scale-95', 'scale-100', '-translate-y-10', '-translate-y-6', 'translate-y-10', 'translate-y-6', 'translate-y-0'];

const ANIMATION_PRESETS = {
    fade: {
        rootOpen: ['opacity-100'],
        rootClosed: ['opacity-0'],
        panelOpen: ['translate-y-0', 'scale-100'],
        panelClosed: ['translate-y-6', 'scale-95'],
    },
    scale: {
        rootOpen: ['opacity-100'],
        rootClosed: ['opacity-0'],
        panelOpen: ['scale-100'],
        panelClosed: ['scale-90'],
    },
    'slide-down': {
        rootOpen: ['opacity-100'],
        rootClosed: ['opacity-0'],
        panelOpen: ['translate-y-0'],
        panelClosed: ['-translate-y-10'],
    },
    'slide-up': {
        rootOpen: ['opacity-100'],
        rootClosed: ['opacity-0'],
        panelOpen: ['translate-y-0'],
        panelClosed: ['translate-y-10'],
    },
    none: {
        rootOpen: ['opacity-100'],
        rootClosed: ['opacity-100'],
        panelOpen: [],
        panelClosed: [],
    },
};

function getAllModals() {
    return [...document.querySelectorAll(MODAL_SELECTOR)];
}

function isDialogElement(element) {
    return element instanceof HTMLDialogElement;
}

function getModalPanel(modal) {
    return modal?.querySelector(MODAL_PANEL_SELECTOR) ?? null;
}

function getAnimationDuration(modal) {
    const value = Number(modal.dataset.twDuration || modal.dataset.modalDuration);
    return Number.isFinite(value) && value >= 0 ? value : DEFAULT_ANIMATION_DURATION;
}

function getOpenClass(modal) {
    return modal.dataset.modalOpenClass || DEFAULT_OPEN_CLASS;
}

function getClosingClass(modal) {
    return modal.dataset.modalClosingClass || DEFAULT_CLOSING_CLASS;
}

function getPosition(modal) {
    const value = modal.getAttribute(POSITION_ATTRIBUTE) || DEFAULT_POSITION;
    return POSITION_CLASS_MAP[value] ? value : DEFAULT_POSITION;
}

function getAnimationPreset(modal) {
    const value = modal.getAttribute(ANIMATION_ATTRIBUTE) || DEFAULT_ANIMATION;
    return ANIMATION_PRESETS[value] ? value : DEFAULT_ANIMATION;
}

function syncModalState(modal, open) {
    modal.setAttribute(ACTIVE_MODAL_ATTRIBUTE, open ? 'true' : 'false');
    modal.setAttribute('aria-hidden', open ? 'false' : 'true');
}

function applyPosition(modal) {
    modal.classList.add(...LAYOUT_BASE_CLASSES);
    modal.classList.remove(...POSITION_CLASSES);

    const positionClasses = POSITION_CLASS_MAP[getPosition(modal)];
    modal.classList.add(...positionClasses);
}

function clearLayout(modal) {
    modal.classList.remove(...LAYOUT_BASE_CLASSES, ...POSITION_CLASSES);
}

function normalizeTargetValue(value) {
    if (!value) return '';
    return value.startsWith('#') ? value.slice(1) : value;
}

function hasLegacyAnimationOverrides(modal) {
    const panel = getModalPanel(modal);

    return Boolean(
        modal.dataset.modalOpenClass ||
        modal.dataset.modalClosingClass ||
        panel?.dataset.modalOpenClass ||
        panel?.dataset.modalClosingClass
    );
}

function resetPresetAnimationClasses(modal) {
    const panel = getModalPanel(modal);

    modal.classList.remove(DEFAULT_OPEN_CLASS, DEFAULT_CLOSING_CLASS);
    panel?.classList.remove(...PANEL_ANIMATION_CLASSES);
}

function applyPresetAnimationState(modal, state) {
    const panel = getModalPanel(modal);
    const preset = ANIMATION_PRESETS[getAnimationPreset(modal)];
    const rootAdd = state === 'open' ? preset.rootOpen : preset.rootClosed;
    const panelAdd = state === 'open' ? preset.panelOpen : preset.panelClosed;

    resetPresetAnimationClasses(modal);
    modal.classList.add(...rootAdd);
    panel?.classList.add(...panelAdd);
}

function openModal(modal) {
    if (!isDialogElement(modal) || modal.open) return;

    const panel = getModalPanel(modal);

    applyPosition(modal);
    if (hasLegacyAnimationOverrides(modal)) {
        modal.classList.remove(getClosingClass(modal));
    } else {
        applyPresetAnimationState(modal, 'closed');
    }

    modal.showModal();
    syncModalState(modal, true);

    if (panel && !panel.hasAttribute('tabindex')) {
        panel.setAttribute('tabindex', '-1');
    }

    requestAnimationFrame(() => {
        if (hasLegacyAnimationOverrides(modal)) {
            modal.classList.add(getOpenClass(modal));
        } else {
            applyPresetAnimationState(modal, 'open');
        }

        panel?.focus();
    });
}

function closeModal(modal) {
    if (!isDialogElement(modal) || !modal.open) return;
    const duration = getAnimationDuration(modal);

    if (hasLegacyAnimationOverrides(modal)) {
        modal.classList.remove(getOpenClass(modal));
        modal.classList.add(getClosingClass(modal));
    } else {
        applyPresetAnimationState(modal, 'closed');
    }

    window.setTimeout(() => {
        if (!modal.open) return;

        if (hasLegacyAnimationOverrides(modal)) {
            modal.classList.remove(getClosingClass(modal));
        }

        modal.close();
    }, duration);
}

function resolveModalById(modalId) {
    const modal = modalId ? document.getElementById(normalizeTargetValue(modalId)) : null;
    return isDialogElement(modal) ? modal : null;
}

function resolveToggleTarget(trigger) {
    return trigger.dataset.twTarget || trigger.dataset.modalTarget || trigger.dataset.openModal || '';
}

export default function initModal() {
    getAllModals().forEach((modal) => {
        if (modal.open) {
            applyPosition(modal);
        } else {
            clearLayout(modal);
        }

        syncModalState(modal, modal.open);

        if (modal.hasAttribute('data-tw-modal') === false && modal.hasAttribute('data-modal')) {
            modal.setAttribute('data-tw-modal', '');
        }

        modal.addEventListener('cancel', (event) => {
            event.preventDefault();
            closeModal(modal);
        });

        modal.addEventListener('close', () => {
            clearLayout(modal);

            if (hasLegacyAnimationOverrides(modal)) {
                modal.classList.remove(getOpenClass(modal), getClosingClass(modal));
            } else {
                applyPresetAnimationState(modal, 'closed');
            }

            syncModalState(modal, false);
        });

        modal.addEventListener('click', (event) => {
            const panel = getModalPanel(modal);

            if (!panel) {
                closeModal(modal);
                return;
            }

            if (!panel.contains(event.target)) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('click', (event) => {
        const openButton = event.target.closest(OPEN_TRIGGER_SELECTOR);
        if (openButton) {
            if (openButton.dataset.twToggle && openButton.dataset.twToggle !== 'modal') {
                return;
            }

            openModal(resolveModalById(resolveToggleTarget(openButton)));
            return;
        }

        const closeButton = event.target.closest(CLOSE_TRIGGER_SELECTOR);
        if (closeButton) {
            if (closeButton.dataset.twDismiss && closeButton.dataset.twDismiss !== 'modal') {
                return;
            }

            closeModal(closeButton.closest('dialog'));
        }
    });
}
