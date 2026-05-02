# BYRON 27: ESCAPE PROTOCOL
## Quick Reference & Character Sheet

---

## CHARACTER: BYRON

### Physical Profile
```
Species:     Laboratory Mouse
Height:      ~4 inches (in-universe), 40px (game sprite)
Build:       Compact, athletic
Age:         2 years (mouse equivalent: young adult)
Personality: Curious, resourceful, determined
```

### The Experimental Sapatos (Shoes)
**Status:** Prototype - Neon Kinetic Enhancement Footwear v0.7

**Specifications:**
- **Material:** Experimental titanium-polymer composite
- **Glow Effect:** Bio-luminescent neon coating (cyan/magenta/lime channels)
- **Primary Function:** Kinetic energy conversion and acceleration
- **Special Features:**
  - Energy absorption from ambient motion
  - Dynamic traction adjustment
  - Real-time glow feedback indicating energy state

**Visual Design:**
- Oversized relative to Byron's body (exaggerated for visual clarity)
- Glowing base with particle effects during movement
- Color shifts based on Kinetic Energy Meter state
- Trail effect during high-speed movement

---

## MOVEMENT ABILITIES QUICK REFERENCE

### Tier 1: Always Available
| Ability | Input | Visual | Effect |
|---------|-------|--------|--------|
| **Walk** | A/D or Arrow Keys | Smooth stride | Movement at standard speed |
| **Sprint** | Hold SHIFT | Dust trail | 2x speed, -2 KEM/sec |
| **Jump** | Space or W | Arc trajectory | Default vertical movement |
| **Slide** | CTRL or C | Low crouch pose | Reduced hitbox, gap navigation |

### Tier 2: KEM-Dependent
| Ability | Cost | Duration | Cooldown | Effect |
|---------|------|----------|----------|--------|
| **Dash** | 30 KEM | 0.4s | 0.2s | 500px/s burst, invulnerable |
| **Double Jump** | 15 KEM | Instant | Per air-phase | 1.5x height, mid-air control |
| **Wall-Run** | 1 KEM/sec | Unlimited | N/A | Cling & traverse vertical walls |

### Tier 3: Advanced Techniques
| Technique | Requirements | Reward | Difficulty |
|-----------|--------------|--------|-----------|
| **Momentum Chain** | 3+ abilities sequentially | +10 KEM, 1.2x speed | Medium |
| **Air-Brake** | Mid-dash revert | Precision control | Hard |
| **Ledge Grab** | Near platform edge | Prevent death | Easy |

---

## KINETIC ENERGY METER (KEM) STATE CHART

```
┌─────────────────────────────────────────────────────────┐
│ KEM STATE COLORS & THRESHOLDS                           │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ 0-25 KEM:    🔴 RED CRITICAL                           │
│ └─ Warning: Can only walk & jump                       │
│ └─ Urgent: Use environmental boosters                 │
│                                                          │
│ 26-50 KEM:   🟡 YELLOW MODERATE                        │
│ └─ Caution: Limited ability use                        │
│ └─ Choose abilities strategically                      │
│                                                          │
│ 51-75 KEM:   🔵 CYAN OPTIMAL                           │
│ └─ Ready: Full ability range available                 │
│ └─ Good zone for challenging sections                  │
│                                                          │
│ 76-100 KEM:  🩷 MAGENTA PEAK                           │
│ └─ Surge: Maximum performance                          │
│ └─ Execute complex momentum chains                     │
│                                                          │
└─────────────────────────────────────────────────────────┘

KEM REGENERATION SOURCES:
┌──────────────────────┬──────────────┐
│ Action               │ KEM Gain     │
├──────────────────────┼──────────────┤
│ Free fall (1 sec)    │ +1           │
│ Wall contact (1 sec) │ +0.5         │
│ Dash completion      │ +15          │
│ Sentry defeat        │ +25          │
│ Momentum chain (x3)  │ +10 bonus    │
│ Launch pad hit       │ +40 instant  │
│ Momentum mirror      │ Speed boost  │
│ Rebound wall         │ +20          │
└──────────────────────┴──────────────┘
```

---

## FACILITY CHAMBERS OVERVIEW

### Chamber Progression Map

