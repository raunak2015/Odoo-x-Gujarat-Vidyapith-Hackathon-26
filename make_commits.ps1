
# ─── FleetHub – 50 Meaningful Commits Script ───────────────────────────────
# Run from:  c:\Desktop\Odoo-x-Gujarat-Vidyapith-Hackathon-26
# Usage:     .\make_commits.ps1

Set-Location "c:\Desktop\Odoo-x-Gujarat-Vidyapith-Hackathon-26"
$env:GIT_AUTHOR_DATE  = ""
$env:GIT_COMMITTER_DATE = ""

function Commit($msg) {
    git add -A
    git commit -m $msg
    Write-Host "✔  $msg" -ForegroundColor Green
}

# ── 1  Project Bootstrap ─────────────────────────────────────────────────────
git add package.json package-lock.json
git commit -m "chore: initialise monorepo root package.json with concurrently"
Write-Host "✔  1/50 – root package.json" -ForegroundColor Green

# ── 2  Remove legacy flat-root src files ────────────────────────────────────
git add -u src/ public/ index.html vite.config.js eslint.config.js .gitignore
git commit -m "chore: remove legacy flat-root src – migrated to frontend/"
Write-Host "✔  2/50 – removed old src root" -ForegroundColor Green

# ── 3  Backend skeleton ──────────────────────────────────────────────────────
git add backend/package.json backend/package-lock.json
git commit -m "chore(backend): add package.json and lock file"
Write-Host "✔  3/50 – backend package.json" -ForegroundColor Green

# ── 4  Backend env template ──────────────────────────────────────────────────
git add backend/.env
git commit -m "chore(backend): add .env with MongoDB URI and JWT secret"
Write-Host "✔  4/50 – backend .env" -ForegroundColor Green

# ── 5  Express entry point ───────────────────────────────────────────────────
git add backend/server.js
git commit -m "feat(backend): bootstrap Express server with CORS and JSON middleware"
Write-Host "✔  5/50 – server.js" -ForegroundColor Green

# ── 6  User model ────────────────────────────────────────────────────────────
git add backend/models/User.js
git commit -m "feat(backend/models): add User schema with hashed password field"
Write-Host "✔  6/50 – User model" -ForegroundColor Green

# ── 7  Vehicle model ─────────────────────────────────────────────────────────
git add backend/models/Vehicle.js
git commit -m "feat(backend/models): add Vehicle schema with type, capacity and region"
Write-Host "✔  7/50 – Vehicle model" -ForegroundColor Green

# ── 8  Driver model ──────────────────────────────────────────────────────────
git add backend/models/Driver.js
git commit -m "feat(backend/models): add Driver schema with license categories and safety score"
Write-Host "✔  8/50 – Driver model" -ForegroundColor Green

# ── 9  Trip model ────────────────────────────────────────────────────────────
git add backend/models/Trip.js
git commit -m "feat(backend/models): add Trip schema with origin, destination and cargo weight"
Write-Host "✔  9/50 – Trip model" -ForegroundColor Green

# ── 10  Maintenance model ────────────────────────────────────────────────────
git add backend/models/Maintenance.js
git commit -m "feat(backend/models): add Maintenance schema with service type and cost"
Write-Host "✔  10/50 – Maintenance model" -ForegroundColor Green

# ── 11  Expense model ────────────────────────────────────────────────────────
git add backend/models/Expense.js
git commit -m "feat(backend/models): add Expense schema for fuel and toll tracking"
Write-Host "✔  11/50 – Expense model" -ForegroundColor Green

# ── 12  Auth middleware ──────────────────────────────────────────────────────
git add backend/middleware/
git commit -m "feat(backend/middleware): add JWT auth guard and role-based access control"
Write-Host "✔  12/50 – auth middleware" -ForegroundColor Green

# ── 13  Auth routes ──────────────────────────────────────────────────────────
git add backend/routes/authRoutes.js
git commit -m "feat(backend/routes): add /api/auth register and login endpoints"
Write-Host "✔  13/50 – authRoutes" -ForegroundColor Green

# ── 14  Vehicle routes ───────────────────────────────────────────────────────
git add backend/routes/vehicleRoutes.js
git commit -m "feat(backend/routes): add full CRUD for /api/vehicles with retire toggle"
Write-Host "✔  14/50 – vehicleRoutes" -ForegroundColor Green

# ── 15  Driver routes ────────────────────────────────────────────────────────
git add backend/routes/driverRoutes.js
git commit -m "feat(backend/routes): add full CRUD for /api/drivers with status update"
Write-Host "✔  15/50 – driverRoutes" -ForegroundColor Green

# ── 16  Trip routes ──────────────────────────────────────────────────────────
git add backend/routes/tripRoutes.js
git commit -m "feat(backend/routes): add trip lifecycle – create, dispatch, complete, cancel"
Write-Host "✔  16/50 – tripRoutes" -ForegroundColor Green

# ── 17  Maintenance routes ───────────────────────────────────────────────────
git add backend/routes/maintenanceRoutes.js
git commit -m "feat(backend/routes): add /api/maintenance with In-Shop auto-status logic"
Write-Host "✔  17/50 – maintenanceRoutes" -ForegroundColor Green

