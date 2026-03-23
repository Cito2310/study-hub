# Style Guide — Study Hub

## Fonts

- **Montserrat** — headings (h1, h2)
- **Inter** — body, labels, hints, buttons

Import in `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700&display=swap');
```

---

## Color Palette

| Role              | Tailwind class    | Usage                                |
|-------------------|-------------------|--------------------------------------|
| Background        | `bg-gray-50`      | Page background                      |
| Surface           | `bg-white`        | Cards, modals, inputs                |
| Text primary      | `text-gray-900`   | Main content                         |
| Text secondary    | `text-gray-500`   | Subtitles, descriptions              |
| Text hint         | `text-gray-400`   | Placeholders, helper text            |
| Border            | `border-gray-200` | Inputs, cards, dividers              |
| Action primary    | `bg-gray-900`     | Primary buttons, active focus        |
| Danger            | `bg-red-500`      | Delete buttons, destructive actions  |

---

## Typography

| Element | Classes                             | Font        |
|---------|-------------------------------------|-------------|
| h1      | `text-2xl font-semibold`            | Montserrat  |
| h2      | `text-lg font-medium`               | Montserrat  |
| Body    | `text-sm text-gray-700`             | Inter       |
| Label   | `text-xs font-medium text-gray-600` | Inter       |
| Hint    | `text-xs text-gray-400`             | Inter       |

---

## Buttons

| Variant | Classes                                                                          |
|---------|----------------------------------------------------------------------------------|
| Primary | `bg-gray-900 text-white text-sm rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors` |
| Ghost   | `text-gray-600 text-sm px-4 py-2 hover:text-gray-900 transition-colors`          |
| Danger  | `bg-red-500 text-white text-sm rounded-lg px-4 py-2 hover:bg-red-600 transition-colors`   |

---

## Inputs

```
border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none
focus:border-gray-900 transition-colors w-full
```

Error state: `border-red-400`
Error message: `text-xs text-red-500 mt-1`

---

## Layout

- Page max-width: `max-w-2xl mx-auto`
- Page padding: `px-4 py-10`
- Page background: `min-h-screen bg-gray-50`
- Section gap: `mb-6`
- List item gap: `gap-2`

---

## Cards

```
bg-white border border-gray-200 rounded-lg px-4 py-3
```

No shadows on cards. Shadows only on modals.

---

## Modals

```
bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4
```

Overlay: `fixed inset-0 z-50 flex items-center justify-center bg-black/50`

---

## Border Radius

- Default: `rounded-lg` — buttons, inputs, cards, modals
- Never use `rounded-full` except for avatars or icon-only buttons

---

## Shadows

- Cards: none
- Modals: `shadow-lg`
- Dropdowns: `shadow-md`

---

## Transitions

- Default: `transition-colors` for color/background changes
- Duration: Tailwind default (150ms)
