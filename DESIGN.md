---
name: Jomari Tiu, The Line
description: A frontend engineer's career drawn as one rapid-transit line; employers are stations, projects are stops.
colors:
  enamel: "#eef1ec"
  enamel-deep: "#e2e7e1"
  sign-face: "#f8faf6"
  ink: "#15181d"
  ink-soft: "color-mix(in oklab, #15181d 80%, #eef1ec)"
  ink-hair: "color-mix(in oklab, #15181d 16%, #eef1ec)"
  line-magis: "#e3a21a"
  line-optimind: "#c8283c"
  line-lightweight: "#1e7f5c"
  line-multisys: "#1f4fa8"
typography:
  display:
    fontFamily: "Overpass Variable, Overpass, sans-serif"
    fontSize: "clamp(3rem, 8.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Overpass Variable, Overpass, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Overpass Variable, Overpass, sans-serif"
    fontSize: "clamp(1.375rem, 2.3vw, 1.875rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Overpass Variable, Overpass, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Overpass Variable, Overpass, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.35
rounded:
  chip: "6px"
  plate: "12px"
  portrait: "14px"
  sign: "18px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  spine-x: "28px"
  rail: "72px"
  strip-h: "60px"
  container: "1200px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.pill}"
    padding: "12px 22px 10px"
    height: "48px"
  button-solid-hover:
    backgroundColor: "{colors.line-multisys}"
    textColor: "{colors.enamel}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 22px 10px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.enamel}"
  stack-chip:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "3px 9px 1px"
  station-sign:
    backgroundColor: "{colors.sign-face}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sign}"
  sign-band:
    backgroundColor: "{colors.line-multisys}"
    textColor: "{colors.sign-face}"
    padding: "14px 56px 12px"
  project-plate:
    backgroundColor: "{colors.enamel-deep}"
    rounded: "{rounded.plate}"
  line-strip:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.ink}"
    height: "{spacing.strip-h}"
---

# Design System: Jomari Tiu, The Line

## Overview

**Creative North Star: "The Line"**

The portfolio is a rapid-transit line diagram and its station signage. A career runs as one line through four stations (Magis, Optimind, Lightweight, Multisys) with each project a stop; the page rides it newest-first from "Now at Multisys" back to the depot (university), then out to the terminus (contact). Every visual device comes from that world: enamel sign panels with rounded corners, a coloured band naming the current station, roundels on a vertical spine, a sticky line strip with a train marker, and a diagram drawn on a 90°/45° grid.

The ground is cool porcelain enamel and the text is blue-black ink. Colour is a wayfinding signal and nothing else: each employer owns one line colour, and that colour appears only where its line is. Density is generous: one column of reading on a long spine, large display type, no card grids. Motion is mechanical and directional (lines draw, a train rides, spines fill, roundels light), never decorative float or bounce.

The world rejects the centred-name hero over a grid of project cards and the dark neon developer template.

**Key Characteristics:**
- Porcelain-enamel ground, blue-black ink, four line colours; no free greys (secondary ink is a mix of ink into enamel).
- One typeface, Overpass (Highway Gothic lineage), at 800 for headings, 700 for labels and actions, 400 for reading.
- Station signs: 2px ink border, 18px corners, a full-bleed coloured band along the bottom.
- The line as spine: an 8px vertical rail per station, filling with its colour as you scroll, roundels lighting once passed.
- Hollow ring = not yet reached; filled = reached or current. The current station is the loudest mark.

## Colors

A cool, near-monochrome enamel-and-ink world, punctuated by four transit-line colours that each mean exactly one employer.

### Primary
- **Multisys Line Blue** (`line-multisys`): the current station. Fills the hero sign's band, the current roundels and spine, and the "now" stop on the diagram. Because "you are here" is Multisys, it also serves the system's live-affordance cues: focus outline (3px, offset 3px), caret, `accent-color`, and the solid button's hover.

### Secondary
- **Lightweight Line Green** (`line-lightweight`): the Lightweight Solutions station (2022 to 2024): its spine, roundels, duty ticks, diagram segment, strip segment.
- **Optimind Line Red** (`line-optimind`): the Optimind Solutions station (2021 to 2022), same roles.

### Tertiary
- **Magis Line Amber** (`line-magis`): the Magis station (2021), the oldest line, same roles.

