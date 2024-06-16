const fs = require('fs');
const { By, until } = require("selenium-webdriver");
const Logger = require("../utils/LoggerService");

// Create an instance of the logger
const logger = new Logger();

class SeleniumUtils {
  constructor(driver) {
    this.driver = driver;
  }
}

// Element Interaction Extension
class DOMSelenium extends SeleniumUtils {
  async locateElement(xpath, description, timeout = 10000) {
    try {
      logger.info(`Locating element: ${description}`);
      const element = await this.driver.wait(
        until.elementLocated(By.xpath(xpath)),
        timeout
      );
      return element;
    } catch (error) {
      logger.error(`Error locating element "${description}": ${error}`);
      throw error;
    }
  }

  async clickElement(xpath, description, timeout = 10000) {
    try {
      const element = await this.locateElement(xpath, description, timeout);
      logger.info(`Clicking element: ${description}`);
      await element.click();
      logger.info(`Clicked element successfully: ${description}`);
    } catch (error) {
      logger.error(`Error clicking element "${description}": ${error}`);
      throw error;
    }
  }

  async sendKeys(xpath, value, description, timeout = 10000) {
    try {
      logger.info(`Entering text into element "${description}": ${value}`);
      const element = await this.locateElement(xpath, description, timeout);
      await element.sendKeys(value);
    } catch (error) {
      logger.error(`Error sending keys to element "${description}": ${error}`);
      throw error;
    }
  }

  async getTextFromElement(xpath, description, timeout = 10000) {
    try {
      logger.info(`Getting text from element "${description}"`);
      const element = await this.locateElement(xpath, description, timeout);
      const text = await element.getText();
      logger.info(`Text obtained from element "${description}": ${text}`);
      return text;
    } catch (error) {
      logger.error(
        `Error getting text from element "${description}": ${error}`
      );
      throw error;
    }
  }

  async clearInputField(xpath, description, timeout = 10000) {
    try {
      logger.info(`Clearing input field "${description}"`);
      const element = await this.locateElement(xpath, description, timeout);
      await element.clear();
      logger.info(`Input field "${description}" cleared successfully`);
    } catch (error) {
      logger.error(`Error clearing input field "${description}": ${error}`);
      throw error;
    }
  }

  async selectDropdownOption(xpath, optionText, description, timeout = 10000) {
    try {
      logger.info(
        `Selecting dropdown option "${optionText}" from element "${description}"`
      );
      const dropdown = await this.locateElement(xpath, description, timeout);
      await dropdown.click();
      const option = await dropdown.findElement(
        By.xpath(`./option[normalize-space(text())="${optionText}"]`)
      );
      await option.click();
      logger.info(
        `Selected dropdown option "${optionText}" from element "${description}" successfully`
      );
    } catch (error) {
      logger.error(
        `Error selecting dropdown option "${optionText}" from element "${description}": ${error}`
      );
      throw error;
    }
  }

  async scrollToTop() {
    try {
      logger.info("Scrolling to top of page");
      await this.driver.executeScript("window.scrollTo(0, 0)");
      logger.info("Scrolled to top of page successfully");
    } catch (error) {
      logger.error(`Error scrolling to top of page: ${error}`);
      throw error;
    }
  }

  async scrollToBottom() {
    try {
      logger.info("Scrolling to bottom of page");
      await this.driver.executeScript(
        "window.scrollTo(0, document.body.scrollHeight)"
      );
      logger.info("Scrolled to bottom of page successfully");
    } catch (error) {
      logger.error(`Error scrolling to bottom of page: ${error}`);
      throw error;
    }
  }

  
  async scrollToElement(xpath, description, timeout = 10000) {
    try {
      logger.info(`Scrolling to element "${description}"`);
      const element = await this.locateElement(xpath, description, timeout);
      await this.driver.executeScript(
        'arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })',
        element
      );
      logger.info(`Scrolled to element "${description}" successfully`);
    } catch (error) {
      logger.error(`Error scrolling to element "${description}": ${error}`);
      throw error;
    }
  }

  async isElementDisplayed(xpath, description, timeout = 10000) {
    try {
      logger.info(`Checking if element "${description}" is displayed`);
      const element = await this.locateElement(xpath, description, timeout);
      const isDisplayed = await element.isDisplayed();
      logger.info(`Element "${description}" is displayed: ${isDisplayed}`);
      return isDisplayed;
    } catch (error) {
      logger.error(
        `Error checking if element "${description}" is displayed: ${error}`
      );
      throw error;
    }
  }

