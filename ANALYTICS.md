# ApexMoney - Analytics Implementation Guide

## Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Create" → "Property"
4. Enter property name: "ApexMoney"
5. Select reporting timezone: Your timezone
6. Select currency: USD (or your currency)
7. Once created, navigate to Admin → Property Settings
8. Copy your **Measurement ID** (G-XXXXXXXXXX)

### Step 2: Configure Frontend

1. Open `.env` file in ApexMoney_Frontend folder
2. Add your Measurement ID:
```
VITE_GA_ID=G-YOUR_MEASUREMENT_ID_HERE
```

3. The main.jsx will automatically load and initialize GA4

### Step 3: Verify Installation

1. Deploy application
2. Go to your app in browser
3. Open Developer Console (F12)
4. Go to Application → Cookies
5. Look for `_ga` cookie (confirms GA loaded)
6. In GA dashboard, look for real-time data after first page view

---

## Tracked Events

### 1. User Signup
**Event Name**: `user_signup`
**When**: User completes signup
**Parameters**:
- `method` (email | google)

**Implementation**:
```javascript
// In signup handler
trackAnalytics('user_signup', { method: 'email' });
```

**Location**: `components/Signup.jsx`

---

### 2. Expense Added
**Event Name**: `expense_added`
**When**: User adds new expense
**Parameters**:
- `category` (string)
- `amount` (number)

**Implementation**:
```javascript
trackAnalytics('expense_added', { 
  category: 'Food',
  amount: 50
});
```

**Location**: `components/AddExpenseForm.jsx`

---

### 3. Income Added
**Event Name**: `income_added`
**When**: User adds new income
**Parameters**:
- `category` (string)
- `amount` (number)

**Implementation**:
```javascript
trackAnalytics('income_added', { 
  category: 'Salary',
  amount: 5000
});
```

**Location**: `components/AddIncomeForm.jsx`

---

### 4. Goal Created
**Event Name**: `goal_created`
**When**: User creates financial goal
**Parameters**:
- `category` (string)
- `target_amount` (number)

**Implementation**:
```javascript
trackAnalytics('goal_created', { 
  category: 'Savings',
  target_amount: 10000
});
```

**Location**: `components/goals/GoalForm.jsx`

---

### 5. AI Insight Generated
**Event Name**: `ai_insight_generated`
**When**: AI processes user financial data
**Parameters**:
- `insight_type` (string: spending, savings, goals)

**Implementation**:
```javascript
trackAnalytics('ai_insight_generated', { 
  insight_type: 'spending_breakdown'
});
```

**Location**: `components/ai/AIInsights.jsx`

---

### 6. Report Exported
**Event Name**: `report_exported`
**When**: User downloads financial report
**Parameters**:
- `format` (pdf | csv | json | excel)

**Implementation**:
```javascript
trackAnalytics('report_exported', { 
  format: 'pdf'
});
```

**Location**: `components/Dashboard.jsx`

---

### 7. Password Changed
**Event Name**: `password_changed`
**When**: User updates password
**Parameters**: None

**Implementation**:
```javascript
trackAnalytics('password_changed');
```

**Location**: `components/Settings.jsx`

---

### 8. Account Deleted
**Event Name**: `account_deleted`
**When**: User permanently deletes account
**Parameters**: None

**Implementation**:
```javascript
trackAnalytics('account_deleted');
```

**Location**: `components/Settings.jsx`

---

### 9. Data Exported
**Event Name**: `data_exported`
**When**: User downloads data export
**Parameters**:
- `format` (json)

**Implementation**:
```javascript
trackAnalytics('data_exported', { 
  format: 'json'
});
```

**Location**: `components/Settings.jsx`

---

## Analytics Utility

**File**: `utils/analytics.js`

```javascript
// Manual tracking
trackEvent('event_name', { param1: 'value', param2: 123 })

// Pre-defined shortcuts
trackSignup('email')
trackExpenseAdded('Food', 50)
trackGoalCreated('Savings')
trackAIInsightGenerated('spending')
trackReportExported('pdf')
```

---

## Dashboard Reports

### Key Metrics to Monitor

1. **User Acquisition**
   - Signups per day
   - Signup method (email vs Google)
   - Device type distribution
   - Geographic distribution

2. **Activity Metrics**
   - Daily active users (DAU)
   - Monthly active users (MAU)
   - Average session duration
   - Bounce rate

3. **Feature Usage**
   - Expense tracking adoption
   - Goal creation rate
   - AI insight generation
   - Report exports

4. **Retention**
   - Day 1 retention
   - Day 7 retention
   - Day 30 retention
   - Churn rate

### Creating Custom Reports

