# AidConnect - NGO & Donation Discovery Platform

**AidConnect** is a modern web application that connects donors with trusted NGOs, shelters, and community centers in Chennai. Built with React and Vite, it provides a seamless experience for discovering verified organizations and making meaningful contributions.

## 🌟 Features

### Core Functionality
- **Smart Discovery**: Browse and filter NGOs by category, donation type, and location
- **Interactive Map**: Visualize NGO locations with Leaflet integration
- **Intelligent Matching**: AI-powered recommendation system to match donors with suitable organizations
- **Verification System**: Multi-tier badge system showing government registration, certifications, and trust indicators
- **Dark Mode**: Full theme support for comfortable browsing

### Key Components
- **Disaster Alert Banner**: Real-time updates on urgent relief needs with progress tracking
- **Dynamic Donation Banner**: Rotating showcase of impact areas (Education, Healthcare, Animal Welfare, etc.)
- **NGO Cards**: Detailed organization profiles with contact info, accepted donations, and verification badges
- **Receipt Generator**: PDF receipt generation for donations
- **Responsive Design**: Mobile-first approach with seamless desktop experience

### Verification Badges
- 🏛️ Government Registered
- 🌍 FCRA Approved
- 📋 80G Tax Certified
- ✅ Audited
- 👁️ Transparent
- ⭐ Trusted Partner
- 🏅 ISO Certified
- 🏆 Award Winner
- 🔒 Secure Payments
- 🇮🇳 NITI Aayog Registered

## 🚀 Tech Stack

- **Frontend**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.12.0
- **Maps**: Leaflet 1.9.4 + React Leaflet 5.0.0
- **Backend**: Firebase 12.8.0
- **PDF Generation**: jsPDF 4.1.0 + html2canvas 1.4.1
- **Styling**: CSS Modules

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Alliun/ultron.git

# Navigate to project directory
cd ultron-9

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/
│   ├── DisasterAlert/      # Urgent relief notifications
│   ├── DonationBanner/     # Impact area showcase
│   ├── NgoCard/            # Organization cards
│   ├── VerificationBadge/  # Trust indicators
│   └── ...
├── pages/
│   ├── LandingPage/        # Home page
│   ├── DiscoverPage/       # NGO discovery
│   ├── MatchingPage/       # AI matching
│   └── ...
├── data/
│   └── ngos.js             # NGO database
└── App.jsx                 # Main app component
```

## 🎨 Key Features Breakdown

### 1. Discovery System
- Filter by 10+ categories (Children, Elderly, Animals, Medical, etc.)
- Search by donation type (Money, Food, Clothes, Books, Volunteering)
- Distance-based sorting
- Real-time filtering

### 2. Verification System
- Government registration validation
- Tax exemption certificates
- Financial audit status
- Transparency ratings
- Award recognition

### 3. User Experience
- No sign-up required
- Direct links to official NGO websites
- One-click map navigation
- Downloadable donation receipts
- Mobile-responsive design

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For issues and questions, please visit: [GitHub Issues](https://github.com/Alliun/ultron/issues)

## 🙏 Acknowledgments

- Built with React + Vite
- Map data from OpenStreetMap
- Icons from emoji standards
- Images from Unsplash

---

**Made with ❤️ for the Chennai community**