```
     ┌──────────┐
     │ CHAMBER 1│  TRAINING: Basic Controls
     │ START    │  Hazards: None
     └─────┬────┘  Focus: Movement tutorial
          │
     ┌─────▼────┐
     │ CHAMBER 2│  TUTORIAL: First Hazards
     │ LAB ZONE │  Hazards: Static obstacles
     └─────┬────┘  Focus: Precision jumps
          │
     ┌─────▼────┐
     │ CHAMBER 3│  SECURITY: Sentry Intro
     │ CHECKPOINT│ Hazards: Lasers, enemies
     └─────┬────┘  Focus: Timing & evasion
          │
     ┌─────▼────┐
     │ CHAMBER 4│  SECURITY: Advanced
     │ GUARD    │  Hazards: Dynamic obstacles
     └─────┬────┘  Focus: Complex routing
          │
     ┌─────▼────┐
     │ CHAMBER 5│  REACTOR: Heat Zone
     │ THERMAL  │  Hazards: Collapsing platforms
     └─────┬────┘  Focus: Speed management
          │
     ┌─────▼────┐
     │ CHAMBER 6│  REACTOR: Core Access
     │ PULSE    │  Hazards: EM pulses
     └─────┬────┘  Focus: Avoidance patterns
          │
     ┌─────▼────┐
     │ CHAMBER 7│  REACTOR: Meltdown
     │ CRITICAL │  Hazards: All previous + chaos
     └─────┬────┘  Focus: Synthesis
          │
     ┌─────▼────┐
     │ CHAMBER 8│  EXIT: Final Escape
     │ NEXUS    │  Hazards: Maximum intensity
     └──────────┘  Focus: Execution under pressure
```

### Difficulty Ramping Curve
```
100%  ╱─────────╱╲
   ╱╲╱         ╲  ╲
   Hazard      ╲  ╲
   Density  ╱   ╲  ╲
        ╱╲╱     ╲╲ ╲╲╱
 0% ╱  1  2  3  4  5  6  7  8
        Chamber Number

KEM Regen Rate (inverse):
100% ─────────
     ╲        ╲    ╲    ╲╲
      ╲    ╲   ╲    ╲ ╲  ╲╲╲
       ╲    ╲   ╲╲╲  ╲ ╲╲  ╲╲╲
 0%     ╲    ╲   ╲╲╲╲ ╲ ╲╲ ╲╲╲╲
         1  2  3  4  5  6  7  8
```

---

## HAZARD TYPES REFERENCE

### Environmental Hazards
```
┌─────────────────────────────────────────┐
│ LASER BARRIER                           │
│ ⚡⚡⚡ Cyan beam                         │
│ • Instant death on contact              │
│ • Predictable timing or alternate route │
│ • Cannot dash through                   │
├─────────────────────────────────────────┤
│ COLLAPSING PLATFORM                     │
│ 📉📉📉 Gray with warning glow           │
│ • Falls after 2-second delay            │
│ • Visual rumble indication              │
│ • Must reach safe zone quickly          │
├─────────────────────────────────────────┤
│ TOXIC VENT                              │
│ ☢️☢️☢️ Purple radiation                 │
│ • Progressive damage per second         │
│ • Forces rapid transit                  │
│ • Can dash through for speed            │
├─────────────────────────────────────────┤
│ ELECTROMAGNETIC PULSE                   │
│ ⚛️⚛️⚛️ Yellow distortion                │
│ • Periodic surge, drains 30 KEM        │
│ • Creates temporary platform glitch     │
│ • Predictable frequency                 │
└─────────────────────────────────────────┘
```

### Enemy Types
```
┌─────────────────────────────────────────┐
│ SENTRY DRONE                            │
│ 🤖 Orange quadrilateral                 │
│                                          │
│ Behavior: Patrol → Alert → Chase        │
│ Attack: Laser projectiles (1/sec)       │
│ Health: One dash through = defeat       │
│ Rewards: +25 KEM on defeat              │
│                                          │
│ Tactics:                                 │
│ • Use cover to break line-of-sight      │
│ • Chain dashes for approach             │
│ • Time your dash through                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ AUTOMATED TURRET (Static)               │
│ 🔧 Blue triangular mount                │
│                                          │
│ Behavior: Continuous scan + fire        │
│ Attack: Rapid laser burst (3/sec)       │
│ Health: Indestructible                  │
│ Solution: Bypass only, cannot defeat    │
│                                          │
│ Tactics:                                 │
│ • Chart safe patrol zones               │
│ • Use momentum chains for speed         │
│ • Dash through gaps in coverage         │
└─────────────────────────────────────────┘
```

