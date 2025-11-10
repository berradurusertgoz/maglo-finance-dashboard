# Maglo Finance Dashboard

A financial dashboard project built with **React**, **Vite**, **TailwindCSS**, **Context API**, and real API integration.  
The project includes authentication, financial summaries, charts, wallet cards, scheduled transfers, and transactions.

## Features

### Authentication (Sign In / Sign Up)
- Form validation (email, password, full name)
- Error & success messages with React Toastify
- Loading state with animated loader
- Redirect if already logged in
- Disabled inputs during loading

###  Dashboard
- Pixel-perfect UI based on Figma
- Responsive layout (desktop & mobile)
- Sidebar navigation
- Header with user info
- Stats cards (total balance, spending, savings)
- Working Capital chart using **Recharts**  
- Recent Transactions table  
- Scheduled Transfers list  
- Wallet with layered card design (glassmorphism + gradients)

###  API Integration
- Authentication (login/register)
- Summary data
- Wallet data
- Transactions
- Scheduled transfers
- Working capital (income/expense trends)
- All with loading, error handling and

Installation & Setup

```bash
git clone https://github.com/berradurusertgoz/maglo-finance-dashboard.git
cd maglo-finance-dashboard
npm install
npm run dev

-----
## 🚀 Live Demo
https://maglo-finance-dashboard.netlify.app
