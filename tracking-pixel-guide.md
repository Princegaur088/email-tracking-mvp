# 📧 Email Tracking Pixel Guide

## 🚀 After Deployment

Once your email tracking system is deployed, you'll get a URL like:
- **Railway:** `https://your-app.railway.app`
- **Render:** `https://your-app.onrender.com`
- **Vercel:** `https://your-app.vercel.app`
- **Custom Domain:** `https://yourdomain.com`

## 📍 Tracking Pixel URL Format

Your tracking pixel URL will be:
```
https://your-deployed-domain.com/track/{emailId}
```

### Examples:
```
https://email-tracker.railway.app/track/user123@gmail.com
https://email-tracker.railway.app/track/newsletter-001
https://email-tracker.railway.app/track/campaign-2024-01
```

## 🔧 How to Use the Tracking Pixel

### 1. **In HTML Emails**

Add this to your HTML email template:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Email Subject</title>
</head>
<body>
    <h1>Hello!</h1>
    <p>This email contains a tracking pixel.</p>
    
    <!-- Tracking Pixel (invisible) -->
    <img src="https://your-deployed-domain.com/track/recipient@example.com" 
         width="1" height="1" 
         style="display: none;" 
         alt="" />
</body>
</html>
```

### 2. **In n8n Workflow**

Update your n8n workflow with the deployed URL:

```html
<img src="https://your-deployed-domain.com/track/{{ $('Generate Email ID').item.json.email_id }}" 
     width="1" height="1" 
     style="display: none;" 
     alt="" />
```

### 3. **Dynamic Email IDs**

You can use any unique identifier:

```html
<!-- Using email address -->
<img src="https://your-deployed-domain.com/track/{{ recipient_email }}" />

<!-- Using user ID -->
<img src="https://your-deployed-domain.com/track/user_{{ user_id }}" />

<!-- Using campaign ID + email -->
<img src="https://your-deployed-domain.com/track/campaign_{{ campaign_id }}_{{ recipient_email }}" />

<!-- Using timestamp -->
<img src="https://your-deployed-domain.com/track/{{ timestamp }}_{{ recipient_email }}" />
```

## 📊 Viewing Tracking Data

### Dashboard
Visit your deployed URL to see the dashboard:
```
https://your-deployed-domain.com/
```

### API Endpoints
- **All tracking data:** `https://your-deployed-domain.com/api/tracking`
- **Health check:** `https://your-deployed-domain.com/health`
- **Debug info:** `https://your-deployed-domain.com/debug/supabase`

## 🎯 Best Practices

### 1. **Unique Email IDs**
Use unique identifiers for each email:
```html
<!-- Good: Unique per recipient -->
<img src="https://your-domain.com/track/user123@gmail.com_20240130" />

<!-- Bad: Same for everyone -->
<img src="https://your-domain.com/track/newsletter" />
```

### 2. **Email ID Examples**
```html
<!-- User email -->
<img src="https://your-domain.com/track/john@example.com" />

<!-- Campaign + User -->
<img src="https://your-domain.com/track/welcome_campaign_john@example.com" />

<!-- Timestamp + User -->
<img src="https://your-domain.com/track/1706659200_john@example.com" />

<!-- UUID + User -->
<img src="https://your-domain.com/track/550e8400-e29b-41d4-a716-446655440000_john@example.com" />
```

### 3. **Testing Your Tracking**
1. **Send a test email** with the tracking pixel
2. **Open the email** in your email client
3. **Check the dashboard** at your deployed URL
4. **Verify the tracking** appears in the data

## 🔍 Troubleshooting

### Tracking Not Working?
1. **Check the URL** - Make sure it's accessible
2. **Test the endpoint** - Visit `/health` to verify server is running
3. **Check email client** - Some clients block tracking pixels
4. **Verify Supabase** - Check `/debug/supabase` endpoint

### Common Issues
- **Email clients blocking images** - Users need to enable images
- **HTTPS required** - Modern email clients require HTTPS
- **Domain reputation** - New domains might be flagged
- **Rate limiting** - Too many requests might be blocked

## 📈 Advanced Usage

### 1. **Multiple Tracking Pixels**
You can add multiple pixels for different purposes:
```html
<!-- Open tracking -->
<img src="https://your-domain.com/track/open_{{ email_id }}" />

<!-- Link click tracking -->
<img src="https://your-domain.com/track/click_{{ email_id }}" />

<!-- Campaign tracking -->
<img src="https://your-domain.com/track/campaign_{{ campaign_id }}_{{ email_id }}" />
```

### 2. **Custom Parameters**
You can encode additional data in the email ID:
```html
<!-- Encode campaign, user, and timestamp -->
<img src="https://your-domain.com/track/campaign123_user456_1706659200" />
```

### 3. **Analytics Integration**
Use the tracking data with other analytics tools:
```javascript
// Fetch tracking data via API
fetch('https://your-domain.com/api/tracking')
  .then(response => response.json())
  .then(data => {
    console.log('Tracking data:', data);
    // Process data for analytics
  });
```

## 🎉 Success!

Once deployed and configured:
1. ✅ **Your tracking pixel is live**
2. ✅ **Emails will be tracked automatically**
3. ✅ **Dashboard shows real-time data**
4. ✅ **API provides programmatic access**

Your email tracking system is now ready for production use! 🚀 