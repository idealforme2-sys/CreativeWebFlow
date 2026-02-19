import time
import subprocess
from playwright.sync_api import sync_playwright

def verify_visual():
    print("Starting preview server...")
    # Start the preview server in the background
    server = subprocess.Popen(["npm", "run", "preview", "--", "--port", "4173"],
                              stdout=subprocess.DEVNULL,
                              stderr=subprocess.DEVNULL)

    # Give it time to start
    time.sleep(5)

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()

            # Navigate to the page
            page.goto("http://localhost:4173")

            # Wait for content to load
            page.wait_for_selector('h2:has-text("Why Local Businesses")')

            # Scroll to the section
            section = page.locator('h2:has-text("Why Local Businesses")')
            section.scroll_into_view_if_needed()

            # Wait for animations to settle
            time.sleep(2)

            # Take screenshot of the viewport
            page.screenshot(path="verification_visual_v2.png", full_page=False)

            print("Screenshot taken: verification_visual_v2.png")
            browser.close()
    finally:
        # Kill the server
        server.terminate()
        server.wait()

if __name__ == "__main__":
    verify_visual()
