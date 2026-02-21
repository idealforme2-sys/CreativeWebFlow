from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to page...")
            page.goto("http://localhost:4173")

            # Wait for the contact section to be visible, giving time for preloader to finish
            print("Waiting for contact section...")
            contact_section = page.wait_for_selector("#contact", state="visible", timeout=20000)

            if contact_section:
                print("Contact section found. Scrolling into view...")
                contact_section.scroll_into_view_if_needed()
                # Give a moment for animations to settle
                time.sleep(2)

                print("Taking screenshot...")
                page.screenshot(path="contact_section_verified.png")
                print("Screenshot saved to contact_section_verified.png")
            else:
                print("Contact section not found.")

        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error_state.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
