# Abel Palero - Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, TailwindCSS, and ShadCN UI.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Component-Based Architecture**: Modular, reusable components following best practices
- **Performance Optimized**: Server components, dynamic imports, and optimized images
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Contact Form**: Integrated with Supabase for secure message handling

## 🏗️ Architecture

### Folder Structure

```
my-portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles and TailwindCSS
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Main page component
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   │   ├── button.tsx    # Custom Button component
│   │   └── icon.tsx      # Icon component for SVG icons
│   ├── Header.tsx        # Navigation header
│   ├── Hero.tsx          # Hero section
│   ├── USP.tsx           # Unique selling proposition
│   ├── Projects.tsx      # Projects showcase
│   ├── Skills.tsx        # Technical skills
│   ├── About.tsx         # About section
│   ├── ContactCTA.tsx    # Contact call-to-action
│   ├── ContactModal.tsx  # Contact form modal
│   └── Footer.tsx        # Footer navigation
├── hooks/                # Custom React hooks
│   └── useContactModal.ts # Contact modal state management
├── lib/                  # Utility functions and constants
│   ├── constants.ts      # Application constants
│   └── utils.ts          # Utility functions
└── public/               # Static assets
    └── assets/           # Images and icons
```

### Key Components

- **Header**: Responsive navigation with mobile menu
- **Hero**: Main headline and call-to-action buttons
- **USP**: Unique selling proposition with benefits grid
- **Projects**: Featured projects with case studies
- **Skills**: Technology stack showcase
- **About**: Personal introduction and client logos
- **ContactCTA**: Contact call-to-action section
- **ContactModal**: Modal contact form
- **Footer**: Navigation links and copyright

### Design Principles

- **Component Reusability**: Small, focused components with clear interfaces
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Server components by default, client components when needed
- **Maintainability**: Clean separation of concerns and consistent patterns

## 🛠️ Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: ShadCN UI
- **State Management**: React hooks with custom hooks
- **Forms**: Native HTML forms with custom validation
- **Icons**: Custom SVG icon component
- **Deployment**: Vercel-ready

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Start production server**:
   ```bash
   npm start
   ```

## 📱 Responsive Design

The website is built with a mobile-first approach using TailwindCSS responsive utilities:

- **Mobile**: Optimized for small screens with collapsible navigation
- **Tablet**: Adaptive layouts for medium screens
- **Desktop**: Full-featured experience with side-by-side layouts

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management for modal dialogs
- Screen reader friendly content

## 🔧 Customization

### Colors
The primary brand color (`#FF7900`) is used throughout the design and can be customized in the TailwindCSS configuration.

### Content
Update the constants in `lib/constants.ts` to modify:
- Navigation links
- Project details
- Technology stack
- Benefits and features

### Styling
Modify `app/globals.css` for global style changes and use TailwindCSS utilities for component-specific styling.

## 📄 License

This project is private and proprietary to Abel Palero.

## 🤝 Contributing

This is a personal portfolio website. For business inquiries, please use the contact form on the website.
