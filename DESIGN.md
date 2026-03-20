# Design System Document: High-End Editorial & Institutional Heritage

## 1. Overview & Creative North Star: "The Andean Prestige"
The Creative North Star for this design system is **"The Andean Prestige."** This concept bridges the gap between the rigorous, institutional history of the Lions International and the vibrant, geometric tradition of Oruro, Bolivia. 

To move beyond a "template" look, this system rejects the standard box-model layout. Instead, we utilize **Intentional Asymmetry** and **Editorial Layering**. Elements should feel like they are curated on a gallery wall rather than slotted into a grid. We achieve this through large typographic scales, overlapping containers that break the container's edge, and a depth model based on tonal shifts rather than structural lines.

---

## 2. Colors & Atmospheric Depth
This palette is designed to evoke a sense of "Deep Midnight in the Altiplano," where the gold accents act as a guiding light.

### Color Tokens
*   **Primary (The Gold Standard):** `#eec200` (on_primary: `#3c2f00`). Used for critical calls to action and major headlines.
*   **Surface / Background:** `#00132f`. This is our "Deep Blue" foundation.
*   **Secondary (The Lions Blue):** `#aac7ff`. Use this for supporting UI elements and subtle accents.
*   **Tertiary:** `#eac32b`. A more muted gold for decorative elements and patterns.

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning. To define boundaries, use background color shifts. A section using `surface-container-low` should sit directly against a `surface` background. The eye should perceive the change in depth through color, not a wireframe line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the following hierarchy to "nest" content:
1.  **Base Layer:** `surface` (#00132f)
2.  **Section Layer:** `surface-container-low` (#001b3e)
3.  **Component Layer (Cards/Modals):** `surface-container-high` (#002959)

### The "Glass & Gradient" Rule
To add "soul" to the interface, use a linear gradient between `#0c3569` and `#1a5fb4` for large hero backgrounds. For floating navigation or cards, apply **Glassmorphism**: 
*   **Background:** `surface_variant` at 60% opacity.
*   **Backdrop-blur:** 12px to 20px.
*   **Effect:** This allows the "Lions Blue" to bleed through, creating a sophisticated, multi-dimensional feel.

---

## 3. Typography: Editorial Authority
We use a tri-font system to balance prestige with modern readability.

*   **Display & Headlines (Newsreader/Playfair):** Used for "The Big Moments." These should be set with tight letter-spacing (-2%) and used at `display-lg` (3.5rem) to create an editorial, magazine-like feel.
*   **Titles & UI (Plus Jakarta Sans/Outfit):** Used for navigation and functional labels. These provide a clean, modern counter-point to the serif display faces.
*   **Body (Plus Jakarta Sans/DM Sans):** Set at `body-lg` (1rem) with generous line-height (1.6) to ensure the heavy blue backgrounds remain legible and breathable.

---

## 4. Elevation & Depth: Tonal Layering
We do not use shadows to simulate height; we use light.

*   **The Layering Principle:** Place a `surface-container-lowest` card inside a `surface-container-low` section. This "negative depth" creates a soft, recessed look that feels integrated into the page.
*   **Ambient Shadows:** If a card must "float" (e.g., a primary modal), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25)`. The shadow color must never be pure black; it should be a darkened tint of the background blue.
*   **The "Ghost Border" Fallback:** If accessibility requires a border, use `outline-variant` (#424752) at **15% opacity**. It should be felt, not seen.
*   **Signature Textures:** Incorporate hexagonal geometric patterns using `gold` (#f5c800) at 5% opacity as background overlays to reference the traditional textiles of Oruro.

---

## 5. Components: Refined Utility

### Buttons (The Golden Touch)
*   **Primary:** Background: `primary` (#eec200); Text: `on_primary` (#3c2f00). Shape: `md` (0.375rem). No border.
*   **Secondary:** Background: Transparent; Border: 1px Ghost Border (15% opacity); Text: `primary`.
*   **Interaction:** On hover, transition to `gold-light` (#ffd740) with a subtle `xl` (0.75rem) corner radius expansion.

### Cards & Lists (The Editorial Block)
*   **Structure:** Absolutely no divider lines.
*   **Separation:** Use `spacing-8` (2.75rem) of vertical white space or a shift from `surface-container` to `surface-container-high`.
*   **Content:** Overlap images slightly over the card boundaries to break the "grid" feel.

### Input Fields
*   **Style:** Minimalist. Only a bottom-border using `outline-variant` at 40% opacity.
*   **Focus State:** The bottom border transforms into a 2px `primary` (Gold) line with a subtle `surface_bright` glow.

### Signature Component: The "Heritage Ribbon"
A decorative UI element—a thin vertical or horizontal line using the `gold` to `gold-light` gradient, used to tether floating text to the edge of the screen, providing a sense of alignment amidst the asymmetry.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins (e.g., 10% left, 20% right) for long-form content to create an editorial look.
*   **Do** allow serif headlines to overlap background geometric patterns.
*   **Do** use `white-soft` (#e8eef8) for secondary text to maintain a hierarchy of information.

### Don't:
*   **Don't** use pure black (#000000) for any shadows or backgrounds; it kills the "Deep Blue" atmosphere.
*   **Don't** use standard "Material Design" rounded buttons (pill shape) unless it's for a small Chip component. Stick to `md` (0.375rem) for a more formal, architectural feel.
*   **Don't** clutter the screen. If in doubt, increase the spacing scale by one increment (e.g., move from `spacing-6` to `spacing-8`).