from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to the local server
        page.goto('http://localhost:4321')

        # Wait for the page to be fully loaded
        page.wait_for_load_state('networkidle')

        # Take a screenshot of the light mode
        page.screenshot(path="jules-scratch/verification/home-light.png", full_page=True)

        # Click the theme switcher
        page.click('#theme-switcher')

        # Take a screenshot of the dark mode
        page.screenshot(path="jules-scratch/verification/home-dark.png", full_page=True)

        # Go to the articles page
        page.click('a[href="/articles"]')

        # Wait for the page to be fully loaded
        page.wait_for_load_state('networkidle')

        # Take a screenshot of the articles page in dark mode
        page.screenshot(path="jules-scratch/verification/articles-dark.png", full_page=True)

        # Click the theme switcher
        page.click('#theme-switcher')

        # Take a screenshot of the articles page in light mode
        page.screenshot(path="jules-scratch/verification/articles-light.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
