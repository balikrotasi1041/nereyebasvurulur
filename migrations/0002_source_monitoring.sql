PRAGMA foreign_keys = ON;

ALTER TABLE sources ADD COLUMN content_hash TEXT;
ALTER TABLE sources ADD COLUMN etag TEXT;
ALTER TABLE sources ADD COLUMN last_modified TEXT;
ALTER TABLE sources ADD COLUMN last_successful_check_at TEXT;
ALTER TABLE sources ADD COLUMN change_detected_at TEXT;
ALTER TABLE sources ADD COLUMN monitoring_status TEXT NOT NULL DEFAULT 'pending';

ALTER TABLE problems ADD COLUMN review_required INTEGER NOT NULL DEFAULT 0;
ALTER TABLE routes ADD COLUMN review_required INTEGER NOT NULL DEFAULT 0;

CREATE TABLE verification_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_id INTEGER REFERENCES sources(id) ON DELETE SET NULL,
  problem_id INTEGER REFERENCES problems(id) ON DELETE SET NULL,
  route_id INTEGER REFERENCES routes(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  previous_hash TEXT,
  current_hash TEXT,
  note TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sources_monitoring_status ON sources(monitoring_status);
CREATE INDEX idx_problems_review_required ON problems(review_required);
CREATE INDEX idx_routes_review_required ON routes(review_required);
CREATE INDEX idx_verification_events_created_at ON verification_events(created_at);
