# Fundlytics Dashboard

Interactive React dashboard for financial analytics with blog, YTD and monthly returns, NAV/drawdown charts, and overlay tables. Parses Excel data, offers filtering, pagination, and a vibrant UI for portfolios and news.

## Features

- Interactive portfolio analytics dashboard
- Equity/NAV curve and drawdown charts (Recharts)
- Month-on-month and YTD returns (auto-calculated from Excel)
- Filterable NAV table in right-side overlay
- Financial news/blog home page with pagination and blog cards
- Clean, vibrant UI design (responsive, sidebar navigation)

## Tech Stack

- React (Hooks & Router)
- Recharts (visualizations)
- XLSX (Excel parsing)
- Modern CSS (modular components)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fundlytics-app.git
   cd fundlytics-app

   cd backend
   npm install
   npm start

   cd frontend
   npm install
   npm start
👉 http://localhost:8000 (runs for backend)
👉 http://localhost:3000 (runs for frontend)


4. Navigate to Home and Portfolios to explore features

## Folder Structure

- `/src/components` – React components (charts, overlays, sidebar, blog cards)
- `/src/styles` – CSS files for components
- `/public` – Static public files, Excel data, Images logo

## Customization

- Replace Excel NAV file as needed
- Change color palette in CSS for theming
- Extend blog/news section with your own endpoint






