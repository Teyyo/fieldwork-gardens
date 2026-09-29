# Deployment

## Included hosted demo

[Fieldwork Garden Studio](https://fieldwork-garden-studio.laszloteodor2008.chatgpt.site) GitHub Pages below is the recommended independently managed portfolio deployment; the Sites preview is not a GitHub repository.

## GitHub Pages

The project includes `.github/workflows/pages.yml`. It publishes the contents of `dist/`, without installing dependencies or building an application.

1. Push the project to your public GitHub repository as described in `GITHUB-GUIDE-HU.md`.
2. Open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open **Actions → Deploy garden studio to GitHub Pages → Run workflow**. Later pushes to `main` trigger it automatically.
5. Wait for the workflow to succeed. The deployment URL appears in the job environment and in Settings → Pages.
6. Put that exact URL in your README and repository Website field.

If the first push ran before Pages was enabled, rerun the failed workflow after step 3. A typical project URL has the form `https://YOUR-USERNAME.github.io/fieldwork-gardens/`; this is an example, not a deployed URL supplied by this project.

The workflow uses GitHub's documented configure/upload/deploy actions and grants `contents: read`, `pages: write` and `id-token: write`. It modifies only the deployment copy of `404.html` to set the correct repository base path. Normal links and image references are relative, so they work under a repository prefix. Every route is a real `.html` file; refreshing a service or project page does not need a client-side router rewrite.

Official instructions, checked 29 September 2026:
https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

## Updating

Edit the HTML, CSS or JavaScript in `dist/`; run the checks; commit and push to `main`. Pages publishes the new version. Keep the `dist` directory tracked in Git.

## Verification scope

Local structural and JavaScript checks were completed before delivery. The hosted deployment status is verified separately. An actual GitHub Pages deployment cannot be claimed until you create the repository and enable Pages. Browser layout, screenshots and mobile overflow still require a rendered browser check; the current environment did not expose the required browser QA capability.

## Real enquiries

To send enquiries, add a real form service or backend and configure its destination. Validate on the server, handle success and failure truthfully, add abuse protection and update the site's privacy information. Never put secret API keys in frontend JavaScript. The included form intentionally prepares a local text summary only.
