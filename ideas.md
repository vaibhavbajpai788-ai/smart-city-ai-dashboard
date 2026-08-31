# Smart City AI — Design Direction

## Three stylistic approaches

### Theme Name: Civic Signal Atlas
**Very Brief Intro:** A calm, high-trust control-room interface using midnight navy, warm ivory, and signal colors to make urban data feel legible and accountable.
**Probability:** 0.07

### Theme Name: Concrete & Current
**Very Brief Intro:** An editorial civic-technology aesthetic with graphite surfaces, blueprint lines, and electric cyan accents, designed to feel operational without becoming militaristic.
**Probability:** 0.03

### Theme Name: Daylight Commons
**Very Brief Intro:** A bright municipal dashboard inspired by public-service maps, using white space, mineral greens, and amber warnings for a transparent, citizen-friendly tone.
**Probability:** 0.08

## Chosen approach: Civic Signal Atlas

### Design Movement
Swiss International Typographic Style fused with contemporary civic information design: disciplined hierarchy, clear data grouping, asymmetric composition, and color used as a semantic signal rather than decoration.

### Core Principles
1. **Signal before spectacle:** status, urgency, and next action are visually obvious within two seconds.
2. **Calm authority:** dark navy foundations and warm surfaces create trust without the aggressive feel of a military command center.
3. **Evidence with explanation:** every AI recommendation is paired with a short reason and confidence indicator.
4. **Human review remains visible:** alerts show verification state and never imply that AI alone makes enforcement decisions.

### Color Philosophy
Midnight navy is the operating canvas; warm ivory panels keep extended reading comfortable. Coral red, leaf green, and saffron yellow are reserved for signal semantics. A distinctive mineral-cyan accent identifies AI insight and live system activity. The palette should feel like a city at blue hour: alert, grounded, and humane.

### Layout Paradigm
A persistent left rail anchors the control room. The main canvas uses a wide live-map stage on the left and a narrow intelligence rail on the right, with a secondary incident queue and signal table below. Avoid a centered marketing composition; the interface should feel like a working operations desk with a clear visual spine.

### Signature Elements
- A thin “live pulse” line motif running through the header and AI insight cards.
- Circular signal markers with directional mini-arrows on the map.
- Warm ivory data cards floating over a navy field, with small coordinate-style metadata labels.

### Interaction Philosophy
Interactions should reduce uncertainty. Hovering a junction highlights its four directions; selecting an alert reveals evidence and recommended next action; filters update the map and queue together. Placeholder controls must explain that they are coming soon rather than silently failing.

### Animation
Use short 180–240ms ease-out transitions for hover, focus, drawers, and filtering. Let live indicators breathe with a restrained opacity pulse, never a glowing neon effect. Stagger the first-load cards by 40ms. Respect reduced-motion preferences and keep keyboard navigation instant.

### Typography System
Use **Space Grotesk** for navigation, metric values, and display headings; use **DM Sans** for descriptions, tables, and operational copy. Headings are compact and slightly tracked; metadata uses uppercase 10–11px labels with generous letter spacing. Avoid excessive bold—use weight contrast to separate action from context.

### Brand Essence
**Smart City AI is an explainable urban intelligence desk for city operators and civic teams who need to see what is changing, why it matters, and what action is recommended.**

Personality adjectives: **clear, vigilant, humane**.

### Brand Voice
Headlines are concise and operational. CTAs describe the next decision rather than generic engagement. Microcopy explains confidence and verification in plain language.

Example lines:
- “See the city before the queue grows.”
- “Review the signal shift, then decide.”

### Wordmark & Logo
A compact four-way intersection mark: four rounded signal nodes orbit a small central square, forming an abstract city cross-section. The symbol should work without text and remain recognizable at favicon size.

### Signature Brand Color
**Signal Cyan — #5DD6D0.** It owns the AI insight layer and live system activity without competing with the red/green/yellow traffic semantics.

## File-level reminder
All frontend files should reinforce Civic Signal Atlas: Swiss civic information design, midnight navy canvas, warm ivory panels, semantic signal colors, Space Grotesk + DM Sans, asymmetric control-room layout, and restrained motion.
