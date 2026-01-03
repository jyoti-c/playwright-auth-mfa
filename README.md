# playwright-auth-mfa
Playwright MFA Automation
Automate Multi-Factor Authentication (MFA) in Playwright by generating OTP/TOTP codes in code and reusing authenticated sessions with storageState.

## 🎥 Full tutorial video: [here](https://youtu.be/Nb_krfLmv0o) 

## 🧪 What This Repo Contains

- `tests/auth.setup.ts`
  Runs once to:

    - Log in

    - Generate and enter OTP

    - Save authenticated session (auth.json)


- `tests/example.spec.ts`
  Uses the saved session to:
    - Start tests already logged in
    - Skip login and MFA completely


- `playwright.config.ts`
  Configured with a setup project that runs before other tests


## 🔒 Save the Secret Securely

Copy the secret once and store it securely.
Don’t commit it, don’t log it, and use environment variables instead.

```
export GITHUB_MFA_SECRET=YOUR_SECRET_KEY

export GITHUB_USER=your_username

export GITHUB_PASSWORD=your_password
```

## Install Node dependencies

You must install project dependencies first.

`npm install`

## Install Playwright browsers

Playwright requires browser binaries.

`npx playwright install`

## ▶ Running the Tests

Run the setup test in headed mode so you can see the browser flow:

`npx playwright test --headed`