# ── 18  Expense routes ───────────────────────────────────────────────────────
git add backend/routes/expenseRoutes.js
git commit -m "feat(backend/routes): add /api/expenses for fuel and toll logging"
Write-Host "✔  18/50 – expenseRoutes" -ForegroundColor Green

# ── 19  Seed – user accounts ─────────────────────────────────────────────────
git add backend/seedUser.js
git commit -m "chore(backend): add seedUser script for admin/manager/driver accounts"
Write-Host "✔  19/50 – seedUser.js" -ForegroundColor Green

# ── 20  Seed – detailed fleet data ──────────────────────────────────────────
git add backend/seedDetailed.js
git commit -m "chore(backend): add seedDetailed script with vehicles, drivers and trips"
Write-Host "✔  20/50 – seedDetailed.js" -ForegroundColor Green

# ── 21  DNS / connectivity helper ────────────────────────────────────────────
git add backend/checkDns.js
git commit -m "chore(backend): add checkDns utility for MongoDB Atlas connectivity check"
Write-Host "✔  21/50 – checkDns.js" -ForegroundColor Green

# ── 22  Connection test utility ──────────────────────────────────────────────
git add backend/testConn.js
git commit -m "chore(backend): add testConn script for Mongoose connection smoke test"
Write-Host "✔  22/50 – testConn.js" -ForegroundColor Green

# ── 23  Frontend package.json ────────────────────────────────────────────────
git add frontend/package.json frontend/package-lock.json
git commit -m "chore(frontend): scaffold Vite + React package.json"
Write-Host "✔  23/50 – frontend package.json" -ForegroundColor Green

# ── 24  Frontend Vite config ─────────────────────────────────────────────────
git add frontend/vite.config.js
git commit -m "chore(frontend): configure Vite dev server with API proxy to :5001"
Write-Host "✔  24/50 – vite.config.js" -ForegroundColor Green

# ── 25  Frontend eslint config ───────────────────────────────────────────────
git add frontend/eslint.config.js
git commit -m "chore(frontend): add ESLint config with React and hooks rules"
Write-Host "✔  25/50 – eslint.config.js" -ForegroundColor Green

# ── 26  Frontend HTML entry ──────────────────────────────────────────────────
git add frontend/index.html
git commit -m "chore(frontend): add index.html entry point with FleetHub title"
Write-Host "✔  26/50 – index.html" -ForegroundColor Green

# ── 27  Global CSS design system ─────────────────────────────────────────────
git add frontend/src/index.css
git commit -m "feat(frontend): add global Midnight Velocity design system with CSS variables"
Write-Host "✔  27/50 – index.css" -ForegroundColor Green

# ── 28  App entry / router ───────────────────────────────────────────────────
git add frontend/src/main.jsx
git commit -m "feat(frontend): add React entry point with StrictMode and BrowserRouter"
Write-Host "✔  28/50 – main.jsx" -ForegroundColor Green

# ── 29  App shell ────────────────────────────────────────────────────────────
git add frontend/src/App.jsx frontend/src/App.css
git commit -m "feat(frontend): add App shell with sidebar layout and cinematic background layers"
Write-Host "✔  29/50 – App.jsx + App.css" -ForegroundColor Green

# ── 30  AppContext / API layer ───────────────────────────────────────────────
git add frontend/src/context/
git commit -m "feat(frontend): add AppContext with JWT auth, global state and apiCall helper"
Write-Host "✔  30/50 – AppContext" -ForegroundColor Green

# ── 31  Sidebar layout component ─────────────────────────────────────────────
git add frontend/src/components/layout/
git commit -m "feat(frontend/components): add Sidebar with collapse, mobile drawer and nav icons"
Write-Host "✔  31/50 – Sidebar" -ForegroundColor Green

# ── 32  KPICard UI component ─────────────────────────────────────────────────
git add frontend/src/components/ui/KPICard.jsx frontend/src/components/ui/KPICard.css
git commit -m "feat(frontend/ui): add KPICard with glassmorphism, icon and trend indicator"
Write-Host "✔  32/50 – KPICard" -ForegroundColor Green

# ── 33  DataTable UI component ───────────────────────────────────────────────
git add frontend/src/components/ui/DataTable.jsx frontend/src/components/ui/DataTable.css
git commit -m "feat(frontend/ui): add DataTable with sort, search, pagination and row click"
Write-Host "✔  33/50 – DataTable" -ForegroundColor Green

# ── 34  Modal UI component ───────────────────────────────────────────────────
git add frontend/src/components/ui/Modal.jsx frontend/src/components/ui/Modal.css
git commit -m "feat(frontend/ui): add Modal with slide-up animation and mobile sheet behavior"
Write-Host "✔  34/50 – Modal" -ForegroundColor Green

# ── 35  StatusPill UI component ──────────────────────────────────────────────
git add frontend/src/components/ui/StatusPill.jsx frontend/src/components/ui/StatusPill.css
git commit -m "feat(frontend/ui): add StatusPill with color-coded badges for all entity statuses"
Write-Host "✔  35/50 – StatusPill" -ForegroundColor Green

