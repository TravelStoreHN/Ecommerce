# Auth0 Custom Universal Login Configuration

## Adding Custom Fields to Sign-Up Form

### Step 1: Enable Custom Login Page
1. Go to Auth0 Dashboard → Applications → [Your App] → Advanced Settings → Login
2. Turn ON "Customize Login Page"

### Step 2: Add Custom HTML for Additional Fields

In the Custom Login Page editor, you'll need to add JavaScript to handle additional fields. Here's the code to add:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title>Sign In</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <div id="lock" class="lock"></div>
  <script src="https://cdn.auth0.com/js/lock/11.34.1/lock.min.js"></script>
  <script>
    var lock = new Auth0Lock(config.clientID, config.auth0Domain, {
      auth: {
        redirectUrl: config.callbackURL,
        responseType: 'code',
        params: config.internalOptions
      },
      theme: {
        logo: 'https://your-domain.com/logo.png',
        primaryColor: '#7C3AED' // Purple color matching your brand
      },
      languageDictionary: {
        title: "TravelStoreHN"
      },
      additionalSignUpFields: [
        {
          name: "firstName",
          placeholder: "First Name",
          validator: function(firstName) {
            return {
              valid: firstName.length >= 2,
              hint: "Must be at least 2 characters"
            };
          }
        },
        {
          name: "lastName",
          placeholder: "Last Name",
          validator: function(lastName) {
            return {
              valid: lastName.length >= 2,
              hint: "Must be at least 2 characters"
            };
          }
        },
        {
          name: "phone",
          placeholder: "Phone Number (Optional)",
          validator: function(phone) {
            return {
              valid: phone.length === 0 || phone.length >= 10,
              hint: "Must be at least 10 digits if provided"
            };
          }
        },
        {
          name: "country",
          type: "select",
          placeholder: "Select Country",
          options: [
            {value: "HN", label: "Honduras"},
            {value: "US", label: "United States"},
            {value: "CA", label: "Canada"},
            {value: "MX", label: "Mexico"},
            {value: "GT", label: "Guatemala"},
            {value: "BZ", label: "Belize"},
            {value: "SV", label: "El Salvador"},
            {value: "NI", label: "Nicaragua"},
            {value: "CR", label: "Costa Rica"},
            {value: "PA", label: "Panama"}
          ]
        }
      ]
    });
    
    lock.show();
  </script>
</body>
</html>
```

### Step 3: Configure User Metadata Storage

The additional fields will be stored in the user's `user_metadata` automatically.

### Step 4: Access Additional Fields in Your App

Update your User type to include the additional fields:

```typescript
interface User {
  // ... existing fields
  user_metadata?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    country?: string;
  };
}
```

### Alternative: Use Auth0 Management API

If you prefer to use your custom sign-up form instead of Auth0's Universal Login, you'll need to:

1. Enable the Management API for your application
2. Grant the necessary scopes: `create:users`, `update:users`
3. Use the Management API to create users with metadata

This approach requires more setup but gives you complete control over the UI.
