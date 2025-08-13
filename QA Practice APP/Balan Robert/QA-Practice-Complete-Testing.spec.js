import { test } from '@playwright/test';
import { QAPracticeHelpers } from './helpers/QAPracticeHelpers.js';

// Configurare pentru vizionare lenta si controlata
test.use({ 
  launchOptions: { 
    slowMo: 1000 // 1 secunda Intre fiecare actiune - optim pentru rulare
  } 
});

test('QA Practice - Complete Website Testing with Helpers', async ({ page }) => {
  // ⏰ Timeout pentru test complet
  test.setTimeout(300000); // 5 minute timeout
  
  console.log('🚀 Starting QA Practice Complete Testing with Helper Functions...');
  
  // Initializare helper class
  const helpers = new QAPracticeHelpers(page);
  
  // 🏠 SECTIUNEA 1: HOMEPAGE NAVIGATION
  console.log('� Section 1: Homepage Navigation');
  await helpers.navigateToHomepage();
  await helpers.verifyHomepageLinks();
  
  // 🔘 SECTIUNEA 2: BUTTONS & CHECKBOXES
  console.log('🔘 Section 2: Testing Buttons & Checkboxes');
  await helpers.navigateToButtonsPage();
  await helpers.verifyButtonsSections();
  await helpers.testCheckboxes();
  
  // 🔴 SECTIUNEA 3: RADIO BUTTONS
  console.log('🔴 Section 3: Testing Radio Buttons');
  await helpers.testRadioButtons();
  
  // 🪟 SECTIUNEA 4: NEW TAB/WINDOW
  console.log('🪟 Section 4: Testing New Tab/Window');
  await helpers.navigateToNewTabWindow();
  await helpers.verifyNewTabWindowSections();
  const newTab = await helpers.openNewTab();
  const newWindow = await helpers.openNewWindow(newTab);
  
  // 🎯 SECTIUNEA 5: BUTTON ACTIONS
  console.log('🎯 Section 5: Testing Button Actions');
  await helpers.navigateToButtonActions(newTab);
  await helpers.verifyButtonActionsSections(newTab);
  await helpers.testDoubleClick(newTab);
  await helpers.testScrolling(newTab);
  await helpers.testMouseHover(newTab);
  await helpers.testShowHideElement(newTab);
  
  // 📊 SECTIUNEA 6: TABLES TESTING
  console.log('� Section 6: Testing Tables');
  await helpers.navigateToTables(newTab);
  await helpers.testStaticTable(newTab);
  await helpers.testDynamicTable(newTab);
  
  // 🚨 SECȚIUNEA 7: ALERTS TESTING
  console.log('🚨 Section 7: Testing Alerts');
  await helpers.navigateToAlerts(newTab);
  await helpers.verifyAlertsSection(newTab);
  await helpers.testAlertDialog(newTab);
  await helpers.testConfirmDialog(newTab);
  
  // 🏁 FINALIZARE
  helpers.printTestSummary();
});