### Neutral
- **Porcelain Enamel** (`enamel`): page ground, ink-on-light text inverse, inner fill of hollow roundels.
- **Deep Enamel** (`enamel-deep`): recessed surfaces: screenshot plate backing, scrollbar track.
- **Sign Face** (`sign-face`): the brighter enamel of sign panels, their band text, and unlit stations on the diagram. Lives as a literal in the stylesheet, not a `:root` property.
- **Blue-Black Ink** (`ink`): all primary text, 2px panel borders, the solid button, the train, the depot/terminus dashes, and the full-bleed Toolkit board ground.
- **Soft Ink** (`ink-soft`): secondary text (sub-lines, meta, descriptions, duties).
- **Hairline Ink** (`ink-hair`): 1px to 2px dividers, chip outlines, the unreached track on the diagram.

### Named Rules
**The Colour Is A Line Rule.** A line colour appears only on things that belong to that line: its spine, roundels, duty ticks, diagram segment, strip segment, link underlines in its section. Sections set `--line` once and children inherit it; no component picks a line colour on its own. The single sanctioned exception is the current-station blue for focus, caret and solid-button hover.

**The Tint, Not Grey Rule.** Secondary and tertiary neutrals are mixes of ink into enamel (`color-mix(in oklab, ...)`), never a neutral grey value. On the ink-ground Toolkit board the mix inverts (enamel into ink at 78%, 45%, 22%).

**The Unreached Track Rule.** A line's not-yet-travelled state is its own colour at 22% into enamel (spine) or the hairline ink (diagram track), never a different hue.

## Typography

**Display Font:** Overpass Variable (with Overpass, sans-serif)
**Body Font:** Overpass Variable
**Label/Mono Font:** Overpass Variable, tabular figures (`font-variant-numeric: tabular-nums`) for dates, counters and years.

**Character:** One signage face for everything, as on a real transit system. Hierarchy comes from weight (800 / 700 / 400), tight negative tracking at large sizes, and scale, not from a second family.

### Hierarchy
- **Display** (800, clamp(3rem, 8.4vw, 6rem), 0.92): the name on the hero station sign. The terminus heading uses a close sibling (clamp(2.5rem, 7vw, 5.5rem), 0.95, max 14ch).
- **Headline** (800, clamp(2rem, 4.6vw, 3.5rem), 1): station names (employers) and the Toolkit heading. About uses clamp(1.875rem, 3.6vw, 2.75rem); the depot clamp(1.625rem, 3vw, 2.25rem).
- **Title** (800, clamp(1.375rem, 2.3vw, 1.875rem), 1.1): project (stop) names; fixed 1.375rem in compact stop lists.
- **Body** (400, 1.0625rem, 1.6): reading copy in soft ink, capped at 52ch to 68ch per block. Hero sub-line steps up to clamp(1.0625rem, 1.7vw, 1.375rem) at 1.4.
- **Label** (700, 0.8125rem): stack chips, sign fact terms, plate counters. Strip stop names drop to 0.6875rem. Labels are sentence case, never uppercase.

### Named Rules
**The One Face Rule.** Overpass only. Weight and size carry hierarchy; no second family, no italics for emphasis (emphasis is `strong` in full ink against soft-ink copy).

**The Signage Case Rule.** Labels, station names and band text are set in sentence or title case at weight 700 to 800, never tracked-out uppercase.

## Layout

A single 1200px container with a fluid gutter (clamp(16px, 4vw, 40px)). Station sections indent their content by a 72px rail; the line spine sits 28px into that rail, so every roundel, big or small, centres on the same vertical. Under 720px the rail narrows to 44px and the spine to 14px.

Projects alternate plate and text in a 1.45fr / 1fr split (mirrored on even stops), collapse to one column under 860px, and switch to a 300px plate column when a station has more than three stops. Section padding is fluid (roughly 56px to 112px block). The 60px sticky line strip is the navigation; `scroll-padding-top` clears it.

Breakpoints observed: 1000px (sign facts move under the name), 860px (stops stack), 720px (mobile: diagram labels become a two-column legend, strip names hide, rail narrows), 600px (Toolkit rows stack).

**The One Spine Rule.** Every station roundel, stop roundel and depot ring centres on `gutter + spine-x`. Nothing on the line floats off that axis.

## Elevation & Depth

