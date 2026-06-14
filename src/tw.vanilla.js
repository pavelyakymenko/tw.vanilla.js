// twya.vanilla.js
import initModal from './components/modal.js'
import initDrawer from './components/drawer.js'
import initHotkeys from './components/hotkeys.js'
import initTooltips from './components/tooltips.js'

document.addEventListener('DOMContentLoaded', () => {
    initModal()
    initDrawer()
    initHotkeys()
    initTooltips()
})
