PRAGMA foreign_keys = ON;

CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE problems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  aliases_json TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','verified','published','archived')),
  confidence TEXT NOT NULL DEFAULT 'unverified' CHECK(confidence IN ('unverified','medium','high','official')),
  locality_mode TEXT NOT NULL DEFAULT 'national' CHECK(locality_mode IN ('national','province','district','service_area')),
  emergency_note TEXT,
  last_verified_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institutions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  institution_type TEXT NOT NULL,
  official_url TEXT,
  phone TEXT,
  notes TEXT,
  last_verified_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE jurisdictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  institution_id INTEGER NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  province TEXT,
  district TEXT,
  service_area TEXT,
  UNIQUE(institution_id, province, district, service_area)
);

CREATE TABLE channels (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  institution_id INTEGER NOT NULL REFERENCES institutions(id) ON DELETE CASCADE,
  channel_type TEXT NOT NULL CHECK(channel_type IN ('web','phone','e-government','email','in_person','other')),
  label TEXT NOT NULL,
  url TEXT,
  value TEXT,
  is_primary INTEGER NOT NULL DEFAULT 0,
  last_verified_at TEXT
);

CREATE TABLE routes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  problem_id INTEGER NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  province TEXT,
  district TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','review','verified','published','archived')),
  last_verified_at TEXT,
  UNIQUE(problem_id, province, district, version)
);

CREATE TABLE route_steps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  step_order INTEGER NOT NULL,
  institution_id INTEGER REFERENCES institutions(id),
  channel_id INTEGER REFERENCES channels(id),
  step_type TEXT NOT NULL CHECK(step_type IN ('first','alternative','escalation','appeal','emergency')),
  title TEXT NOT NULL,
  instructions TEXT NOT NULL,
  documents_json TEXT NOT NULL DEFAULT '[]',
  expected_time TEXT,
  UNIQUE(route_id, step_order)
);

CREATE TABLE sources (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_type TEXT NOT NULL CHECK(source_type IN ('official_web','legislation','official_pdf','official_notice','other')),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  publisher TEXT,
  published_at TEXT,
  checked_at TEXT NOT NULL,
  excerpt TEXT
);

CREATE TABLE problem_sources (
  problem_id INTEGER NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  source_id INTEGER NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY(problem_id, source_id)
);

CREATE TABLE route_sources (
  route_id INTEGER NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
  source_id INTEGER NOT NULL REFERENCES sources(id) ON DELETE CASCADE,
  PRIMARY KEY(route_id, source_id)
);

CREATE TABLE feedback (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  problem_id INTEGER REFERENCES problems(id),
  route_id INTEGER REFERENCES routes(id),
  institution_id INTEGER REFERENCES institutions(id),
  outcome TEXT CHECK(outcome IN ('resolved','unresolved','redirected','no_response','unknown')),
  response_days INTEGER,
  comment TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_problems_status ON problems(status);
CREATE INDEX idx_problems_category ON problems(category_id);
CREATE INDEX idx_routes_problem ON routes(problem_id);
CREATE INDEX idx_jurisdictions_location ON jurisdictions(province, district);
CREATE INDEX idx_feedback_route ON feedback(route_id);
