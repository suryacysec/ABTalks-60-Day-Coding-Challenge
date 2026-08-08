# AI Usage Log (PROMPTS.md)

This document contains the chronological log of prompts and requests provided to the AI Agent (Google Deepmind Antigravity) to build the "ABTalks – 60 Day Coding Challenge" web application for the hackathon submission.

---

### Prompt 1: Initial Setup and Requirements
> Build a complete, production-quality mobile-first web application called "ABTalks – 60 Day Coding Challenge". This is for a hackathon submission. Build everything from scratch, polished and ready to deploy.
> 
> TECH STACK
> - React + Vite
> - Tailwind CSS
> - React Router v6
> - Recharts (for charts)
> - All data from /src/data/mock.js (no backend, no auth)
> 
> DESIGN SYSTEM (apply globally)
> - Dark theme ONLY. Background: #0A0A0F
> - Primary accent: Violet #7C3AED
> - Secondary accent: Electric blue #3B82F6
> - Success green: #10B981
> - Danger red: #EF4444
> - Font: Inter
> - Mobile-first: design for 390px, then scale up for desktop.

### Prompt 2: GitHub Repository Initialization
> push all the files of my project to this github repository https://github.com/suryacysec/ABTalks-60-Day-Coding-Challenge.git

### Prompt 3: Authentication and Push
> i did not find any popup. I want to give you the github authorization, so that you dont have to ask me everytime. [REDACTED_GITHUB_TOKEN]

### Prompt 4: Deployment Debugging (White Screen)
> i have deployed it using github but screen is blank please check the codes
> it is still same

### Prompt 5: Local Testing Request
> ok first send me local host link so i can see if it is working or not then i will see github

### Prompt 6: Bug Fix (Recruiter View Interaction)
> okay now github link is working, but the view full profile option on site is not working.

### Prompt 7: Personalization and Animations
> Make the UI more fluit and smooth.
> add smooth animations and transitions and rename my information.
> Name is Suryansh Gupta
> College is AKGEC
> Course and Branch are B.TECH in IT

### Prompt 8: UI/UX Glassmorphism
> please add smooth animations and fluid glass button design in the website

### Prompt 9: UI Polish and Speed
> make the buttons more fluid and glassy.
> animations should be fast and smooth

### Prompt 10: Further Deployment Debugging
> please check my website is not loading

*(Agent Response: Switched the Vite configuration `base` path from an absolute repository name to a relative path (`./`) to guarantee the assets loaded securely on GitHub pages irrespective of username/repo name changes).*

### Prompt 11: Aesthetic Upgrade (Dynamic Background)
> yes it is working but the background of the site is dark and looking very boring, add any dark theme with professional design

*(Agent Response: Implemented a professional, dynamic 20-second looping aurora borealis gradient background overlaying a subtle tech dot-grid, preserving the glassmorphism of the cards).*

### Prompt 12: Final Documentation
> i want ai usage log file also name it PROMPTS.md and add it in my repo also
