# ApexMoney - Google Play Store Compliance Guide

## Overview
This document outlines the implementation of Google Play Store policies for the ApexMoney application.

## 1. Account Deletion (MANDATORY)

### Implementation
- **Frontend**: Settings page with Account Deletion section
- **Backend**: `DELETE /api/user/delete-account` endpoint
- **Location**: `src/components/Settings.jsx`, `controllers/user.controller.js`

### Features
- Confirmation modal with "DELETE" text requirement
- Warning about permanent deletion
- Complete data removal including:
  - User document
  - All expenses
  - All income records
  - Financial goals
  - Subscriptions
  - AI insights
  - Bill reminders

### User Flow
1. Navigate to Settings → Delete Account
2. Read warning about permanent deletion
3. Type "DELETE" to confirm
4. Account and all data immediately deleted
5. Automatic logout

---

## 2. Privacy Policy

**Location**: `/privacy-policy` (Public route, no login required)

**Content**:
- Data collection practices (email, financial data)
- Password hashing using bcrypt
- AI processing of financial data
- Data retention policies
- Account deletion policy
- Third-party services

**File**: `pages/PrivacyPolicy.jsx`

---

## 3. Terms of Service

**Location**: `/terms-of-service` (Public route, no login required)

**Content**:
- AI insights are informational only
- Not financial advice
- User responsible for financial decisions
- Service usage terms
- Limitation of liability

**File**: `pages/TermsOfService.jsx`

---

## 4. API Security Implementation

### Middleware Stack
```javascript
1. Helmet - Security headers
2. CORS - Cross-origin resource sharing
3. express-rate-limit - Rate limiting
4. Authentication - Session-based auth
5. Input Validation - Zod schemas
```

### Rate Limiting
```
Auth routes (signup, login, forgot-password):
- 5 requests per minute per IP
- Error: 429 Too Many Requests

General API routes:
- 60 requests per minute per IP
- Error: 429 Too Many Requests
```

**Configuration**: `index.js`

---

## 5. Input Validation

### Schema Validation (Zod)

All inputs validated using Zod schemas in `validators/schemas.js`:

#### Authentication
- `signupSchema` - Email, password (8+ chars, uppercase, number)
- `loginSchema` - Email, password format
- `changePasswordSchema` - Old/new password validation

#### Financial Data
- `expenseSchema` - Amount, category, date, currency
- `incomeSchema` - Amount, category, date, source
- `goalSchema` - Goal name, target amount, deadline
- `subscriptionSchema` - Name, amount, billing cycle, dates

### Validation Middleware
```javascript
router.post('/add', requireAuth, validate(expenseSchema), addExpense)
```

---

## 6. Database Security

### MongoDB Indexes
Optimize queries and ensure userId filtering:

```javascript
// Expense Model
expenseSchema.index({ userId: 1, date: -1 });

// Income Model
incomeSchema.index({ userId: 1, date: -1 });

// Goal Model
goalSchema.index({ userId: 1 });

// Subscription Model
subscriptionSchema.index({ userId: 1 });
```

### Query Filtering
- All queries filter by userId
- No cross-user data access
- Use `requireAuth` middleware for all protected routes

---

## 7. Data Export Security

### Implementation
- **Endpoint**: `GET /api/user/export-data` (Protected)
- **Authentication**: Requires valid session
- **Format**: JSON file download
- **Contents**: User's complete financial data
- **File**: `controllers/user.controller.js`

### Export Process
1. Verify user authentication
2. Fetch user's data filtered by userId
3. Compile JSON export
4. Send as download (application/json)
5. Track event in analytics

---

## 8. Analytics Integration

### Google Analytics 4 Setup

**Frontend Configuration** (`main.jsx`):
```javascript
VITE_GA_ID=G-XXXXXXXXXX
```

### Tracked Events

1. **user_signup**
   - When user completes signup
   - Parameter: method (email/google)

2. **expense_added**
   - When expense created
   - Parameters: category, amount

3. **goal_created**
   - When financial goal created
   - Parameter: category

4. **ai_insight_generated**
   - When AI processes user data
   - Parameter: insight_type

