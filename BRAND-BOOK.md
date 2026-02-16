  # T&R Car Detail — Brand Book

  **Version:** 1.0  
  **Language:** Nederlands (primary), English (metadata)  
  **Last updated:** 2026

  ---

  ## 1. Brand identity

  ### 1.1 Brand name
  - **Primary:** T&R Car Detail  
  - **Tagline (optional):** Professionele autoreiniging aan huis  
  - **Usage:** Always use the ampersand (`&`), not "en". No period after "Detail" in the logo lockup.

  ### 1.2 Positioning
  Professional, reliable car detailing and cleaning services. Premium feel with a clear call-to-action (booking). Trust through clarity and consistency.

  ---

  ## 2. Color palette

  ### 2.1 Primary colors

  | Name             | Hex       | Usage |
  |------------------|-----------|--------|
  | **Primary Dark** | `#0A0908` | Main background, header, footer bar, body text on light |
  | **Secondary Dark** | `#22333B` | Borders, secondary surfaces, footer background |
  | **Light**        | `#F2F4F3` | Body text on dark, cards, light sections |
  | **Accent Red**   | `#FF2E00` | CTAs, logo, links, highlights, “Boek Nu” |
  | **Accent Dark Red** | `#B80C09` | Hover/active states for red, gradients |

  ### 2.2 Tailwind / CSS variable mapping
  - `primary-dark` → `#0A0908`
  - `secondary-dark` → `#22333B`
  - `light` → `#F2F4F3`
  - `accent-red` → `#FF2E00`
  - `accent-dark-red` → `#B80C09`

  ### 2.3 Usage rules
  - **Backgrounds:** Prefer `primary-dark` for main UI; `secondary-dark` for footer and borders; `light` for content sections (e.g. services, testimonials).
  - **Text:** `light` on dark backgrounds; `primary-dark` on light backgrounds.
  - **Accent:** Use accent red for one primary action per screen (e.g. “Boek Nu”), important links, and the logo. Use accent dark red for hover/active on red elements.
  - **Gradients:** CTA sections use `from-accent-red to-accent-dark-red` (left to right).

  ### 2.4 Opacity
  - Muted text: `text-light opacity-70` / `opacity-80` / `opacity-90` as needed.
  - Overlays: e.g. `bg-primary-dark bg-opacity-60` on hero video.

  ---

  ## 3. Typography

  ### 3.1 Font families
  - **Headings:** Bebas Neue (weight 400) — `var(--font-bebas)`  
  - **Body:** Inter — `var(--font-inter)`  
  - **Fallbacks:** `sans-serif`, `system-ui`

  ### 3.2 Loading (Next.js)
  - Bebas Neue: `Bebas_Neue({ weight: '400', variable: '--font-bebas', subsets: ['latin'] })`
  - Inter: `Inter({ variable: '--font-inter', subsets: ['latin'] })`

  ### 3.3 Scale and usage

  | Element     | Font      | Size (Tailwind)     | Weight   | Notes |
  |------------|-----------|----------------------|---------|--------|
  | H1         | Bebas     | text-4xl → text-7xl  | 400     | Hero, page titles |
  | H2         | Bebas     | text-3xl → text-5xl  | bold    | Section titles |
  | H3         | Bebas     | text-xl → text-2xl    | bold    | Card titles, subsections |
  | H4         | Bebas     | text-lg              | semibold| Footer column titles |
  | Body       | Inter     | text-base (16px)     | normal  | Default copy |
  | Small      | Inter     | text-sm              | normal  | Captions, footer, labels |
  | Logo/header| Bebas/red | text-2xl             | bold    | “T&R Car Detail” |

  ### 3.4 Letter-spacing
  - Headings: `letter-spacing: 0.02em` (via base styles).
  - Hero title: `tracking-wider` where needed.

  ---

  ## 4. Layout and spacing

  ### 4.1 Container
  - Class: `container-custom`
  - Definition: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

  ### 4.2 Section padding
  - Class: `section-padding` → `py-20`
  - Common overrides: `py-24`, `py-20`, `pt-20 pb-0` as per section (e.g. services, CTA).

  ### 4.3 Grid
  - Services: `grid grid-cols-1 md:grid-cols-2` or `md:grid-cols-3` (e.g. testimonials preview).
  - Footer: `grid grid-cols-1 md:grid-cols-4 gap-8`.
  - Gaps: `gap-4`, `gap-6`, `gap-8` depending on density.

  ### 4.4 Header
  - Height: `h-20`
  - Sticky: `sticky top-0 z-50`
  - Border: `border-b border-secondary-dark`

  ---

  ## 5. UI components

  ### 5.1 Buttons
  - **Base:** `font-semibold`, `transition-all duration-200`, focus ring `focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-dark`, `corner-shape` (bevel).
  - **Variants:**
    - **Primary:** `bg-accent-red text-white` → hover `bg-accent-dark-red`, focus `ring-accent-red`. Shadow `shadow-sm hover:shadow-md`.
    - **Secondary:** `bg-secondary-dark text-light`, hover opacity 90%.
    - **Outline:** `border-2 border-accent-red text-accent-red bg-transparent` → hover `bg-accent-red hover:text-white`.
  - **Sizes:** `sm` (px-4 py-2 text-sm), `md` (px-6 py-2.5 text-base), `lg` (px-8 py-3 text-lg).
  - **Motion:** `whileHover={{ scale: 1.01 }}`, `whileTap={{ scale: 0.99 }}`, duration 0.15s.

  ### 5.2 Cards
  - **Base:** `bg-light rounded-lg p-6 border border-light shadow-lg`.
  - **Optional hover:** `whileHover={{ y: -4 }}`, duration 0.2s.
  - **Pricing / highlight:** Optional `ring-2 ring-accent-red` for “Meest Populair”.

  ### 5.3 Inputs
  - **Container:** `w-full`, label `text-sm font-medium text-primary-dark mb-2`.
  - **Field:** `w-full px-4 py-3 rounded-lg`, `bg-light border-2 border-secondary-dark border-opacity-30`, `text-primary-dark placeholder-gray-500`.
  - **Focus:** `focus:ring-2 focus:ring-accent-red focus:border-transparent`.
  - **Error:** `border-accent-red`, error text `text-sm text-accent-red`.

  ### 5.4 Corner shape
  - Class: `corner-shape`
  - CSS: `corner-shape: bevel round; border-radius: 1em 0 / 3em 0` (used on buttons).

  ---

  ## 6. Iconography
  - **Library:** Feather Icons via `react-icons/fi` (FiCalendar, FiList, FiHome, FiShield, FiCheck, FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiArrowRight, etc.).
  - **Style:** Outline, consistent stroke. Use `text-accent-red` for emphasis (e.g. footer, CTAs), `text-light` on dark backgrounds.
  - **Sizes:** Typically `w-4 h-4` to `w-5 h-5` for buttons; `size={24}` in footer.

  ---

  ## 7. Imagery and media
  - **Hero:** Full-bleed video or gradient `from-primary-dark via-secondary-dark to-primary-dark`. Overlay `bg-primary-dark bg-opacity-60`.
  - **Photos:** Prefer car detailing, exterior/interior, clean and professional. Unsplash or owned assets; keep aspect ratios consistent (e.g. 3/4 for service cards).
  - **Fallback:** If no image, use gradient or solid `secondary-dark` with optional icon/placeholder.

  ---

  ## 8. Motion
  - **Page/section in:** `initial={{ opacity: 0, y: 20 }}` → `animate` or `whileInView={{ opacity: 1, y: 0 }}`, duration 0.5–0.6s, optional delay by index.
  - **Buttons:** Slight scale on hover/tap (see Buttons).
  - **Cards:** Optional lift on hover (`y: -4`).
  - **Testimonials carousel:** Infinite horizontal scroll, linear, ~45s per full loop.
  - **Scroll:** `scroll-behavior: smooth` on `html`.

  ---

  ## 9. Voice and tone
  - **Language:** Dutch (NL) for all user-facing copy.
  - **Tone:** Professional, friendly, clear. “U” or “je” consistent per section (currently mixed; decide per section).
  - **Claims:** Emphasize “professioneel”, “krasvrij”, “grondig”, “aan huis”, “showroomstaat”.
  - **CTAs:** Direct: “Boek Nu”, “Boek dit pakket”, “Klaar om te Boeken?”.

  ---

  ## 10. Contact and legal
  - **Address:** Heidebloemstraat 66 Bus 11, 9100 Sint-Niklaas
  - **Phone:** +32 499 12 85 00
  - **Email:** info@trcardetail.be
  - **Footer copyright:** “© [Year] T&R Car Detail. Alle rechten voorbehouden.”
  - **Disclaimer (e.g. services):** Prijzen inclusief 21% BTW, indicatief; oversize wagens op aanvraag.

  ---

  ## 11. Email (transactional)
  - **Sender name:** T&R Car Detail
  - **Header bar:** Dark `#0f172a`, white text, “T&R Car Detail” + “Professionele auto-verzorging”.
  - **Body:** White background, dark text `#334155`, muted `#64748b`, links/accent `#0ea5e9` (or align to accent-red for full brand match).
  - **Footer:** “T&R Car Detail · Wij zorgen voor uw wagen”, small, muted.
  - **Layout:** Max width ~600px, single column, inline CSS for compatibility.

  ---

  ## 12. Checklist for new assets
  - [ ] Use only palette: primary-dark, secondary-dark, light, accent-red, accent-dark-red.
  - [ ] Headings: Bebas Neue; body: Inter.
  - [ ] Buttons: corner-shape, correct variant and size.
  - [ ] Container: container-custom; sections: consistent padding.
  - [ ] Focus and hover states use accent red / accent dark red where appropriate.
  - [ ] Copy in Dutch; tone professional and clear.
  - [ ] Contact details and legal line match this document.

  ---

  *This brand book is derived from the T&R Car Detail Next.js codebase and can be updated as the design system evolves.*