  async isElementEnabled(xpath, description, timeout = 10000) {
    try {
      logger.info(`Checking if element "${description}" is enabled`);
      const element = await this.locateElement(xpath, description, timeout);
      const isEnabled = await element.isEnabled();
      logger.info(`Element "${description}" is enabled: ${isEnabled}`);
      return isEnabled;
    } catch (error) {
      logger.error(
        `Error checking if element "${description}" is enabled: ${error}`
      );
      throw error;
    }
  }
}

// Navigation Extension
class NavigationSelenium extends SeleniumUtils {
  async getCurrentUrl() {
    try {
      logger.info("Getting current URL");
      const currentUrl = await this.driver.getCurrentUrl();
      logger.info(`Current URL: ${currentUrl}`);
      return currentUrl;
    } catch (error) {
      logger.error(`Error getting current URL: ${error}`);
      throw error;
    }
  }

  async getTitle() {
    try {
      logger.info("Getting page title");
      const title = await this.driver.getTitle();
      logger.info(`Page title: ${title}`);
      return title;
    } catch (error) {
      logger.error(`Error getting page title: ${error}`);
      throw error;
    }
  }

  async refreshPage() {
    try {
      logger.info("Refreshing page");
      await this.driver.navigate().refresh();
      logger.info("Page refreshed successfully");
    } catch (error) {
      logger.error(`Error refreshing page: ${error}`);
      throw error;
    }
  }

  async navigateBack() {
    try {
      logger.info("Navigating back");
      await this.driver.navigate().back();
      logger.info("Navigated back successfully");
    } catch (error) {
      logger.error(`Error navigating back: ${error}`);
      throw error;
    }
  }

  async navigateForward() {
    try {
      logger.info("Navigating forward");
      await this.driver.navigate().forward();
      logger.info("Navigated forward successfully");
    } catch (error) {
      logger.error(`Error navigating forward: ${error}`);
      throw error;
    }
  }
}

// Session Extension
class SessionUtilsSelenium extends SeleniumUtils {
  constructor(driver) {
    super(driver); // Llama al constructor de la clase base (SeleniumUtils)
  }

  async getSessionStorageItem(key) {
    try {
      logger.info(`Getting item from sessionStorage with key: ${key}`);
      const value = await this.driver.executeScript(
        `return sessionStorage.getItem('${key}')`
      );
      logger.info(`SessionStorage item retrieved successfully: ${value}`);
      return value;
    } catch (error) {
      logger.error(`Error getting item from sessionStorage: ${error}`);
      throw error;
    }
  }

  async setSessionStorageItem(key, value) {
    try {
      logger.info(`Setting item in sessionStorage: ${key}=${value}`);
      await this.driver.executeScript(
        `sessionStorage.setItem('${key}', '${value}')`
      );
      logger.info(`Item set in sessionStorage successfully`);
    } catch (error) {
      logger.error(`Error setting item in sessionStorage: ${error}`);
      throw error;
    }
  }

  async clearSessionStorage() {
    try {
      logger.info(`Clearing sessionStorage`);
      await this.driver.executeScript(`sessionStorage.clear()`);
      logger.info(`SessionStorage cleared successfully`);
    } catch (error) {
      logger.error(`Error clearing sessionStorage: ${error}`);
      throw error;
    }
  }

  async getLocalStorageItem(key) {
    try {
      logger.info(`Getting item from localStorage with key: ${key}`);
      const value = await this.driver.executeScript(
        `return localStorage.getItem('${key}')`
      );
      logger.info(`LocalStorage item retrieved successfully: ${value}`);
      return value;
    } catch (error) {
      logger.error(`Error getting item from localStorage: ${error}`);
      throw error;
    }
  }

  async setLocalStorageItem(key, value) {
    try {
      logger.info(`Setting item in localStorage: ${key}=${value}`);
      await this.driver.executeScript(
        `localStorage.setItem('${key}', '${value}')`
      );
      logger.info(`Item set in localStorage successfully`);
    } catch (error) {
      logger.error(`Error setting item in localStorage: ${error}`);
      throw error;
    }
  }

  async clearLocalStorage() {
    try {
      logger.info(`Clearing localStorage`);
      await this.driver.executeScript(`localStorage.clear()`);
      logger.info(`LocalStorage cleared successfully`);
    } catch (error) {
      logger.error(`Error clearing localStorage: ${error}`);
      throw error;
    }
  }

  async getCookies() {
    try {
      logger.info("Getting cookies");
      const cookies = await this.driver.manage().getCookies();
      logger.info("Cookies retrieved successfully");
      return cookies;
    } catch (error) {
      logger.error(`Error getting cookies: ${error}`);
      throw error;
    }
  }
}

