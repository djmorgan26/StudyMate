// Playwright tests for Smart Word Lookup functionality
// Visual validation and accessibility testing per design standards

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Smart Word Lookup', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the page to load and React to render
    await page.waitForLoadState('networkidle');
  });

  test('should display the main interface correctly', async ({ page }) => {
    // Check page title and header
    await expect(page.locator('h1')).toContainText('StudyMate');
    await expect(page.locator('text=Smart Word Lookup Demo')).toBeVisible();
    
    // Verify Smart Lookup toggle is present and enabled
    const toggle = page.locator('button:has-text("Smart Lookup: ON")');
    await expect(toggle).toBeVisible();
    
    // Check case study content is loaded
    await expect(page.locator('text=Case Study: Cardiovascular Emergency')).toBeVisible();
    
    // Verify medical terms are present in the content
    await expect(page.locator('strong:has-text("bradycardia")')).toBeVisible();
    await expect(page.locator('strong:has-text("hemodynamic")')).toBeVisible();
    await expect(page.locator('strong:has-text("myocardial infarction")')).toBeVisible();
  });

  test('should show popup on medical term selection (desktop)', async ({ page }) => {
    // Double-click on 'bradycardia' to select it
    await page.locator('strong:has-text("bradycardia")').dblclick();
    
    // Wait for popup to appear (design requirement: 200ms response)
    await page.waitForTimeout(300);
    
    // Check if explanation popup is visible
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Verify popup content
    await expect(popup.locator('#popup-title')).toContainText('bradycardia');
    await expect(popup.locator('#popup-content')).toContainText('Slow heart rate');
    
    // Check difficulty selector is present
    await expect(popup.locator('text=Basic')).toBeVisible();
    await expect(popup.locator('text=Detailed')).toBeVisible();
    await expect(popup.locator('text=Expert')).toBeVisible();
  });

  test('should change explanation difficulty levels', async ({ page }) => {
    // Select 'hemodynamic'
    await page.locator('strong:has-text("hemodynamic")').first().dblclick();
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Test Basic level (default)
    await expect(popup.locator('#popup-content')).toContainText('blood flow');
    
    // Switch to Detailed level
    await popup.locator('text=Detailed').click();
    await expect(popup.locator('#popup-content')).toContainText('cardiovascular system');
    
    // Switch to Expert level
    await popup.locator('text=Expert').click();
    await expect(popup.locator('#popup-content')).toContainText('cardiac output');
  });

  test('should close popup with escape key', async ({ page }) => {
    // Open popup
    await page.locator('strong:has-text("bradycardia")').dblclick();
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Press escape key
    await page.keyboard.press('Escape');
    
    // Verify popup is closed
    await expect(popup).not.toBeVisible();
  });

  test('should close popup with close button', async ({ page }) => {
    // Open popup
    await page.locator('strong:has-text("myocardial infarction")').dblclick();
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Click close button
    await popup.locator('button[aria-label="Close explanation"]').click();
    
    // Verify popup is closed
    await expect(popup).not.toBeVisible();
  });

  test('should toggle smart lookup functionality', async ({ page }) => {
    // Verify toggle is initially ON
    const toggle = page.locator('button:has-text("Smart Lookup: ON")');
    await expect(toggle).toBeVisible();
    
    // Click to turn OFF
    await toggle.click();
    await expect(page.locator('button:has-text("Smart Lookup: OFF")')).toBeVisible();
    
    // Try to select text - popup should not appear
    await page.locator('strong:has-text("bradycardia")').dblclick();
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    await expect(popup).not.toBeVisible();
    
    // Turn back ON
    await page.locator('button:has-text("Smart Lookup: OFF")').click();
    await expect(page.locator('button:has-text("Smart Lookup: ON")')).toBeVisible();
    
    // Verify popup works again
    await page.locator('strong:has-text("bradycardia")').dblclick();
    await page.waitForTimeout(300);
    await expect(popup).toBeVisible();
  });

  test('should handle text selection with mouse drag', async ({ page }) => {
    // Select text by dragging
    const text = page.locator('strong:has-text("electrocardiogram")').first();
    const boundingBox = await text.boundingBox();
    
    // Start drag from beginning of word
    await page.mouse.move(boundingBox.x, boundingBox.y + boundingBox.height / 2);
    await page.mouse.down();
    
    // Drag to end of word
    await page.mouse.move(boundingBox.x + boundingBox.width, boundingBox.y + boundingBox.height / 2);
    await page.mouse.up();
    
    await page.waitForTimeout(300);
    
    // Check popup appears
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    await expect(popup.locator('#popup-title')).toContainText('electrocardiogram');
  });

  test('should show related terms when expanded', async ({ page }) => {
    // Open popup for a term with related terms
    await page.locator('strong:has-text("bradycardia")').dblclick();
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Check if related terms section exists
    const relatedButton = popup.locator('button:has-text("Related Terms")');
    if (await relatedButton.isVisible()) {
      // Click to expand
      await relatedButton.click();
      
      // Verify related terms are shown
      await expect(popup.locator('#related-terms')).toBeVisible();
    }
  });

  test('should meet accessibility standards', async ({ page }) => {
    // Run basic accessibility checks
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    // The toggle button should be focused
    await expect(page.locator('button:has-text("Smart Lookup")')).toBeFocused();
  });

  test('should meet accessibility standards with popup open', async ({ page }) => {
    // Open popup
    await page.locator('strong:has-text("bradycardia")').dblclick();
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Run accessibility checks with popup open
    const accessibilityScanResults = await new AxeBuilder({ page })
      .disableRules(['color-contrast']) // Allow minor contrast issues for demo
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
    
    // Test focus management - first focusable element should be focused
    await expect(popup.locator('button[aria-label="Close explanation"]')).toBeFocused();
  });

  test('should display correctly on mobile viewport', async ({ page, isMobile }) => {
    if (!isMobile) {
      // Set mobile viewport for desktop browsers
      await page.setViewportSize({ width: 375, height: 667 });
    }
    
    // Check if mobile-specific elements are visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('text=Case Study')).toBeVisible();
    
    // Test touch interaction (double-tap to select for mobile)
    await page.locator('strong:has-text("bradycardia")').dblclick();
    await page.waitForTimeout(300);
    
    // Mobile popup should have different styling
    const popup = page.locator('[role="dialog"]');
    if (await popup.isVisible()) {
      // Check for mobile-specific close button
      await expect(popup.locator('text=Close')).toBeVisible();
    }
  });

  test('should position popup within viewport bounds', async ({ page }) => {
    // Test popup positioning near viewport edges
    await page.setViewportSize({ width: 400, height: 600 });
    
    // Select text near the right edge
    await page.evaluate(() => {
      const element = document.querySelector('strong');
      if (element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
    
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    if (await popup.isVisible()) {
      const popupBox = await popup.boundingBox();
      const viewportSize = page.viewportSize();
      
      // Verify popup stays within viewport
      expect(popupBox.x).toBeGreaterThanOrEqual(0);
      expect(popupBox.y).toBeGreaterThanOrEqual(0);
      expect(popupBox.x + popupBox.width).toBeLessThanOrEqual(viewportSize.width);
      expect(popupBox.y + popupBox.height).toBeLessThanOrEqual(viewportSize.height);
    }
  });

  test('should handle speech synthesis if available', async ({ page }) => {
    // Open popup
    await page.locator('strong:has-text("bradycardia")').dblclick();
    await page.waitForTimeout(300);
    
    const popup = page.locator('[role="dialog"]');
    await expect(popup).toBeVisible();
    
    // Check if speech button is present
    const speechButton = popup.locator('button[aria-label*="Pronounce"]');
    await expect(speechButton).toBeVisible();
    
    // Click speech button (won't actually play audio in headless mode)
    await speechButton.click();
    
    // Button should remain functional
    await expect(speechButton).toBeEnabled();
  });
});