5. **report_exported**
   - When user exports data
   - Parameter: format (json/pdf/csv)

6. **password_changed**
   - When user updates password

7. **account_deleted**
   - When user deletes account

### Implementation
```javascript
// In components/Settings.jsx
trackAnalytics('account_deleted');
```

---

## 9. Responsive Design for Mobile

### Mobile-First Implementation
- Collapsible navigation menu
- Touch-friendly button sizes (min 48px)
- Responsive Tailwind classes
- Viewport meta tags configured
- Tests on multiple screen sizes

### Key Components
- Header with mobile menu
- Settings page responsive grid
- Dashboard mobile layout
- Forms optimized for mobile input

---

## 10. Error Handling

### Centralized Error Handler
**Location**: `middleware/errorHandler.js`

```javascript
Response Format:
{
  success: false,
  message: "descriptive error message"
}
```

### Production Safety
- Stack traces hidden in production
- Consistent error responses
- Proper HTTP status codes
- User-friendly error messages

---

## 11. Environment Security

### Variables NEVER Exposed to Frontend
```
MONGODB_URL
JWT_SECRET
GOOGLE_CLIENT_SECRET
RESEND_API_KEY
GROK_API_KEY
SESSION_SECRET
```

### Frontend Safe Variables
```
VITE_BACKENDURL
VITE_GA_ID
VITE_ENV
```

### Configuration Files
- `.env.example` - Template for environment variables
- `.env` - Local configuration (not in git)
- `process.env.NODE_ENV` - Production detection

---

## 12. Password Security

### Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- Hashed using bcrypt (10 rounds)

### Implementation
```javascript
// Validation
passwordSchema = z.string()
  .min(8, '...')
  .regex(/[A-Z]/, '...')
  .regex(/[0-9]/, '...');

// Hashing
const hashedPassword = await bcrypt.hash(password, 10);
```

---

## 13. Data Retention

### Default Policy
- User data retained as long as account active
- Deleted data not recoverable
- No backup/archival after deletion
- Automatic session expiration: 24 hours

### MongoDB Cleanup
- Optional TTL indexes for temporary data
- Regular database maintenance
- Backup policies per your hosting provider

---

## 14. Play Store Specific Requirements

### ✅ Completed
- [x] Account deletion with complete data removal
- [x] Privacy policy accessible without login
- [x] Terms of service accessible without login
- [x] Password security requirements
- [x] Input validation on all forms
- [x] API security (authentication, rate limiting)
- [x] Error handling
- [x] Responsive mobile design
- [x] Analytics implementation
- [x] Data export functionality

### Checklist for Submission
```
[ ] Get Google Analytics 4 Measurement ID
[ ] Update VITE_GA_ID in frontend .env
[ ] Review Privacy Policy for your jurisdiction
[ ] Review Terms of Service with legal team
[ ] Test account deletion flow
[ ] Verify all secrets in .env
[ ] Test on Android devices
[ ] Setup WebView wrapper (if plan to use)
[ ] Configure Play Store Build
[ ] Add screenshots and description
```

---

## 15. WebView Wrapper (For Play Store)

If using WebView wrapper for Play Store:

```javascript
// In your WebView implementation
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
    userAgentString = "ApexMoney/Android"
}

// Ensure CORS is configured for your app domain
// Add to frontend CORS: https://your-domain.com
```

---

## Testing Checklist

- [ ] Test signup with weak passwords (rejected)
- [ ] Test account deletion flow completely
- [ ] Test data export
- [ ] Test rate limiting (5 rapid requests)
- [ ] Test invalid input (XSS, SQL)
- [ ] Test on Android 8+ device
- [ ] Test touch interactions
- [ ] Test offline behavior (if implemented)
- [ ] Test analytics events firing
- [ ] Test privacy policy accessibility

---

## Additional Resources

- [Google Play Store Policies](https://play.google.com/about/play-store-policies/)
- [GDPR Compliance Check](https://gdpr.eu/)
- [Privacy Regulation by Region](https://termly.io/resources/articles/privacy-laws/)
