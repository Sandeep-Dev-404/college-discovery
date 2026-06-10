# 🎓 College Discovery Platform

A production-grade MVP for college discovery and decision-making.

**Role:** Full Stack Engineer  
**Track:** Track B — College Discovery Platform

## 🔗 Links

- **Live URL:** https://college-discovery-gamma-ivory.vercel.app/


## ✨ Features Implemented

1. **College Listing + Search** — Search by name, city, state with filters and pagination
2. **College Detail Page** — Overview, courses, placements, reviews with tab navigation
3. **Compare Colleges** — Side-by-side comparison of 2-3 colleges
4. **Authentication + Saved Colleges** — Signup/Login with JWT, save favorite colleges

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, React, TypeScript, TailwindCSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | JWT (jose) + bcryptjs |
| Validation | Zod |
| Deployment | Vercel |

## 📁 Project Structure
app/
├── api/
│ ├── colleges/ # College listing and detail APIs
│ ├── auth/ # Login, Signup, Logout, Me APIs
│ └── saved/ # Save/unsave colleges API
├── colleges/ # College listing and detail pages
├── compare/ # Compare colleges page
├── saved/ # Saved colleges page
├── login/ # Login page
├── signup/ # Signup page
└── page.tsx # Home page

components/
├── Navbar.tsx # Responsive navbar with mobile menu
├── CollegeCard.tsx # Reusable college card component
└── SkeletonCard.tsx # Loading skeleton component

lib/
├── prisma.ts # Prisma client singleton
└── auth.ts # JWT token helpers


## 🏗️ Architecture Decisions

1. **Next.js App Router** — Used for both frontend pages and backend API routes in a single project
2. **Prisma ORM** — Type-safe database queries with PostgreSQL
3. **JWT in HTTP-only cookies** — Secure authentication without exposing tokens to JavaScript
4. **Zod validation** — Server-side input validation for all API endpoints
5. **Client-side state management** — Used React useState for search, filters, compare list
6. **Responsive design** — Mobile-first approach with TailwindCSS breakpoints

## 🔒 Edge Cases Handled

- Invalid college ID returns 404
- Duplicate saved colleges prevented using upsert
- Unauthorized users cannot save colleges (returns 401)
- Invalid signup/login input validated with Zod
- Empty search results show friendly empty state
- API errors show error state with retry button
- Pagination limit capped at API level
- All data comes from database, not hardcoded

## 🚀 Run Locally

```bash
git clone https://github.com/Sandeep-Dev-404/college-discovery.git
cd college-discovery
npm install