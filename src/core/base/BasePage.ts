import { Locator, Page, expect, BrowserContext } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly context: BrowserContext;

  constructor(page: Page) {
    this.page = page;
    this.context = page.context();
  }

  async goto(path: string, options?: Parameters<Page['goto']>[1]): Promise<void> {
    await this.page.goto(path, options);
  }

  async click(locator: string | Locator, options?: Parameters<Locator['click']>[0]): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'visible' });
    await element.click(options);
  }

  async safeClick(locator: string | Locator, options?: Parameters<Locator['click']>[0]): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.waitFor({ state: 'attached' });
    await element.click(options);
  }

  async retryClick(locator: string | Locator, retryCount = 3): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;

    for (let attempt = 1; attempt <= retryCount; attempt += 1) {
      try {
        await element.click();
        return;
      } catch (error) {
        if (attempt === retryCount) {
          throw error;
        }
        await this.page.waitForTimeout(500);
      }
    }
  }

  async fill(locator: string | Locator, value: string, options?: Parameters<Locator['fill']>[1]): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.fill(value, options);
  }

  async select(locator: string | Locator, value: string | string[]): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.selectOption(value);
  }

  async check(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.check();
  }

  async hover(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.hover();
  }

  async doubleClick(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.dblclick();
  }

  async rightClick(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.click({ button: 'right' });
  }

  async dragAndDrop(source: string | Locator, target: string | Locator): Promise<void> {
    const sourceElement = typeof source === 'string' ? this.page.locator(source) : source;
    const targetElement = typeof target === 'string' ? this.page.locator(target) : target;
    await sourceElement.dragTo(targetElement);
  }

  async uploadFile(locator: string | Locator, filePath: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.setInputFiles(filePath);
  }

  async download(locator: string | Locator, saveAs?: string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      element.click(),
    ]);
    const path = await download.path();
    if (saveAs && path) {
      await download.saveAs(saveAs);
      return saveAs;
    }
    return path ?? '';
  }

  async waitFor(condition: { selector?: string; timeout?: number; state?: 'visible' | 'hidden' | 'attached' | 'detached' }): Promise<void> {
    if (condition.selector) {
      await this.page.locator(condition.selector).waitFor({ timeout: condition.timeout, state: condition.state });
    } else {
      await this.page.waitForTimeout(condition.timeout ?? 500);
    }
  }

  async scroll(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.scrollIntoViewIfNeeded();
  }

  async pressKey(locator: string | Locator, key: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await element.press(key);
  }

  async getText(locator: string | Locator): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return element.textContent() ?? '';
  }

  async getAttribute(locator: string | Locator, attribute: string): Promise<string | null> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return element.getAttribute(attribute);
  }

  async isVisible(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return element.isVisible();
  }

  async isEnabled(locator: string | Locator): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return element.isEnabled();
  }

  async takeScreenshot(options?: Parameters<Page['screenshot']>[0]): Promise<Buffer> {
    return this.page.screenshot(options);
  }

  async highlight(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await this.page.evaluate((el: HTMLElement) => {
      const previousOutline = el.style.outline;
      el.style.outline = '3px solid #ff0000';
      setTimeout(() => {
        el.style.outline = previousOutline;
      }, 300);
    }, await element.elementHandle());
  }

  async expectVisible(locator: string | Locator): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(element).toBeVisible();
  }

  async expectText(locator: string | Locator, value: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    await expect(element).toHaveText(value);
  }
}
