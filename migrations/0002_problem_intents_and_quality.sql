PRAGMA foreign_keys = ON;

ALTER TABLE problems ADD COLUMN intent_key TEXT;
ALTER TABLE problems ADD COLUMN parent_hub TEXT;
ALTER TABLE problems ADD COLUMN canonical_intent TEXT;
ALTER TABLE problems ADD COLUMN evidence_checklist_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE problems ADD COLUMN urgency TEXT NOT NULL DEFAULT 'normal'
  CHECK(urgency IN ('normal','time-limited','urgent'));
ALTER TABLE problems ADD COLUMN review_cadence_days INTEGER NOT NULL DEFAULT 180
  CHECK(review_cadence_days > 0);
ALTER TABLE problems ADD COLUMN threshold_key TEXT;
ALTER TABLE problems ADD COLUMN e_government_available INTEGER NOT NULL DEFAULT 0
  CHECK(e_government_available IN (0,1));
ALTER TABLE problems ADD COLUMN petition_required INTEGER NOT NULL DEFAULT 0
  CHECK(petition_required IN (0,1));
ALTER TABLE problems ADD COLUMN petition_reference_json TEXT;
ALTER TABLE problems ADD COLUMN source_conflicts_json TEXT NOT NULL DEFAULT '[]';

CREATE UNIQUE INDEX idx_problems_intent_key
  ON problems(intent_key)
  WHERE intent_key IS NOT NULL;

CREATE UNIQUE INDEX idx_problems_canonical_intent
  ON problems(canonical_intent)
  WHERE canonical_intent IS NOT NULL;

CREATE INDEX idx_problems_parent_hub ON problems(parent_hub);
CREATE INDEX idx_problems_threshold_key ON problems(threshold_key);

CREATE TABLE annual_thresholds (
  threshold_key TEXT NOT NULL,
  year INTEGER NOT NULL,
  label TEXT NOT NULL,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TRY',
  comparison TEXT NOT NULL CHECK(comparison IN ('under','at-or-under')),
  valid_from TEXT NOT NULL,
  valid_through TEXT NOT NULL,
  source_title TEXT NOT NULL,
  source_url TEXT NOT NULL,
  last_verified_at TEXT NOT NULL,
  review_cadence_days INTEGER NOT NULL CHECK(review_cadence_days > 0),
  PRIMARY KEY(threshold_key, year)
);

INSERT INTO annual_thresholds (
  threshold_key,
  year,
  label,
  amount,
  currency,
  comparison,
  valid_from,
  valid_through,
  source_title,
  source_url,
  last_verified_at,
  review_cadence_days
) VALUES (
  'consumer-dispute-thh',
  2026,
  'Tüketici Hakem Heyeti görev sınırı',
  186000,
  'TRY',
  'under',
  '2026-01-01',
  '2026-12-31',
  '6502 sayılı Kanunun 68 inci maddesindeki parasal sınırların artırılmasına ilişkin 2026 Tebliği',
  'https://www.resmigazete.gov.tr/eskiler/2025/12/20251223-5.htm',
  '2026-08-23',
  90
);
