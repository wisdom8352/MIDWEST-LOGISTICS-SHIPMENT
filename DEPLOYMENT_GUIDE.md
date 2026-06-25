# Midwest Logistics Website - Deployment Guide

## Project Overview

The Midwest Logistics website is a fully functional, production-ready multi-page logistics platform built with Vite + React (frontend) and Express + Drizzle ORM (backend).

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Vite, React 19, Tailwind CSS 4, wouter (routing) |
| Backend | Express 4, tRPC 11, Drizzle ORM |
| Database | MySQL |
| Authentication | Manus OAuth |
| Styling | Tailwind CSS with custom Navy & Orange theme |

## Project Structure

```
midwest-logistics-permanent/
├── client/                    # Frontend (Vite + React)
│   ├── src/
│   │   ├── pages/            # All page components
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Track.tsx
│   │   │   ├── services/     # Individual service pages
│   │   │   │   ├── AirFreight.tsx
│   │   │   │   ├── SeaFreight.tsx
│   │   │   │   ├── RoadTransportation.tsx
│   │   │   │   ├── Warehousing.tsx
│   │   │   │   ├── SecureLogistics.tsx
│   │   │   │   └── PackagingStorage.tsx
│   │   │   ├── AdminLoginPage.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminShipments.tsx
│   │   │   ├── CreateShipmentPage.tsx
│   │   │   ├── ShipmentDetailPage.tsx
│   │   │   └── TrackingPage.tsx
│   │   ├── components/       # Reusable components
│   │   ├── App.tsx          # Main router
│   │   └── main.tsx         # Entry point
│   └── index.html
├── server/                    # Backend (Express + tRPC)
│   ├── _core/               # Core utilities
│   ├── routers.ts           # API routes
│   ├── db.ts                # Database helpers
│   └── index.ts             # Server entry
├── drizzle/                  # Database schema & migrations
├── shared/                   # Shared types and constants
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md

```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- MySQL database

### Installation

1. Extract the project ZIP file
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables (create `.env` file):
   ```
   DATABASE_URL=mysql://user:password@localhost:3306/midwest_logistics
   MANUS_OAUTH_ID=your_oauth_id
   MANUS_OAUTH_SECRET=your_oauth_secret
   ```

4. Run database migrations:
   ```bash
   pnpm run db:push
   ```

### Development

Start the development server:
```bash
pnpm run dev
```

The server will run on `http://localhost:3001` with hot module reloading enabled.

### Production Build

Build for production:
```bash
pnpm run build
```

Start the production server:
```bash
pnpm run start
```

## Pages & Routes

### Public Pages
- `/` - Home page with hero slider and services overview
- `/about` - Company information and mission
- `/services` - All services overview
- `/services/air-freight` - Air Freight service details
- `/services/sea-freight` - Sea Freight service details
- `/services/road-transportation` - Road Transportation (with carousel)
- `/services/warehousing` - Warehousing service details
- `/services/secure-logistics` - Secure Logistics service details
- `/services/packaging-storage` - Packaging & Storage service details
- `/contact` - Contact form and information
- `/track` - Shipment tracking interface
- `/track/:code` - View specific shipment tracking

### Admin Pages
- `/admin/login` - Admin login with Manus OAuth
- `/admin/dashboard` - Admin dashboard with metrics
- `/admin/shipments` - Shipment management list
- `/admin/shipments/create` - Create new shipment
- `/admin/shipments/:id` - View/edit shipment details

## Features

### Frontend Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Interactive navigation with dropdown menus
- ✅ Hero slider with auto-rotation
- ✅ Service carousel on Road Transportation page
- ✅ Contact form with validation
- ✅ Shipment tracking interface
- ✅ Admin dashboard with live metrics
- ✅ Professional Navy & Orange color scheme
- ✅ Smooth transitions and hover effects

### Backend Features
- ✅ tRPC API for type-safe communication
- ✅ Manus OAuth authentication
- ✅ Shipment management (CRUD operations)
- ✅ Tracking event management
- ✅ PDF invoice/receipt generation
- ✅ Real-time shipment metrics
- ✅ Database migrations with Drizzle

## Customization

### Colors
Update the color scheme in `client/src/index.css`:
- Primary Navy: `#000080`
- Secondary Navy: `#001a4d`
- Accent Orange: `#FF8C00`
- Hover Orange: `#E67E00`

### Content
- Update service descriptions in individual service page files
- Modify company information in `About.tsx`
- Update contact information in `Contact.tsx`

### Images & Assets
- All existing images are preserved
- Add new images to `client/public/` directory
- Reference images using relative paths

## Deployment Options

### Manus WebDev
The project is built with Manus WebDev scaffolding and can be deployed directly to Manus hosting.

### Traditional Hosting
1. Build the project: `pnpm run build`
2. Deploy the `dist/` directory to your hosting provider
3. Set up environment variables on your hosting platform
4. Configure database connection

### Docker
Create a `Dockerfile` for containerized deployment:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm run build
EXPOSE 3001
CMD ["pnpm", "start"]
```

## Maintenance

### Database
- Migrations are tracked in `drizzle/migrations/`
- Use `pnpm run db:push` to apply new migrations
- Use `pnpm run db:studio` to view database in Drizzle Studio

### Updates
- Keep dependencies updated: `pnpm update`
- Review and test changes before deploying
- Use version control (Git) to track changes

## Support & Documentation

- **Vite Documentation**: https://vitejs.dev/
- **React Documentation**: https://react.dev/
- **Tailwind CSS**: https://tailwindcss.com/
- **tRPC**: https://trpc.io/
- **Drizzle ORM**: https://orm.drizzle.team/

## License

This project is proprietary and confidential.

---

**Last Updated**: June 2026
**Version**: 1.0.0
