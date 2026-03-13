# 🛡️ SHIELD — Women's Safety App

<div align="center">

![SHIELD Logo](./assets/icon.png)

**Your safety, always.**

A powerful women's safety mobile application built with React Native & Expo

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Maps](https://img.shields.io/badge/Google_Maps-4285F4?style=for-the-badge&logo=google-maps&logoColor=white)](https://developers.google.com/maps)

</div>

---

## 📱 Screenshots

> App running on Android via Expo Go

| Home | SOS Active | Safety Map | AI Assistant |
|------|-----------|------------|--------------|
| SOS Button | Live Timer | Google Maps | Gemini AI |

---

## ✨ Features

### 🆘 Emergency SOS
- One-tap SOS button with 5-second countdown
- Sends emergency SMS to trusted contacts
- Live location broadcast every 15 seconds
- Auto audio recording on activation
- Shake-to-SOS (shake phone to trigger)

### 👥 Trusted Circle
- Add up to 10 trusted contacts
- Instant SMS alerts with Google Maps link
- Contact management with relation labels

### 🗺️ Safety Map
- Real-time Google Maps integration
- Live location tracking with blue dot
- Safe zone circle around user
- Community incident reporting
- Dark themed map matching app design

### 🤖 AI Safety Assistant
- Powered by Google Gemini AI
- Legal rights guidance for harassment
- Emergency hospital & police finder
- Safety tips for walking alone
- Emotional support 24/7
- Quick prompt suggestions

### ⟶ Safe Journey
- Share live route with trusted contacts
- Set destination and ETA
- Automatic alerts if you deviate
- Safe arrival confirmation

### 📞 Fake Call
- Realistic incoming call screen
- Accept/decline with timer
- Escape uncomfortable situations

### 🎙️ Evidence Capture
- AES-256 encrypted audio recording
- Legal timestamps on recordings
- Secure local storage

### ⚙️ Settings
- Shake-to-SOS toggle
- Auto-record on SOS
- Silent SOS mode
- Emergency services notification
- Calculator disguise mode
- Adjustable check-in interval

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React Native, Expo SDK 54 |
| **Navigation** | React Navigation v6 |
| **State Management** | Zustand |
| **Maps** | react-native-maps + Google Maps API |
| **AI** | Google Gemini 1.5 Flash API |
| **Location** | expo-location |
| **Sensors** | expo-sensors (shake detection) |
| **Audio** | expo-av |
| **SMS** | expo-sms |
| **Database** | MongoDB Atlas |
| **Backend** | Node.js + Express |
| **Auth** | JWT + bcryptjs |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Expo Go app on your phone
- Google Maps API Key
- Google Gemini API Key

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/chittatosha-mohanta/shield-womens-safety-app.git
cd shield-womens-safety-app
```

**2. Install dependencies:**
```bash
npm install
```

**3. Install Expo compatible packages:**
```bash
npx expo install expo-location expo-sensors expo-av expo-camera expo-sms expo-contacts expo-haptics expo-secure-store expo-local-authentication expo-notifications react-native-maps
```

**4. Configure API Keys:**

Open `app.json` and add your Google Maps API key:
```json
"android": {
  "config": {
    "googleMaps": {
      "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
    }
  }
}
```

Open `src/screens/AIAssistantScreen.js` and add your Gemini API key:
```javascript
const GEMINI_KEY = 'YOUR_GEMINI_API_KEY';
```

**5. Start the app:**
```bash
npx expo start
```

**6. Scan the QR code** with Expo Go on your Android/iOS device.

---

## 📁 Project Structure

```
shield-womens-safety-app/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # Main dashboard with SOS button
│   │   ├── SOSActiveScreen.js     # Emergency active screen
│   │   ├── ContactsScreen.js      # Trusted circle management
│   │   ├── AIAssistantScreen.js   # Gemini AI chat
│   │   ├── JourneyScreen.js       # Safe journey tracking
│   │   ├── SafetyMapScreen.js     # Google Maps screen
│   │   ├── EvidenceScreen.js      # Audio recording
│   │   ├── FakeCallScreen.js      # Fake incoming call
│   │   ├── ProfileScreen.js       # User profile
│   │   ├── SettingsScreen.js      # App settings
│   │   ├── SplashScreen.js        # Animated splash
│   │   ├── OnboardingScreen.js    # 5-slide onboarding
│   │   └── AuthScreen.js          # Login/signup
│   ├── navigation/
│   │   └── MainTabNavigator.js    # Bottom tab navigation
│   ├── hooks/
│   │   ├── useShakeDetector.js    # Shake detection hook
│   │   └── useLocation.js         # GPS location hook
│   ├── store/
│   │   └── appStore.js            # Zustand global state
│   └── utils/
│       └── theme.js               # Design tokens & colors
├── App.js                         # Root navigation
├── app.json                       # Expo configuration
└── package.json
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

> ⚠️ **Never commit API keys to GitHub!**

---

## 📦 Building APK

**Install EAS CLI:**
```bash
npm install -g eas-cli
eas login
```

**Build Android APK:**
```bash
eas build --platform android --profile preview
```

**Build for Production:**
```bash
eas build --platform android --profile production
```

---

## 🔒 Permissions Required

| Permission | Purpose |
|-----------|---------|
| `ACCESS_FINE_LOCATION` | Live location tracking |
| `ACCESS_BACKGROUND_LOCATION` | Background location during SOS |
| `RECORD_AUDIO` | Evidence recording |
| `SEND_SMS` | Emergency alerts |
| `VIBRATE` | SOS haptic feedback |
| `CAMERA` | Evidence photo capture |
| `READ_CONTACTS` | Import trusted contacts |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👩‍💻 Developer

**Chittatosha Mohanta**

- GitHub: [@chittatosha-mohanta](https://github.com/chittatosha-mohanta)

---

## 🙏 Acknowledgements

- Built with ❤️ for women's safety
- Powered by Google Gemini AI
- Maps by Google Maps Platform
- Database by MongoDB Atlas

---

<div align="center">
  <strong>🛡️ SHIELD — Because every woman deserves to feel safe.</strong>
</div>