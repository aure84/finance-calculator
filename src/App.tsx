import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SalaryPage from './pages/SalaryPage'
import MortgagePage from './pages/MortgagePage'
import CompoundPage from './pages/CompoundPage'
import LoanPage from './pages/LoanPage'
import DebtPayoffPage from './pages/DebtPayoffPage'
import RetirementPage from './pages/RetirementPage'
import TaxRefundPage from './pages/TaxRefundPage'
import SavingsGoalPage from './pages/SavingsGoalPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import DisclaimerPage from './pages/legal/DisclaimerPage'
import PrivacyPage from './pages/legal/PrivacyPage'
import TermsPage from './pages/legal/TermsPage'
import CookiesPage from './pages/legal/CookiesPage'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/salary-calculator" element={<SalaryPage />} />
        <Route path="/mortgage-calculator" element={<MortgagePage />} />
        <Route path="/compound-interest-calculator" element={<CompoundPage />} />
        <Route path="/loan-calculator" element={<LoanPage />} />
        <Route path="/debt-payoff-calculator" element={<DebtPayoffPage />} />
        <Route path="/retirement-calculator" element={<RetirementPage />} />
        <Route path="/tax-refund-calculator" element={<TaxRefundPage />} />
        <Route path="/savings-goal-calculator" element={<SavingsGoalPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-of-use" element={<TermsPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
        <Route path="*" element={<main style={{ padding: '60px 24px', textAlign: 'center' }}><h1>404 — Page Not Found</h1></main>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
