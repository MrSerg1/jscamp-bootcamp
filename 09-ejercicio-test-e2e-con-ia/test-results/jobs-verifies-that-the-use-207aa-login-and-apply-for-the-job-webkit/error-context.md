# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: jobs.spec.js >> verifies that the user can look for a job, click on the result and see the details, then can login and apply for the job
- Location: tests/jobs.spec.js:25:5

# Error details

```
Error: browserType.launch: Executable doesn't exist at /home/stejondev/.cache/ms-playwright/webkit-2272/pw_run.sh
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```