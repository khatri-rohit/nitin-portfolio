# Graphic Designer

A modern, single-page portfolio website for Nitin Khatri, a creative VFX and graphic designer. Built with Next.js 15 and React 19, featuring smooth animations, interactive elements, and a responsive design.

## Description

This portfolio showcases Nitin's work in visual storytelling, motion graphics, and digital artistry. The site includes a preloader, smooth scrolling via Lenis, scroll-triggered animations using GSAP and Framer Motion, and an interactive contact form with email integration.

## Features

- **Preloader**: Engaging loading animation with Lottie
- **Smooth Scrolling**: Implemented with Lenis for fluid navigation
- **Animations**: GSAP for text reveals and scroll triggers, Framer Motion for component transitions
- **Interactive Hero**: LiquidEther component with mouse-following effects
- **Responsive Design**: Mobile-optimized with Tailwind CSS 4
- **Contact Form**: Multi-step form with Nodemailer integration for email notifications
- **Custom Fonts**: Dahlia, Glitz, and SpaceGrotesk font families
- **Analytics**: Integrated Vercel Analytics

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP, Framer Motion, Lottie React
- **Smooth Scrolling**: Lenis
- **3D Effects**: Three.js (in LiquidEther)
- **Email**: Nodemailer
- **Icons**: Material-UI Icons, Lucide React, Iconify
- **TypeScript**: Full TypeScript support
- **Linting**: ESLint

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/nitin-portfolio.git
   cd nitin-portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see below)

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables for email functionality:

```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── app/
│   ├── api/contact/route.ts    # Contact form API
│   ├── globals.css             # Global styles and fonts
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── Components/
│   ├── About/                  # About section
│   ├── Contact/                # Contact form components
│   ├── Exprience/              # Experience timeline
│   ├── HeroSection/            # Hero components
│   ├── HomeClient/             # Main client component
│   ├── Navigation/             # Navbar
│   ├── PreLoader/              # Loading animation
│   └── Services/               # Creative fields/services
└── utils/                      # Utility hooks and components
public/
├── fonts/                      # Custom font files
├── img/                        # Static images
└── videos/                     # Background videos
```

## Deployment

This project is optimized for deployment on Vercel. The easiest way to deploy is through the Vercel platform:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

For manual deployment:

```bash
npm run build
npm run start
```

## Contributing

This is a personal portfolio project. For suggestions or improvements, please open an issue or contact directly.

## License

This project is public.
