 # Implementation Plan: Mukhtiyar Ultrasounds

## Overview

Build a premium medical booking and reporting platform using React (Vite) + TypeScript + Tailwind CSS. The app uses a local `products.json` as the data source and `localStorage` for cart/booking state. UI follows a clean white/slate/blue-600 theme, fully responsive from mobile to desktop.

## Tasks

- [x] 1. Scaffold project and configure tooling
  - Run `npm create vite@latest . -- --template react-ts` in the project root
  - Install dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `lucide-react`
  - Run `npx tailwindcss init -p` and configure `tailwind.config.js` with content paths
  - Add Tailwind directives to `src/index.css`
  - Create folder structure: `src/components`, `src/pages`, `src/context`, `src/data`, `src/types`
  - _Requirements: Project setup_

- [ ] 2. Define TypeScript types and seed data
  - [x] 2.1 Create `src/types/index.ts` with interfaces: `Product`, `CartItem`, `Booking`, `Category`
    - `Product`: id, name, slug, category, price, discountPrice, duration, description, prepInstructions, tags, featured, imageUrl
    - `CartItem`: product, quantity, appointmentDate, appointmentTime, patientName
    - `Booking`: id, items, totalAmount, status, createdAt, patientInfo
    - _Requirements: 2.1, 3.1_

  - [x] 2.2 Create `src/data/products.json` with 30+ entries across three categories
    - Categories: `ultrasound`, `lab-test`, `package`
    - Include at least 12 ultrasound tests, 12 lab tests, 6 packages
    - Each entry must have all fields from the `Product` interface including `prepInstructions`
    - Mark 6 items as `featured: true` for the home page
    - _Requirements: 2.1, 2.2_

  - [ ] 2.3 Write unit tests for product data integrity
    - Verify all 30+ products have required fields
    - Verify slugs are unique
    - _Requirements: 2.1_

- [ ] 3. Implement BookingContext for global state
  - [x] 3.1 Create `src/context/BookingContext.tsx`
    - State: `cart: CartItem[]`, `bookings: Booking[]`
    - Actions: `addToCart`, `removeFromCart`, `updateCartItem`, `clearCart`, `placeBooking`
    - Persist cart and bookings to `localStorage` on every state change
    - Rehydrate state from `localStorage` on mount
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ] 3.2 Write property test for cart state consistency
    - **Property 1: Cart total always equals sum of (item.product.discountPrice ?? item.product.price) * item.quantity**
    - **Validates: Requirements 4.2**

  - [ ] 3.3 Write property test for localStorage persistence
    - **Property 2: Any cart mutation followed by a context remount produces identical cart state**
    - **Validates: Requirements 4.3**

- [x] 4. Build shared layout components
  - [x] 4.1 Create `src/components/Header.tsx`
    - Logo (text "Mukhtiyar Ultrasounds" + stethoscope icon), nav links: Home, Services, Dashboard
    - Cart icon with item count badge (from BookingContext)
    - Mobile hamburger menu with slide-down nav
    - Sticky positioning, `bg-white shadow-sm`
    - _Requirements: 1.1, 5.1_

  - [x] 4.2 Create `src/components/Footer.tsx`
    - Three columns: brand/tagline, quick links, contact info
    - `bg-slate-900 text-slate-300`, copyright line
    - _Requirements: 1.1_

  - [x] 4.3 Create `src/components/Layout.tsx`
    - Wraps children between `<Header />` and `<Footer />`
    - Used by all pages
    - _Requirements: 1.1_

- [ ] 5. Implement Home page
  - [x] 5.1 Create `src/components/HeroBanner.tsx`
    - Full-width banner, headline, subheadline, two CTAs: "Book a Test" and "View All Services"
    - Gradient background `from-blue-600 to-blue-800`, white text
    - _Requirements: 1.2_

  - [x] 5.2 Create `src/components/ValueProps.tsx`
    - Three cards: "NABH Accredited", "Home Sample Collection", "Reports in 24hrs"
    - Icons from lucide-react, `bg-blue-50` cards
    - _Requirements: 1.3_

  - [x] 5.3 Create `src/components/FeaturedServices.tsx`
    - Read `featured: true` products from `products.json`
    - Render as a 3-col grid (1-col mobile) using `ServiceCard` component
    - "View All" link to `/services`
    - _Requirements: 1.4, 2.3_

  - [x] 5.4 Create `src/components/ServiceCard.tsx`
    - Reusable card: image placeholder, category badge, name, price (with strikethrough original), "Book Now" button
    - Clicking "Book Now" calls `addToCart` and navigates to `/cart`
    - _Requirements: 2.3, 4.1_

  - [x] 5.5 Create `src/components/TrustSignals.tsx`
    - Stats row: "10,000+ Patients", "50+ Tests", "15+ Years Experience", "ISO Certified"
    - `bg-slate-50` strip
    - _Requirements: 1.5_

  - [x] 5.6 Create `src/pages/HomePage.tsx`
    - Compose HeroBanner, ValueProps, FeaturedServices, TrustSignals inside Layout
    - _Requirements: 1.1–1.5_

