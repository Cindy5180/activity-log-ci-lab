#!/usr/bin/env bash
# Verify every commit on main's first-parent line arrived through a pull request.
# Detects: direct pushes (no PR reference) and classifies PR merges by style.
# Usage: scripts/check-merge-style.sh [ref=origin/main]
set -u
REF="${1:-origin/main}"; bad=0
printf '%-8s %-14s %s\n' SHA STYLE SUBJECT
git log --first-parent --format='%h|%p|%s' "$REF" | while IFS='|' read -r sha parents subj; do
  np=$(wc -w <<<"$parents")
  if   [[ $np -eq 2 && $subj =~ ^Merge\ pull\ request\ \#[0-9]+ ]]; then style=merge-commit
  elif [[ $np -eq 1 && $subj =~ \(\#[0-9]+\)$ ]];                    then style=squash
  elif [[ $np -eq 0 ]];                                              then style=root
  elif [[ $np -eq 1 ]]; then style=rebase-or-DIRECT
  else style=UNKNOWN; fi
  printf '%-8s %-14s %s\n' "$sha" "$style" "$subj"
done