---

## VISUAL LANGUAGE GUIDE

### Color-Coded Systems

#### KEM Meter States
```
LOW:     🔴 Red    (0-25%)    - Warning
MEDIUM:  🟡 Yellow (26-50%)   - Caution  
HIGH:    🔵 Cyan   (51-75%)   - Optimal
PEAK:    🩷 Magenta (76-100%)  - Surge
```

#### Environmental Elements
```
SAFE:      ⬜ Neutral Gray   - Traversable
HAZARD:    🔴 Red          - Deadly
ACTIVE:    ⚡ Cyan          - Moving/Timed
BOOST:     💚 Lime          - Momentum gain
WARNING:   ⚠️ Yellow        - Incoming danger
RADIATION: ☢️ Purple        - Progressive hazard
```

#### Particle Effects
```
MOVEMENT:  Cyan/Magenta dust trail behind Byron
DASH:      Burst of lime sparkles on activation
IMPACT:    Red flash on enemy collision
BOOST:     Gold spiral around launch pads
DANGER:    Pulsing red glow around hazards
CHAIN:     Rainbow gradient on successful chains
```

---

## AUDIO DESIGN QUICK REFERENCE

### Sound Categories
```
MOVEMENT SOUNDS (12 total):
├─ Dash         → Quick synth whoosh
├─ Jump         → Springy ascending note
├─ Double Jump  → Twin ascending notes
├─ Wall-Run     → Continuous friction tone
├─ Land         → Short impact thump
├─ Slide        → Smooth scraping tone
├─ Sprint       → Quickened step sounds
└─ [7 more environment-specific variations]

HAZARD ALERTS (8 total):
├─ Laser charging → High-pitched ascending beep
├─ Sentry lock    → Target acquisition tone
├─ Platform crumb → Low rumbling warning
├─ Vent activates → Hissing whoosh
└─ [4 more hazard warnings]

FEEDBACK SOUNDS (6 total):
├─ Momentum chain      → Ascending bell tones
├─ Ability use denied  → Buzzer sound
├─ Enemy defeat        → Triumphant chime
├─ KEM low warning     → Pulsing low tone
└─ [2 more UI interactions]
```

### Music Tempo Progression
```
Menu:           120 BPM (Ambient, relaxing)
Chambers 1-2:   140 BPM (Educational, steady)
Chambers 3-4:   160 BPM (Tension building)
Chambers 5-6:   180 BPM (Urgency increasing)
Chambers 7-8:   200+ BPM (Climax, intense)
Victory:        160 BPM (Triumphant, ascending)
Defeat:         80 BPM (Descending drone)
```

---

## CONTROLS REFERENCE SHEET

### Keyboard (Primary)
```
A/D or ◀ ▶      Move left/right
W or SPACE      Jump
SHIFT           Sprint
E               Dash
CTRL            Slide
ESC             Pause/Menu
```

### Gamepad (Controller)
```
Left Stick      Move left/right
A (Xbox) Cross  Jump
RT Trigger      Sprint (hold)
RB Bumper       Dash
LB Bumper       Slide
Start           Pause/Menu
```

### Accessibility Options
```
✓ Full remappable controls
✓ Colorblind modes (3 types)
✓ Text-to-speech for UI
✓ High contrast mode
✓ Inverted Y-axis option
✓ Frame-skip toggle
```

---

## PERFORMANCE METRICS

### Player Scoring Formula
```
┌─────────────────────────────────────────┐
│ SCORE = Base + Bonuses - Penalties      │
├─────────────────────────────────────────┤
│                                         │
│ Base Score:           1000 points       │
│                                         │
│ + Time Bonus:         +50 per 10s under │
│ + KEM Efficiency:     +100 if >75% KEM  │
│ + No-Damage:          +150 per zero hits│
│ + Ability Usage:      +25 per unique use│
│ + Speedrun Bonus:     +500 if <5 min    │
│                                         │
│ - Sentry Deaths:      -50 each          │
│ - Fall Deaths:        -25 each          │
│ - Hazard Hits:        -10 each          │
│                                         │
│ FINAL: Adjusted by difficulty modifier │
│        (1.0x Normal, 1.5x Hard, 2.0x   │
│         Insane)                        │
│                                         │
└─────────────────────────────────────────┘

EXAMPLE SCORING:
Chamber 1 at Normal difficulty:
• Base: 1000
• Time bonus (20s under): +100
• No-damage clear: +150
• 2 unique abilities: +50
• Total: 1300 points
```

