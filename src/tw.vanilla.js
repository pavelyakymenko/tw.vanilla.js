// twya.vanilla.js
import initModal from './components/modal.js'
import initDrawer from './components/drawer.js'
import initHotkeys from './components/hotkeys.js'
import initTooltips from './components/tooltips.js'
import initPopovers from './components/popovers.js'
import initMasks from './components/masks.js'
import initDropdowns from './components/dropdowns.js'

document.addEventListener('DOMContentLoaded', () => {
    initModal()
    initDrawer()
    initHotkeys()
    initTooltips()
    initPopovers()
    initMasks()
    initDropdowns()
})