Flat enamel. Depth comes from 2px ink outlines, coloured bands, and one inversion (the ink-ground Toolkit board), not from shadow stacks. The only cast shadow is a single soft drop under station sign panels, reading as an enamel sign standing slightly off the wall. The strip uses a 94% enamel fill with a blur where supported.

### Shadow Vocabulary
- **Sign lift** (`box-shadow: 0 18px 40px -24px color-mix(in oklab, #15181d 55%, transparent)`): station sign panels only (hero and terminus).

### Named Rules
**The Outline Before Shadow Rule.** A panel, plate or portrait is separated by a 2px ink border. Shadows are reserved for the sign panel.

## Shapes

Rounded enamel: everything that is a sign or a plate has softened corners (sign 18px, portrait 14px, plate 12px, chip 6px), and every interactive pill (buttons, plate controls) is fully round. Stations and stops are perfect circles: hollow rings with a thick line-coloured stroke, filled when lit; the current big roundel lights as a ring around a filled core. Lines terminate with round caps; the diagram turns on 90° and 45° only (a single 45° jog before the current station). Dashed ink marks unfinished or off-network track: the depot spine, the strip's end segments, the terminus approach.

## Components

### Buttons
Tactile, signage-solid pills.
- **Shape:** fully round (999px), 2px ink border, 48px minimum height; 40px in the strip.
- **Solid:** ink fill, enamel text, 700 weight. Hover turns to Multisys blue.
- **Ghost:** transparent with ink border and text; hover inverts to ink.
- **Press:** scales to 0.97 over 120ms; colour transitions 160ms on the house ease.

### Text links
Bold 700 with a 2px underline at 70% of the section's line colour, solidifying on hover, followed by an up-right arrow for external links.

### Chips (stack tags)
- **Style:** 0.8125rem / 700, 1.5px hairline-ink outline, 6px corners, no fill. Informational only, not interactive.

### Station sign (signature)
Sign-face panel, 2px ink border, 18px corners, sign lift shadow. Body holds a line-coloured roundel monogram, the display name and a fact column separated by a 2px hairline rule. A full-bleed band along the bottom in the current line colour reads "← previous · Now at X · Next station →". The terminus reuses the sign with an ink band.

### Project plate
Screenshot set in a 16:10 frame, 12px corners, 2px ink border, deep-enamel backing. Multi-image plates carry an ink pill of controls (prev, counter, next) bottom-right; images change with a directional clip-path wipe (500ms).

### Navigation: the line strip (signature)
Sticky 60px bar: name, a 6px rail coloured segment by segment by line (dashed ink at the depot and terminus ends), hollow 14px stop rings that fill on hover and when current (scale 1.25), and an ink train that rides the rail with scroll on a spring. The Email action sits at the right. On mobile the stop names hide and the name shortens to its monogram.

### Line diagram (signature)
SVG at 1200 by 220: 12px round-capped segments per line drawing themselves in sequence over 2.4s, on a 4px hairline track, with a train riding the route and one 45° jog before the current station. Stations are rings (11px radius, 17px for the current), the current one filling on arrival; a dashed ink stub runs past "now". Labels alternate above and below; under 720px they become a legend.

### Station spine and roundels
8px vertical spine per station at 22% line colour, filling from the top with scroll. Stop roundels are 26px rings (6px stroke); the station roundel is 48px (10px stroke). Each lights once 45% of the viewport has passed it, and stays lit.

## Do's and Don'ts

### Do:
- **Do** set `--line` once per station section and let spines, roundels, ticks and underlines inherit it.
- **Do** separate surfaces with 2px ink outlines on enamel; reserve the soft drop shadow for sign panels.
- **Do** draw any new line work on the 90°/45° grid with round caps and the spine axis at `gutter + spine-x`.
- **Do** use hollow rings for unreached stops and filled rings for reached or current ones.
- **Do** keep motion directional and once-only (draw, ride, fill, light) on `cubic-bezier(0.16, 1, 0.3, 1)`, with a reduced-motion path that shows the end state.

### Don't:
- **Don't** use a line colour for anything outside its line (no decorative amber, red or green; blue only for its line and the focus/caret/hover affordance).
- **Don't** introduce neutral greys; derive secondary tones by mixing ink into enamel.
- **Don't** add a second typeface or uppercase tracked labels.
- **Don't** lay projects out as a card grid or put the name centred alone over one; projects are stops on a spine.
- **Don't** go dark-mode neon: the only dark surface is the ink Toolkit board.