### Leaderboard Categories
```
┌──────────────────────────────────────┐
│ GLOBAL LEADERBOARDS                  │
├──────────────────────────────────────┤
│ • Fastest Time (Any%)                │
│ • Fastest Time (100%)                │
│ • Highest Single Score               │
│ • Most Speedrun Submissions          │
│ • Community Challenge Winners        │
│                                       │
├──────────────────────────────────────┤
│ PERSONAL BESTS                       │
├──────────────────────────────────────┤
│ • Chamber-specific records           │
│ • Best score per difficulty          │
│ • Most-played chamber                │
│ • Career statistics                  │
└──────────────────────────────────────┘
```

---

## COSMETICS & UNLOCKABLES

### Sapatos Skins (Cosmetic-Only)
```
TIER 1 (Free Defaults):
├─ Classic Cyan (starter)
├─ Classic Magenta
└─ Classic Lime

TIER 2 ($2.99 each):
├─ Holographic Chrome
├─ Neon Fire
├─ Ice Crystal
└─ Void Shadow

TIER 3 ($4.99 each):
├─ Cosmic Nebula
├─ Cyberpunk Circuit
├─ Retro Arcade
└─ Mythic Gold

SEASONAL PASSES ($9.99/season):
├─ 4 exclusive skins
├─ 3 unique trail effects
├─ Custom particles
└─ Season-specific cosmetics
```

### Movement Trail Effects
```
Standard Trails (Free):
├─ Cyan Dust
├─ Magenta Smoke
└─ Lime Sparkle

Premium Trails ($1.99 each):
├─ Rainbow Gradient
├─ Electric Arc
├─ Crystalline Shatter
├─ Photon Wave
└─ Quantum Tunnel
```

### Lore Unlocks (Free via Gameplay)
```
FOUND IN LEVELS:
├─ Dr. Kess Audio Log #1 (Chamber 2)
├─ Dr. Kess Audio Log #2 (Chamber 4)
├─ Dr. Kess Audio Log #3 (Chamber 6)
├─ Echo First Contact (Chamber 3)
├─ Facility Blueprint Fragment (Chamber 5)
├─ Neon Sapatos Specifications (Chamber 7)
└─ Final Transmission (Chamber 8)

CHALLENGE UNLOCKS:
├─ "Speedrunner" - Beat any chamber in <2 min
├─ "No Damage" - Complete without hazard hits
├─ "Momentum Master" - 5+ chain in one run
└─ "KEM Saver" - Finish with 90%+ KEM
```

---

## DEVELOPMENT STATUS

### Current Phase: Design Documentation ✓
- [x] Core mechanics finalized
- [x] Level progression outlined
- [x] Art direction defined
- [x] Audio design specified

### Next Phases (Projected Timeline)
- [ ] **Pre-Alpha (Q2 2026):** Engine implementation, tutorial level
- [ ] **Alpha (Q3 2026):** Full 8-chamber campaign
- [ ] **Beta (Q3-Q4 2026):** Balancing, accessibility, optimization
- [ ] **Launch (Q4 2026):** Public release web + standalone
- [ ] **Post-Launch:** Cosmetics, DLC, community features

---

## DESIGN PHILOSOPHY SUMMARY

**Byron 27: Escape Protocol** distills the essence of the Byron 27 brand—**speed, agility, and kinetic energy**—into an interactive experience that respects player skill while remaining accessible to newcomers.

**Core Design Pillars:**
1. **Momentum-First Gameplay** - Every action has weight and consequence
2. **Accessibility as Standard** - Inclusive design from day one
3. **Speedrun-Ready** - Built with community-driven competition in mind
4. **Neon Aesthetic** - Consistent visual language across all media
5. **Narrative Through Play** - Story emerges from game mechanics and environment

**The Experience:** Players should feel the rush of high-speed movement, the satisfaction of perfectly-timed ability chains, and the urgency of escaping a collapsing facility—all while appreciating Byron's determined escape and the mysterious world beyond the laboratory.

---

*Quick Reference Guide v1.0*  
*Companion to Full GDD*  
*May 2, 2026*
