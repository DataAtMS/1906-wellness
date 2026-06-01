#!/usr/bin/env bash
# Generate all 24 articles using local claude CLI with Sonnet model.
# Idempotent: skips files that already exist.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CANN_DIR="$ROOT/content/cannabis"
WELL_DIR="$ROOT/content/wellness"
mkdir -p "$CANN_DIR" "$WELL_DIR"

MODEL="claude-sonnet-4-5"

# Bylines pool (rotate by index).
BYLINES=(
  "Sarah Chen, Staff Writer"
  "Marcus Williams, Contributing Editor"
  "Priya Patel, Senior Correspondent"
  "James O'Brien, Policy Reporter"
)

# Date pool: spread across last 60 days. Today is 2026-06-01 ET.
# Format: YYYY-MM-DD
DATES=(
  "2026-05-28" "2026-05-26" "2026-05-22" "2026-05-19" "2026-05-15" "2026-05-12"
  "2026-05-08" "2026-05-04" "2026-04-30" "2026-04-25" "2026-04-19" "2026-04-12"
  "2026-04-08" "2026-04-04" "2026-04-01"
)

gen_article() {
  local outfile="$1"
  local title="$2"
  local category="$3"
  local topic_prompt="$4"
  local byline="$5"
  local date="$6"

  if [[ -f "$outfile" ]]; then
    echo "SKIP existing: $outfile"
    return 0
  fi
  echo "GEN  $outfile"

  local prompt
  prompt=$(cat <<EOF
Write a 600-word editorial news article on this topic: $topic_prompt

Strict rules:
- Output PLAIN MARKDOWN BODY ONLY. No title. No byline. No date. No frontmatter.
- Tone: factual, journalistic, editorial. Like a wire service piece.
- DO NOT use em dashes (—) anywhere. Use periods, commas, or hyphens for compound words only.
- DO NOT use marketing language. No "revolutionary," "game-changing," "breakthrough," "transform."
- DO NOT reference any specific commercial product or brand for purchase. Do not mention 1906 or any 1906 product.
- DO use 2 or 3 short section subheadings (## level) to organize the piece.
- DO cite generic sources by type (peer-reviewed journals, federal agencies, industry groups, state regulators) without inventing specific URLs or fabricated study titles.
- Length: aim for 600 words, between 500 and 700 is acceptable.
- Plain prose. No bullet lists unless absolutely natural.
- Begin directly with the article lede paragraph.
EOF
)

  local body
  body=$(claude --model "$MODEL" --print "$prompt" 2>&1) || {
    echo "ERROR claude call failed for: $title" >&2
    return 1
  }

  # Strip any em dashes that slipped through (replace with comma+space).
  body=$(printf '%s' "$body" | sed 's/—/, /g')

  cat > "$outfile" <<EOF
---
title: "$title"
byline: "$byline"
date: "$date"
category: "$category"
---

$body
EOF
}

idx=0
pick_byline() {
  echo "${BYLINES[$((idx % ${#BYLINES[@]}))]}"
}
pick_date() {
  echo "${DATES[$((idx % ${#DATES[@]}))]}"
}

# ---------- CANNABIS ARTICLES (12) ----------

declare -a CANN=(
  "DEA Cannabis Rescheduling Discussions Continue to Shape Federal Outlook|Policy and Regulation|recent-dea-cannabis-rescheduling-discussions|recent Drug Enforcement Administration discussions around cannabis rescheduling, the process for moving cannabis between schedules, stakeholder positions from industry, public health experts, and law enforcement, and what rescheduling would and would not change for federal law"
  "State-Level Cannabis Legalization Continues to Advance in 2026|Policy and Regulation|state-cannabis-legalization-2026|state-level cannabis legalization developments in 2026, recent ballot initiatives, legislative activity in states considering adult-use programs, and contrasts with states maintaining prohibition or medical-only frameworks"
  "Hemp-Derived THC Regulatory Landscape Remains Unsettled|Policy and Regulation|hemp-derived-thc-regulation-post-farm-bill|the regulatory landscape for hemp-derived THC products following the 2018 Farm Bill, the gap between federal hemp definitions and state actions, ongoing congressional debate, and what regulators at the FDA and state level are signaling"
  "Recent CBD Research on Chronic Pain Builds Evidence Base|Science and Research|cbd-chronic-pain-research|recent peer-reviewed research findings on cannabidiol and chronic pain, including methodological challenges, what randomized trials have shown, areas where evidence remains limited, and how clinical researchers are designing newer studies"
  "Cannabinoid Receptor Research Opens New Therapeutic Questions|Science and Research|cannabinoid-receptor-research-advances|recent advances in cannabinoid receptor research including CB1 and CB2 receptor pharmacology, endocannabinoid system mapping, therapeutic targets under investigation, and what these findings may mean for future drug development"
  "Terpene Synergy and the Entourage Effect Face Renewed Scrutiny|Science and Research|terpene-synergy-entourage-effect-evidence|the current state of evidence for the entourage effect and terpene-cannabinoid synergy, distinguishing in-vitro findings from clinical evidence, methodological debates among researchers, and what well-designed studies suggest"
  "Cannabis Industry Consolidation Accelerates Through 2026|Industry News|cannabis-industry-consolidation-2026|major cannabis industry consolidation trends in 2026, multi-state operator mergers and acquisitions, divestiture patterns, capital market conditions affecting the industry, and how operators are positioning"
  "SAFE Banking Act Stalls Again as Cannabis Operators Adapt|Industry News|safe-banking-act-cannabis-banking|the current status of the SAFE Banking Act and cannabis banking access, ongoing challenges operators face with payment processing and traditional banking, workarounds in use, and the broader push to normalize financial services for state-legal businesses"
  "Hemp Beverage Category Grows as Mainstream Channels Expand|Industry News|hemp-beverage-market-growth|the rapid growth of the hemp beverage market in 2026, distribution expansion into liquor stores and grocery chains, regulatory questions around hemp-derived beverages, and category dynamics"
  "Microdosing Cannabis Gains Traction Among New Consumers|Market Trends|cannabis-microdosing-consumer-trends|emerging consumer trends around microdosing cannabis, who is adopting the practice, available product formats, what survey data suggests about motivations, and where the evidence base stands"
  "Cannabis Use Among Older Adults Climbs Sharply|Market Trends|cannabis-use-older-adults-2026|recent 2026 data on cannabis use among older adults, growth rates compared to prior years, primary reasons older consumers cite, clinical considerations physicians are flagging, and survey methodology notes"
  "Functional Cannabinoid Products Expand the Wellness Market|Market Trends|functional-cannabinoid-wellness-market|the expanding functional cannabinoid product category within the broader wellness market, distinctions between minor cannabinoids being commercialized, what consumer research firms are reporting on category growth, and regulatory considerations"
)

for entry in "${CANN[@]}"; do
  IFS='|' read -r title category slug topic <<< "$entry"
  gen_article "$CANN_DIR/$slug.md" "$title" "$category" "$topic" "$(pick_byline)" "$(pick_date)"
  idx=$((idx + 1))
done

# ---------- WELLNESS ARTICLES (12) ----------

declare -a WELL=(
  "Sleep Hygiene Fundamentals Remain the First-Line Intervention|Sleep|sleep-hygiene-fundamentals|evidence-based sleep hygiene fundamentals, what behavioral changes consistently improve sleep quality, common pitfalls clinicians see, and how sleep specialists prioritize interventions"
  "Understanding REM and Deep Sleep Cycles|Sleep|rem-and-deep-sleep-cycles|the science of REM and deep sleep cycles, what happens physiologically in each stage, why both matter for cognition and recovery, and how sleep architecture changes across the lifespan"
  "How Light Exposure Shapes Circadian Rhythm|Sleep|light-exposure-circadian-rhythm|how light exposure shapes circadian rhythm, the role of morning bright light, evening light reduction, blue light considerations, and practical guidance from chronobiology research"
  "Evidence-Based Stress Reduction Techniques|Stress|evidence-based-stress-reduction|evidence-based stress reduction techniques with the strongest research support, including cognitive behavioral approaches, breath-based interventions, exercise, and contrasts with techniques whose evidence is weaker"
  "Cortisol and Chronic Stress: What Research Shows|Stress|cortisol-chronic-stress-research|cortisol and chronic stress, what the physiology of the HPA axis looks like, how chronic stress patterns differ from acute responses, downstream health implications, and limits of cortisol measurement"
  "Active Versus Passive Recovery: A Closer Look|Recovery|active-vs-passive-recovery|the distinction between active recovery and passive recovery in exercise science, when each is indicated, what protocols sports scientists recommend, and how recovery practices have evolved"
  "Sleep's Role in Athletic Recovery|Recovery|sleep-athletic-recovery|the role of sleep in athletic recovery, what research on elite athletes shows about sleep duration and performance, hormonal recovery during sleep, and practical guidance for athletes and active adults"
  "Breathwork Techniques With Research Support|Mindfulness|breathwork-techniques-research|breathwork techniques that have research support, including box breathing, slow paced breathing, and physiological sigh techniques, what randomized studies have shown, and how clinicians apply them"
  "Meditation and Measurable Health Outcomes|Mindfulness|meditation-measurable-health-outcomes|meditation research and measurable health outcomes, what mindfulness-based stress reduction studies have shown, areas with stronger versus weaker evidence, and how researchers measure meditation effects"
  "Anti-Inflammatory Eating Patterns|Nutrition|anti-inflammatory-eating-patterns|anti-inflammatory eating patterns, what dietary patterns the evidence supports, the Mediterranean diet and related approaches, mechanistic plausibility, and where the research currently stands"
  "Hydration and Cognitive Performance|Nutrition|hydration-cognitive-performance|hydration and cognitive performance, what controlled studies show about mild dehydration and attention, individual variability, practical guidance from sports nutrition and clinical literature"
  "Magnesium, Sleep, and the Stress Response|Nutrition|magnesium-sleep-stress|magnesium and its relationship to sleep and stress response, what dietary versus supplemental magnesium research has shown, where claims outpace evidence, and clinically relevant dosing context"
)

for entry in "${WELL[@]}"; do
  IFS='|' read -r title category slug topic <<< "$entry"
  gen_article "$WELL_DIR/$slug.md" "$title" "$category" "$topic" "$(pick_byline)" "$(pick_date)"
  idx=$((idx + 1))
done

echo "DONE."
ls -1 "$CANN_DIR" | wc -l | xargs -I{} echo "Cannabis articles: {}"
ls -1 "$WELL_DIR" | wc -l | xargs -I{} echo "Wellness articles: {}"
