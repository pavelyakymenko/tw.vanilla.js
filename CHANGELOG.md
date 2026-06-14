# Changelog

## v0.1.0 — UI Core Expansion & Knowledge Base

This release marks a massive expansion of our interactive component library and the transition to systematic documentation of our project’s architecture. Version Focus: working with DOM threads, deep event isolation, declarative state toggling, and moving away from inline styles in favor of clean Tailwind CSS utilities.

### What’s New (Component Library):

* **Carousel / Slider (`carousel.js`):**
  * Implemented using modern JavaScript OOP classes.
  * Smooth ribbon scroll animation utilizing GPU hardware acceleration via `transform: translateX`.
  * Built-in autoplay logic (`setInterval`) that automatically reads the interval configuration from the declarative `data-interval` attribute.
  
* **Tab Component (`tabs.js`):**
  * Full compliance with W3C WAI-ARIA accessibility standards (using proper `tablist`, `tab`, and `tabpanel` semantic roles).
  * Robust isolation of group switching using the `.closest()` method. The component works perfectly even if multiple independent tab blocks are initialized on the same page.

* **Dropdowns & Toggles (`dropdowns.js`):**
  * Implemented declarative dropdown state toggling via data-attributes.
  * Added global listener logic to handle closing active dropdowns automatically when a user clicks outside the element.

* **Input Masks (`masks.js`):**
  * Added structural character parsing for input fields (e.g., phone numbers, dates).
  * Solved the infinite recursion bug on value re-formatting, ensuring smooth text entry without caret jumping.

* **Tooltips & Popovers (`tooltips.js` & `popovers.js`):**
  * Added dynamic positioning nodes that calculate coordinates relative to target elements.
  * Built using pure Vanilla JS without heavy external layout engines.

* **Global Hotkeys (`hotkeys.js`):**
  * Initialized a global key-down listener registry to bind keyboard shortcuts directly to UI actions (like closing modals on `Escape`).

* **GitHub Wiki & Documentation:**
  * Launched the project’s global knowledge base.
  * Detailed breakdowns of UX contracts and a history of resolved bugs for key modules have been added.
  * The **CC0 1.0 Universal** license has been implemented for the documentation (full freedom of knowledge).

### Refactoring & Technical Improvements:
* **Modal & Drawer Updates (`modal.js`, `drawer.js`):** Conducted a deep architectural refactoring. All hardcoded inline styles (`style="display: none;"`) have been completely removed from the runtime logic and replaced with native Tailwind utility classes (`hidden`, `block`, `translate-x-0`). State and visual representation are now fully decoupled.

---
*Thank you to everyone who is building a free internet and teaching Vanilla JS! Next up: the Style Stack and button design system.*

## v0.0.1
- Added simple modal script
- Added basic drawer interaction