1. Go to GA4 dashboard
2. Click "Reports" tab
3. Create new custom report
4. Select dimensions and metrics
5. Set date range and filters
6. Save report for future use

---

## Conversion Tracking

### Setting Up Goals

Goals track important actions:

1. **Goal Setup** in GA4 Admin
2. Select Property → Conversions → New Conversion Event
3. Create events for:
   - `user_signup` → Conversion
   - `schedule_demo` → Conversion
   - `upgrade_plan` → Conversion

### Viewing Conversions

Reports → Engagement → Conversion funnel

---

## Audience Segments

### Pre-built Segments

1. **Active Users** - Engaged users in last 30 days
2. **Power Users** - High frequency event triggers
3. **At-Risk Users** - Inactive for 7 days
4. **New Users** - Signed up in last 30 days

### Custom Segments

1. Click Audience → New Audience
2. Define criteria (user property, event, behavior)
3. Add to reports for segmented analysis

---

## E-commerce Tracking (If Applicable)

If you add payment processing, track:

```javascript
trackEvent('purchase', {
  transaction_id: 'TRX123',
  affiliation: 'ApexMoney',
  value: 99.99,
  currency: 'USD',
  tax: 9.99,
  shipping: 5.00,
  items: [
    {
      item_name: 'Premium Plan',
      item_category: 'subscription',
      price: 99.99,
      quantity: 1
    }
  ]
});
```

---

## Privacy Considerations

### GDPR Compliance with GA4

1. **Data Anonymization**
   - IP anonymization enabled
   - No PII in custom parameters

2. **Consent Management**
   - Implement consent banner
   - Only send analytics if user consents
   - Respect do-not-track preferences

```javascript
// Conditional GA loading
if (userHasConsentedToAnalytics) {
  loadGoogleAnalytics(VITE_GA_ID)
}
```

3. **Data Retention**
   - GA4 default: 14 months
   - Can be configured in admin
   - User data automatically deleted per policy

---

## Debugging & Testing

### Enable Debug Mode

```javascript
// In development
window.gtag('config', VITE_GA_ID, {
  debug_mode: true  // Console logs all events
});
```

### Chrome Extension
Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) to see real-time event details.

### Verify Events in GA4

1. Go to Real-time report
2. Use app in another tab
3. See events appear in real-time
4. Check custom parameters

### Common Issues

**Events not appearing:**
1. Check VITE_GA_ID is correct
2. Verify .env file loaded (restart dev server)
3. Check browser console for errors
4. Ensure gtag script loaded (check Network tab)
5. Wait 24-48 hours for historical data processing

---

## Best Practices

### Parameter Naming
✓ Use snake_case: `user_id`, `page_path`
✗ Avoid CamelCase: `userId`, `pagePath`

### Data Quality
- Avoid tracking sensitive data (passwords, tokens)
- Don't use PII (email addresses) as values
- Keep parameter values consistent
- Validate data before tracking

### Event Naming
- Use descriptive names: `ai_insight_generated` not `event1`
- Keep consistent naming convention
- Don't use spaces or special characters
- Maximum 40 characters

### Sampling & Limits
- GA4 free tier: Up to 10 million events/month
- 500 custom events per property
- 1000 unique user IDs per session

---

## Integration with Other Tools

### Google Ads Integration
1. Go to admin → Linked accounts
2. Link your Google Ads account
3. Enable cross-platform tracking
4. Track conversions in Ads

### Data Studio Integration
1. Create Data Studio report
2. Connect GA4 as data source
3. Import dimensions and metrics
4. Build custom dashboards

---

## Regular Monitoring

### Weekly
- [ ] Check DAU/MAU trends
- [ ] Monitor bounce rate
- [ ] Review top pages/events
- [ ] Check for anomalies

### Monthly
- [ ] Analyze conversion funnel
- [ ] Review user segments
- [ ] Audit event implementation
- [ ] Plan new experiments

### Quarterly
- [ ] Analyze annual trends
- [ ] Review business impact
- [ ] Update goals/metrics
- [ ] Plan feature tracking

---

## Cost Estimation

**Google Analytics 4 Pricing:**
- Free tier: Unlimited within usage limits
- GA 360 (Enterprise): Contact sales

**Estimated Usage for ApexMoney:**
- 1000 MAU: ~50-100K events/month
- 10000 MAU: ~500K events/month

Well within free tier limits for most applications.

---

## Resources

- [GA4 Documentation](https://support.google.com/analytics/)
- [Event Implementation Guide](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Reporting Guide](https://support.google.com/analytics/answer/12161658)
- [GA4 Best Practices](https://support.google.com/analytics/answer/11986666)