// Window and Tab Management Extension
class WindowTabSelenium extends SeleniumUtils {
  async openNewTab() {
    try {
      logger.info("Opening new tab");
      await this.driver.executeScript("window.open()");
      logger.info("New tab opened successfully");
    } catch (error) {
      logger.error(`Error opening new tab: ${error}`);
      throw error;
    }
  }

  async switchToTab(tabIndex) {
    try {
      logger.info(`Switching to tab ${tabIndex}`);
      const handles = await this.driver.getAllWindowHandles();
      if (handles.length > tabIndex) {
        await this.driver.switchTo().window(handles[tabIndex]);
        logger.info(`Switched to tab ${tabIndex} successfully`);
      } else {
        logger.error(`Tab index ${tabIndex} is out of range`);
      }
    } catch (error) {
      logger.error(`Error switching to tab ${tabIndex}: ${error}`);
      throw error;
    }
  }

  async closeTab(tabIndex) {
    try {
      logger.info(`Closing tab ${tabIndex}`);
      const handles = await this.driver.getAllWindowHandles();
      if (handles.length > tabIndex) {
        await this.driver.switchTo().window(handles[tabIndex]);
        await this.driver.close();
        logger.info(`Tab ${tabIndex} closed successfully`);
      } else {
        logger.error(`Tab index ${tabIndex} is out of range`);
      }
    } catch (error) {
      logger.error(`Error closing tab ${tabIndex}: ${error}`);
      throw error;
    }
  }

  async openNewWindow(url) {
    try {
      logger.info(`Opening new window with URL: ${url}`);
      const handlesBefore = await this.driver.getAllWindowHandles();
      await this.driver.executeScript(`window.open('${url}')`);
      const handlesAfter = await this.driver.getAllWindowHandles();
      const newWindowHandle = handlesAfter.find(
        (handle) => !handlesBefore.includes(handle)
      );
      await this.driver.switchTo().window(newWindowHandle);
      logger.info("New window opened successfully");
    } catch (error) {
      logger.error(`Error opening new window: ${error}`);
      throw error;
    }
  }

  async switchToWindow(windowHandle) {
    try {
      logger.info(`Switching to window with handle: ${windowHandle}`);
      await this.driver.switchTo().window(windowHandle);
      logger.info(
        `Switched to window with handle: ${windowHandle} successfully`
      );
    } catch (error) {
      logger.error(
        `Error switching to window with handle: ${windowHandle}: ${error}`
      );
      throw error;
    }
  }

  async closeWindow() {
    try {
      logger.info("Closing current window");
      await this.driver.close();
      logger.info("Current window closed successfully");
    } catch (error) {
      logger.error(`Error closing current window: ${error}`);
      throw error;
    }
  }

  async resizeWindow(width, height) {
    try {
      logger.info(`Resizing window to ${width}x${height}`);
      await this.driver.manage().window().setSize(width, height);
      logger.info("Window resized successfully");
    } catch (error) {
      logger.error(`Error resizing window: ${error}`);
      throw error;
    }
  }

  async maximizeWindow() {
    try {
      logger.info("Maximizing window");
      await this.driver.manage().window().maximize();
      logger.info("Window maximized successfully");
    } catch (error) {
      logger.error(`Error maximizing window: ${error}`);
      throw error;
    }
  }

  async minimizeWindow() {
    try {
      logger.info("Minimizing window");
      await this.driver.manage().window().minimize();
      logger.info("Window minimized successfully");
    } catch (error) {
      logger.error(`Error minimizing window: ${error}`);
      throw error;
    }
  }
}

// Other Utilities Extension
class OtherUtilsSelenium extends SeleniumUtils {
    

    async takeScreenshot(path) {
      try {
        logger.info("Taking screenshot");
        const screenshot = await this.driver.takeScreenshot();
        await fs.promises.writeFile(path, screenshot, "base64");
        logger.info(`Screenshot saved to: ${path}`);
      } catch (error) {
        logger.error(`Error taking screenshot: ${error}`);
        throw error;
      }
    }
  
    async executeScript(script) {
      try {
        logger.info("Executing script");
        await this.driver.executeScript(script);
        logger.info("Script executed successfully");
      } catch (error) {
        logger.error(`Error executing script: ${error}`);
        throw error;
      }
    }
  }

module.exports = {
  SeleniumUtils,
  NavigationSelenium,
  SessionUtilsSelenium,
  DOMSelenium,
  WindowTabSelenium,
  OtherUtilsSelenium
};
