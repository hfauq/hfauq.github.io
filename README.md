# Hugo Fauquenoi - Personal Website

This is my personal portfolio website built with React, Vite, and Tailwind CSS. It's designed to be deployed on GitHub Pages.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/hfauq/hfauq.github.io.git
cd hfauq.github.io
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:5173`

## 🛠️ Built With

- **React** - UI library
- **Vite** - Build tool (fast and modern!)
- **Tailwind CSS** - Utility-first CSS framework
- **Inter Font** - Typography from Google Fonts

## 📝 Customization Guide

### Adding Your Profile Photo

1. Add your photo to the `public` folder (e.g., `public/profile.jpg`)
2. Update `src/components/Hero.jsx`:

```jsx
<div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden">
  <img 
    src="/profile.jpg" 
    alt="Hugo Fauquenoi"
    className="w-full h-full object-cover"
  />
</div>
```

### Adding Photos to the Gallery

1. Add your photos to the `public/photos` folder
2. Update the `photos` array in `src/components/PhotoGallery.jsx`:

```jsx
const photos = [
  { location: "Biarritz, France", image: "/photos/biarritz.jpg" },
  { location: "Pyrénées, France", image: "/photos/pyrenees.jpg" },
  // ... add more photos
]
```

3. Update the image rendering:
```jsx
<img 
  src={photo.image} 
  alt={photo.location}
  className="w-full h-full object-cover"
/>
```

### Updating Content

- **Work Experience**: Edit `src/App.jsx` - look for the "Work Section" comment
- **Podcast Appearances**: Edit `src/App.jsx` - look for the "Podcast Section" comment
- **About Info**: Edit `src/App.jsx` - look for the "About Section" comment
- **Footer**: Edit `src/components/Footer.jsx`

### Changing Colors

The color scheme is defined in `tailwind.config.js`. Current colors:
- Gray text: `#74747B`
- Light gray: `#CAC5D3`
- Divider gray: `#E2E4E9`

## 📦 Building for Production

Build the site for production:

```bash
npm run build
```

The built files will be in the `dist` folder.

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Deploying to GitHub Pages

### Initial Setup

1. Create a new repository on GitHub named `hfauq.github.io`
2. Push your code to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/hfauq/hfauq.github.io.git
git push -u origin main
```

### Deploy

Once your code is on GitHub, deploy with:

```bash
npm run deploy
```

This command will:
1. Build your site
2. Push the built files to a `gh-pages` branch
3. GitHub Pages will automatically serve your site

### Connecting Your Custom Domain (hfauq.com)

After deploying:

1. Go to your repository settings on GitHub
2. Navigate to **Pages** section
3. Under "Custom domain", enter: `hfauq.com`
4. Save the changes

Then, in your domain registrar (where you bought hfauq.com):

5. Add these DNS records:
   - Type: `A` → Name: `@` → Value: `185.199.108.153`
   - Type: `A` → Name: `@` → Value: `185.199.109.153`
   - Type: `A` → Name: `@` → Value: `185.199.110.153`
   - Type: `A` → Name: `@` → Value: `185.199.111.153`
   - Type: `CNAME` → Name: `www` → Value: `hfauq.github.io`

6. Wait for DNS propagation (can take up to 24-48 hours, but usually faster)

## 📁 Project Structure

```
hfauq.github.io/
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   │   ├── Hero.jsx
│   │   ├── Section.jsx
│   │   ├── WorkItem.jsx
│   │   ├── PodcastItem.jsx
│   │   ├── PhotoGallery.jsx
│   │   └── Footer.jsx
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles + Tailwind
│   └── main.jsx         # App entry point
├── index.html
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json
```

## 🎨 Design Philosophy

This website follows a minimalist design inspired by the original hfauq.com:
- Clean, two-column layout on desktop
- Mobile-responsive (stacks vertically on small screens)
- Simple typography with Inter font
- Subtle hover effects
- Focus on content over decoration

## 📄 License

This is a personal website. Feel free to use it as inspiration, but please don't copy it wholesale!

## 🤝 Contributing

This is a personal site, but if you spot any issues, feel free to open an issue or PR.

---

Built with ❤️ by Hugo Fauquenoi
