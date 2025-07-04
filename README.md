# NoteMyCode
# Notemycode - Educational Programming Notes Website

A frontend-only educational website for programming language notes built with HTML, CSS, and vanilla JavaScript.

## Project Overview

Notemycode is an educational platform designed to provide notes and resources for various programming languages including C, Python, Java, HTML, CSS, and Data Structures & Algorithms (DSA). The site features a clean, responsive design with dark mode support.

## Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Light/Dark Mode Toggle**: User preference is saved in local storage
- **Interactive UI**: Smooth animations and transitions
- **Notes Repository**: Structured content for 6 programming languages
- **Downloadable Resources**: Links to PDF documents for offline learning
- **Contact Form**: Frontend-only implementation (no backend processing)

## Project Structure

```
notemycode/
├── index.html                  # Homepage
├── notes.html                  # Main notes selection page
├── contact.html                # Contact form page
├── notes/                      # Individual notes pages
│   ├── c.html
│   ├── python.html
│   ├── java.html
│   ├── htmlnotes.html
│   ├── css.html
│   └── dsa.html
├── css/                        # Stylesheets
│   ├── style.css               # Main stylesheet
│   └── notes.css               # Notes-specific styles
├── js/                         # JavaScript files
│   ├── script.js               # Main script file
│   └── darkmode.js             # Dark mode functionality
├── assets/                     # Static assets
│   ├── icons/                  # Icon images
│   │   ├── c.png
│   │   ├── python.png
│   │   ├── java.png
│   │   ├── html.png
│   │   ├── css.png
│   │   └── dsa.png
│   └── pdfs/                   # Downloadable PDFs
│       ├── c_notes.pdf
│       ├── python_notes.pdf
│       ├── java_notes.pdf
│       ├── html_notes.pdf
│       ├── css_notes.pdf
│       └── dsa_notes.pdf
└── README.md                   # Project documentation
```

## Technical Implementation

### HTML
- Semantic HTML5 markup
- Proper document structure with appropriate heading hierarchy
- Cross-page navigation with active state indicators

### CSS
- CSS variables for theming and consistency
- Flexbox and Grid for layout
- Media queries for responsive design
- Transitions and animations for interactive elements
- Dark/light mode themes

### JavaScript
- DOM manipulation for dynamic content
- Event listeners for user interactions
- Local storage for saving user preferences (dark/light mode)
- Form validation for the contact page

## Setup Instructions

1. **Clone or download the repository**:
   ```
   git clone https://github.com/username/notemycode.git
   ```
   or download as ZIP and extract

2. **Open in browser**:
   Navigate to the project directory and open `index.html` in any modern web browser.

   Alternatively, you can use a local development server:
   - With Python: `python -m http.server`
   - With Node.js: Install `http-server` package and run `http-server`

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Future Enhancements

1. **Backend Integration**:
   - User authentication system
   - Server-side form processing
   - User comments and discussions

2. **Content Improvements**:
   - Interactive code examples with syntax highlighting
   - Code playgrounds for testing snippets
   - Video tutorials integration

3. **Technical Enhancements**:
   - Search functionality
   - Bookmarking system
   - Progress tracking
   - Quiz/assessment modules

4. **SEO Optimization**:
   - Meta tags improvement
   - Sitemap implementation
   - Schema markup

## Contributing

As this is a student project, contributions are welcome but please note this is currently maintained by a single developer.

## License

This project is created for educational purposes.

## Author

- **Krishna Choudhary** - [krishnachoudhary9424@gmail.com]

---

*This is a frontend-only project created as part of a Computer Science course. No backend or database is implemented.*
