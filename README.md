# Karanki Nikhil Sai - Portfolio

A modern, responsive portfolio website showcasing my experience as a Data Engineering Analyst. Built with React, TypeScript, and Tailwind CSS.

## 🌐 Live Demo

**Portfolio:** [nikhil-sai.vercel.app](https://nikhil-sai.vercel.app/)

## 📋 About

I'm a Data & ETL Testing Analyst at Accenture with 2.9+ years of experience in data validation, automation, and quality assurance across large-scale pipelines. This portfolio showcases my professional journey, skills, and projects.

### Key Highlights
- 🚀 Promoted to Data & ETL Testing Analyst (Feb 2024)
- ⚡ ~70% reduction in manual reporting via Python automation
- 🏆 Client recognition: "Star of the Sprint" (2×)
- 🛠️ Hands-on with AWS (S3, Redshift, Athena) and Airflow/Talend

## 🛠️ Tech Stack

- **Frontend:** React 18.3.1 + TypeScript 5.5.4
- **Styling:** Tailwind CSS 3.4.10
- **Build Tool:** Vite 5.4.8
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🚀 Features

- ✨ **Modern Design** - Clean, professional interface with dark/light mode
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile
- 🌙 **Dark Mode** - Automatic theme detection with manual toggle
- ⚡ **Fast Loading** - Built with Vite for optimal performance
- 🔗 **Smooth Navigation** - Anchor links with smooth scrolling
- 📧 **Contact Form** - Direct mailto integration
- 📄 **Resume Download** - Easy access to PDF resume

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── nikhil-portrait.jpg      # Profile image
│   └── Karanki_Nikhil_Sai.pdf   # Resume PDF
├── src/
│   ├── App.tsx                   # Main component
│   ├── main.tsx                  # React bootstrap
│   └── index.css                 # Tailwind styles
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.ts
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nikhil0258/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your assets** (Important!)
   ```bash
   # Add your profile image as:
   public/nikhil-portrait.jpg
   
   # Add your resume as:
   public/Karanki_Nikhil_Sai.pdf
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🖼️ Required Assets

Make sure to add these files to the `public/` folder:

- **Profile Image:** `nikhil-portrait.jpg` (exact filename required)
- **Resume:** `Karanki_Nikhil_Sai.pdf`

The app includes fallback handling if these files are missing.

## 📝 Customization

### Personal Information
Update the following in `App.tsx`:
- Contact email in the `buildMailto` function
- Phone number in the Contact section
- LinkedIn and GitHub URLs
- Professional experience and projects

### Styling
- Colors and themes can be modified in `tailwind.config.js`
- Custom styles can be added to `index.css`

### Content Sections
The portfolio includes these sections:
- **Landing** - Hero section with introduction
- **About** - Professional background and highlights
- **Skills** - Technical competencies organized by category
- **Experience** - Work history and achievements
- **Projects** - Featured projects with links
- **Contact** - Contact form and social links

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the Vite configuration
3. Deploy with zero configuration required

### Other Platforms
The app uses `import.meta.env.BASE_URL` for asset paths, making it compatible with:
- GitHub Pages
- Netlify
- Any static hosting service

## 📧 Contact

- **Email:** nikhilsaikaranki1@gmail.com
- **Phone:** +91 93817 82476
- **LinkedIn:** [linkedin.com/in/nikhil-sai-karanki](https://linkedin.com/in/nikhil-sai-karanki)
- **GitHub:** [github.com/Nikhil0258](https://github.com/Nikhil0258)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Karanki Nikhil Sai