- [ ] 6. Implement Services/Collections page
  - [x] 6.1 Create `src/components/FilterBar.tsx`
    - Category filter tabs: All, Ultrasound, Lab Tests, Packages
    - Sort dropdown: Price Low–High, Price High–Low, Name A–Z
    - Search input filtering by name/tags
    - _Requirements: 2.4, 2.5_

  - [x] 6.2 Create `src/components/ServiceGrid.tsx`
    - Accepts filtered+sorted product list, renders `ServiceCard` in responsive grid
    - Shows "No results found" state when list is empty
    - _Requirements: 2.3, 2.4_

  - [x] 6.3 Create `src/components/Pagination.tsx`
    - Page size: 9 items per page
    - Previous/Next buttons + page number indicators
    - _Requirements: 2.6_

  - [x] 6.4 Create `src/pages/ServicesPage.tsx`
    - Compose FilterBar, ServiceGrid, Pagination
    - Manage filter/sort/search/page state locally with `useState`
    - _Requirements: 2.1–2.6_

  - [ ] 6.5 Write property test for filter + sort correctness
    - **Property 3: Filtering by category then sorting never produces items outside the selected category**
    - **Validates: Requirements 2.4, 2.5**

- [ ] 7. Implement Test Detail page
  - [x] 7.1 Create `src/pages/TestDetailPage.tsx`
    - Route: `/services/:slug`
    - Load product by slug from `products.json`
    - Show full description, price, duration, category badge
    - Render prep instructions as a numbered list
    - "Add to Cart" button calls `addToCart` and shows inline confirmation
    - Show 404 message if slug not found
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ] 7.2 Write unit tests for TestDetailPage
    - Test slug lookup returns correct product
    - Test unknown slug renders 404 state
    - _Requirements: 3.1_

- [ ] 8. Implement Cart and Booking page
  - [x] 8.1 Create `src/components/CartItem.tsx`
    - Shows product name, price, quantity stepper (+/−), remove button
    - Calls `updateCartItem` / `removeFromCart` from context
    - _Requirements: 4.1, 4.2_

  - [x] 8.2 Create `src/components/BookingForm.tsx`
    - Fields: Patient Name, Phone, Email, Preferred Date (date picker), Preferred Time (select)
    - Basic required-field validation before submission
    - On submit calls `placeBooking` and clears cart
    - _Requirements: 4.4, 4.5_

  - [x] 8.3 Create `src/pages/CartPage.tsx`
    - List `CartItem` components, order summary (subtotal, discount, total)
    - Render `BookingForm` below summary
    - Show empty-cart state with link to Services when cart is empty
    - _Requirements: 4.1–4.5_

  - [ ] 8.4 Write property test for order total calculation
    - **Property 4: Order total = sum of each item's effective price × quantity, always ≥ 0**
    - **Validates: Requirements 4.2**

- [ ] 9. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement Patient Dashboard page
  - [x] 10.1 Create `src/pages/DashboardPage.tsx`
    - Read `bookings` from BookingContext (localStorage-backed)
    - Show list of past bookings: date, items, total, status badge (Confirmed / Pending)
    - Empty state: "No bookings yet. Book your first test."
    - _Requirements: 5.1, 5.2_

  - [x] 10.2 Create `src/components/BookingCard.tsx`
    - Displays single booking summary: booking ID, date, items list, total, status
    - _Requirements: 5.1_

  - [ ] 10.3 Write unit tests for DashboardPage
    - Test empty state renders correctly
    - Test bookings list renders all items from context
    - _Requirements: 5.1, 5.2_

- [ ] 11. Set up routing and wire all pages together
  - [x] 11.1 Install `react-router-dom` and configure routes in `src/App.tsx`
    - `/` → HomePage
    - `/services` → ServicesPage
    - `/services/:slug` → TestDetailPage
    - `/cart` → CartPage
    - `/dashboard` → DashboardPage
    - Wrap app in `BookingProvider` and `BrowserRouter`
    - _Requirements: All pages_

  - [x] 11.2 Update Header nav links to use `<Link>` from react-router-dom
    - _Requirements: 1.1_

- [ ] 12. Polish and responsive layout pass
  - [x] 12.1 Audit all pages for mobile responsiveness
    - Ensure 1-col layout on mobile (`grid-cols-1`), 3-col on desktop (`md:grid-cols-3`)
    - Verify Header hamburger menu works on small screens
    - _Requirements: 6.1_

  - [x] 12.2 Apply consistent design tokens across all components
    - Primary text: `text-slate-900`, accent: `text-blue-600 / bg-blue-600`
    - Buttons: `bg-blue-600 hover:bg-blue-700 text-white rounded-lg`
    - Cards: `bg-white shadow-sm border border-slate-100 rounded-xl`
    - _Requirements: 6.2_

- [ ] 13. Configure Vercel/Netlify deployment
  - [x] 13.1 Add `vercel.json` (or `netlify.toml`) with SPA rewrite rule
    - All routes rewrite to `/index.html` to support client-side routing
    - _Requirements: Deployment_

  - [x] 13.2 Add `.gitignore`, verify `vite.config.ts` build output is `dist/`
    - _Requirements: Deployment_

- [ ] 14. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All data lives in `src/data/products.json`; no backend required
- `localStorage` keys: `mu_cart` and `mu_bookings`
- Property tests validate universal correctness invariants; unit tests cover specific examples and edge cases
- Checkpoints ensure incremental validation before moving to the next phase