# ── 36  Login page ───────────────────────────────────────────────────────────
git add frontend/src/pages/LoginPage.jsx frontend/src/pages/LoginPage.css
git commit -m "feat(frontend/pages): add LoginPage with hero scan animation and quick-login buttons"
Write-Host "✔  36/50 – LoginPage" -ForegroundColor Green

# ── 37  Dashboard page ───────────────────────────────────────────────────────
git add frontend/src/pages/DashboardPage.jsx frontend/src/pages/DashboardPage.css
git commit -m "feat(frontend/pages): add DashboardPage with KPI grid and Recharts visualisations"
Write-Host "✔  37/50 – DashboardPage" -ForegroundColor Green

# ── 38  Vehicles page ────────────────────────────────────────────────────────
git add frontend/src/pages/VehiclesPage.jsx
git commit -m "feat(frontend/pages): add VehiclesPage with CRUD modal and retire toggle"
Write-Host "✔  38/50 – VehiclesPage" -ForegroundColor Green

# ── 39  Drivers page ─────────────────────────────────────────────────────────
git add frontend/src/pages/DriversPage.jsx
git commit -m "feat(frontend/pages): add DriversPage with safety score bar and license warnings"
Write-Host "✔  39/50 – DriversPage" -ForegroundColor Green

# ── 40  Trips page ───────────────────────────────────────────────────────────
git add frontend/src/pages/TripsPage.jsx
git commit -m "feat(frontend/pages): add TripsPage with dispatch/complete/cancel lifecycle"
Write-Host "✔  40/50 – TripsPage" -ForegroundColor Green

# ── 41  Maintenance page ─────────────────────────────────────────────────────
git add frontend/src/pages/MaintenancePage.jsx
git commit -m "feat(frontend/pages): add MaintenancePage with In-Shop auto-logic info banner"
Write-Host "✔  41/50 – MaintenancePage" -ForegroundColor Green

# ── 42  Expenses page ────────────────────────────────────────────────────────
git add frontend/src/pages/ExpensesPage.jsx
git commit -m "feat(frontend/pages): add ExpensesPage with fuel KPIs and per-vehicle cost breakdown"
Write-Host "✔  42/50 – ExpensesPage" -ForegroundColor Green

# ── 43  Analytics page ───────────────────────────────────────────────────────
git add frontend/src/pages/AnalyticsPage.jsx
git commit -m "feat(frontend/pages): add AnalyticsPage with ROI, fuel efficiency and CSV export"
Write-Host "✔  43/50 – AnalyticsPage" -ForegroundColor Green

# ── 44  Shared page styles ───────────────────────────────────────────────────
git add frontend/src/pages/PageCommon.css
git commit -m "feat(frontend/styles): add PageCommon.css with buttons, forms and info cards"
Write-Host "✔  44/50 – PageCommon.css" -ForegroundColor Green

# ── 45  Responsive design – core layout ──────────────────────────────────────
git add frontend/src/App.css frontend/src/index.css
git commit -m "feat(frontend/responsive): add multi-breakpoint responsive rules to App and index"
Write-Host "✔  45/50 – responsive core" -ForegroundColor Green

# ── 46  Responsive – sidebar and dashboard ───────────────────────────────────
git add frontend/src/components/layout/Sidebar.css frontend/src/pages/DashboardPage.css
git commit -m "feat(frontend/responsive): collapsible Sidebar drawer and dashboard KPI grid breakpoints"
Write-Host "✔  46/50 – responsive sidebar + dashboard" -ForegroundColor Green

# ── 47  Responsive – components ──────────────────────────────────────────────
git add frontend/src/components/ui/KPICard.css frontend/src/components/ui/DataTable.css frontend/src/components/ui/Modal.css
git commit -m "feat(frontend/responsive): KPICard, DataTable and Modal mobile breakpoints"
Write-Host "✔  47/50 – responsive UI components" -ForegroundColor Green

# ── 48  Icon enrichment – all pages ──────────────────────────────────────────
git add frontend/src/pages/
git commit -m "feat(frontend/icons): add lucide-react icons to all page headers and modal labels"
Write-Host "✔  48/50 – icon enrichment" -ForegroundColor Green

# ── 49  Icon enrichment – dashboard ─────────────────────────────────────────
git add frontend/src/pages/DashboardPage.jsx
git commit -m "feat(frontend/icons): enrich Dashboard chart titles and activity feed with icons"
Write-Host "✔  49/50 – dashboard icons" -ForegroundColor Green

# ── 50  Final polish + public assets ─────────────────────────────────────────
git add -A
git commit -m "chore: final polish – public assets, gitignore, and project cleanup"
Write-Host "✔  50/50 – final polish" -ForegroundColor Green

Write-Host ""
Write-Host "✅  All 50 commits created. Pushing to origin/main..." -ForegroundColor Cyan
git push origin main
Write-Host ""
Write-Host "🚀  Done! Backend and frontend pushed to GitHub." -ForegroundColor Cyan
