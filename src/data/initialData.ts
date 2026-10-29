import {
  UserProfile,
  PortfolioMetrics,
  ProjectSuite,
  CareerMilestone,
  DebuggingIncident,
  LearningTopic,
  BugTicket,
  TabDefinition,
} from '../types';

export const TAB_DEFINITIONS: TabDefinition[] = [
  {
    id: 'begin',
    name: "Let's Begin",
    fileIcon: 'Terminal',
    badge: 'START',
    description: 'System initialization, bio, key metrics, and recruiter quick-start checklist.',
  },
  {
    id: 'build',
    name: 'What I Build',
    fileIcon: 'Cpu',
    badge: '4 SUITES',
    description: 'End-to-end automation frameworks, Cucumber BDD executions, and locator strategies.',
  },
  {
    id: 'journey',
    name: 'The Journey',
    fileIcon: 'GitCommit',
    badge: 'TIMELINE',
    description: 'Associate Test Engineer career sprints, git logs, and automation milestones.',
  },
  {
    id: 'learned',
    name: 'How I Learned',
    fileIcon: 'BookOpen',
    badge: 'LAB',
    description: 'Honest learning curve, interactive debugging lab, and core testing competencies.',
  },
  {
    id: 'chaos',
    name: 'Curated chaos',
    fileIcon: 'AlertTriangle',
    badge: 'TRIAGE',
    description: 'Defect triage board, flakiness root causes, and simulated chaos reproduction.',
  },
  {
    id: 'talk',
    name: "Let's Talk",
    fileIcon: 'MessageSquare',
    badge: 'CONNECT',
    description: 'File a recruiter dispatch ticket, direct links, and downloadable PDF resume.',
  },
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Yuvaraj',
  role: 'Associate Test Engineer',
  tagline: 'Bridging Manual Rigor with Resilient Test Automation & BDD Frameworks',
  bio: "Associate Test Engineer with deep passion for automated software quality. Actively learning, experimenting, and building scalable test suites using Playwright, Selenium, Cypress, and Cucumber BDD. Focused on eliminating test flakiness, designing maintainable Page Object Models, and embedding automated quality checks into CI/CD pipelines.",
  email: 'yuvaraj2432003@gmail.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  x: 'https://x.com',
  instagram: 'https://instagram.com',
  location: 'Bangalore, India (Open to Remote / Hybrid)',
  status: 'Open to Opportunities · Actively Learning',
  yearsExperience: '1.5+ Years (QA & Automation)',
  coreTools: [
    'Playwright',
    'Cucumber BDD',
    'Selenium WebDriver',
    'TypeScript / Java',
    'Cypress',
    'Postman / REST Assured',
    'GitHub Actions',
    'Docker',
  ],
};

export const INITIAL_METRICS: PortfolioMetrics = {
  totalTestCases: 418,
  overallPassRate: 98.6,
  flakinessIndexPercent: 1.4,
  preProdDefectsCaught: 52,
  automatedSuitesCount: 4,
  cucumberScenariosCount: 68,
  averageExecutionMinutes: 3.8,
};

export const INITIAL_PROJECT_SUITES: ProjectSuite[] = [
  {
    id: 'suite-playwright-bdd',
    name: 'E-Commerce Checkout & Payments BDD Suite',
    framework: 'Playwright + TypeScript + Cucumber BDD',
    badgeColor: '#3FB950',
    tagline: 'High-speed browser automation with resilient auto-waiting & Gherkin scenarios',
    description:
      'Enterprise end-to-end regression suite covering multi-step user checkout, promo code calculation, mock payment gateway integrations, and cross-browser testing across Chromium, WebKit, and Firefox.',
    repoUrl: 'https://github.com/yuvaraj/playwright-cucumber-bdd-suite',
    ciStatus: 'passing',
    stats: {
      totalTests: 142,
      passRate: 99.3,
      durationSec: 84,
      coveragePercent: 94,
      flakinessReduction: '0.6% retry rate',
    },
    featuresList: [
      'Gherkin feature files with parameterised Scenario Outlines',
      'Custom World hooks with Playwright context isolation',
      'Auto-waiting locators avoiding Thread.sleep entirely',
      'HTML report generation with video and trace viewer on failure',
    ],
    sampleCodeSnippet: {
      filename: 'checkout.steps.ts',
      language: 'typescript',
      code: `import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

Given('the customer has 2 items in their cart totaling \${float}', async function (amount: number) {
  await this.cartPage.seedCartWithItems(['SKU-892', 'SKU-104']);
  const cartTotal = await this.cartPage.getSubtotal();
  expect(cartTotal).toBeCloseTo(amount, 2);
});

When('they apply promo code {string} and proceed to payment', async function (promo: string) {
  this.checkoutPage = new CheckoutPage(this.page);
  await this.checkoutPage.applyPromo(promo);
  await this.checkoutPage.selectPaymentMethod('CreditCard');
  await this.checkoutPage.submitOrder();
});

Then('the order confirmation should be displayed within 3 seconds', async function () {
  await expect(this.checkoutPage.orderConfirmationBanner).toBeVisible({ timeout: 3000 });
  const orderId = await this.checkoutPage.getGeneratedOrderId();
  expect(orderId).toMatch(/^ORD-[0-9]{6}$/);
});`,
    },
    cucumberFeature: {
      title: 'Checkout & Promotional Discount Validation',
      tags: ['@e2e', '@checkout', '@smoke', '@critical_path'],
      description: 'As a registered customer, I want discounts accurately deducted before payment confirmation.',
      scenarios: [
        {
          id: 'sc-1',
          name: 'Apply 15% VIP discount code on cart over $100',
          tags: ['@smoke', '@discount'],
          status: 'passed',
          totalDurationMs: 1420,
          steps: [
            { keyword: 'Given', text: 'the customer has 2 items in their cart totaling $120.00', status: 'passed', durationMs: 410 },
            { keyword: 'When', text: 'they apply promo code "VIP15" and proceed to payment', status: 'passed', durationMs: 520 },
            { keyword: 'And', text: 'they fill shipping address with valid postal details', status: 'passed', durationMs: 290 },
            { keyword: 'Then', text: 'the subtotal reflects $102.00 after discount', status: 'passed', durationMs: 110 },
            { keyword: 'And', text: 'the order confirmation should be displayed within 3 seconds', status: 'passed', durationMs: 90 },
          ],
        },
        {
          id: 'sc-2',
          name: 'Reject expired coupon code with accessible aria error banner',
          tags: ['@regression', '@negative'],
          status: 'passed',
          totalDurationMs: 980,
          steps: [
            { keyword: 'Given', text: 'the customer is on the cart checkout page', status: 'passed', durationMs: 250 },
            { keyword: 'When', text: 'they input expired coupon "SUMMER2023"', status: 'passed', durationMs: 340 },
            { keyword: 'Then', text: 'an error alert "Coupon has expired" should appear with role="alert"', status: 'passed', durationMs: 210 },
            { keyword: 'And', text: 'the "Pay Now" button remains disabled until valid input', status: 'passed', durationMs: 180 },
          ],
        },
      ],
    },
  },
  {
    id: 'suite-selenium-pom',
    name: 'Enterprise CRM Data Ingestion & Grid Testing',
    framework: 'Selenium WebDriver + Java + TestNG',
    badgeColor: '#A371F7',
    tagline: 'Robust Page Object Model with dynamic FluentWaits & ThreadLocal WebDriver',
    description:
      'Classic enterprise testing framework designed to validate heavy CRM data grids, pagination edge cases, CSV bulk imports, and dynamic AJAX modal forms with parallel execution via TestNG.',
    repoUrl: 'https://github.com/yuvaraj/selenium-java-crm-pom',
    ciStatus: 'passing',
    stats: {
      totalTests: 116,
      passRate: 97.4,
      durationSec: 132,
      coveragePercent: 89,
      flakinessReduction: '1.8% retry rate',
    },
    featuresList: [
      'ThreadLocal DriverFactory preventing thread collision in parallel runs',
      'Smart FluentWait wrappers catching StaleElementReferenceException',
      'Data-driven testing with TestNG DataProviders & Apache POI',
      'Extensive Allure reporting with DOM snapshots on assertion failure',
    ],
    sampleCodeSnippet: {
      filename: 'CustomerGridTest.java',
      language: 'java',
      code: `public class CustomerGridTest extends BaseTest {
    @Test(dataProvider = "customerFilterData", groups = {"regression", "crm"})
    public void verifyDynamicFilterAndBulkExport(String tier, int expectedMinCount) {
        CustomerGridPage gridPage = new CustomerGridPage(getDriver());
        gridPage.navigateToCustomers()
                .selectTierFilter(tier)
                .waitForGridStalenessAndReload();

        int renderedRows = gridPage.getRowCount();
        Assert.assertTrue(renderedRows >= expectedMinCount, 
            "Rendered customer count failed threshold for tier: " + tier);

        File exportedCsv = gridPage.triggerCsvExport();
        Assert.assertTrue(exportedCsv.exists(), "CSV export failed to download");
    }
}`,
    },
    cucumberFeature: {
      title: 'Enterprise Customer Grid Pagination & Filter Stability',
      tags: ['@crm', '@grid', '@regression'],
      description: 'Ensure bulk data filters correctly isolate accounts without race conditions.',
      scenarios: [
        {
          id: 'sc-3',
          name: 'Filter enterprise accounts by active status and export report',
          tags: ['@crm', '@smoke'],
          status: 'passed',
          totalDurationMs: 1840,
          steps: [
            { keyword: 'Given', text: 'an authorized CRM admin is logged into the management console', status: 'passed', durationMs: 510 },
            { keyword: 'When', text: 'they filter accounts by Tier="Enterprise" and Status="Active"', status: 'passed', durationMs: 470 },
            { keyword: 'Then', text: 'the data table refreshes within 2000ms with 48 matching rows', status: 'passed', durationMs: 440 },
            { keyword: 'And', text: 'the CSV report download generates with matching row hash', status: 'passed', durationMs: 420 },
          ],
        },
      ],
    },
  },
  {
    id: 'suite-cypress-bdd',
    name: 'Real-Time Collaboration & Notification Suite',
    framework: 'Cypress + JavaScript + Cucumber BDD',
    badgeColor: '#58A6FF',
    tagline: 'Network mocking, WebSocket event interception, and UI state reconciliation',
    description:
      'Fast UI and network-level testing for real-time collaboration tools. Mocks GraphQL requests and WebSocket broadcast events to verify instant notification popovers and live comment updates.',
    repoUrl: 'https://github.com/yuvaraj/cypress-realtime-notification-suite',
    ciStatus: 'passing',
    stats: {
      totalTests: 88,
      passRate: 99.1,
      durationSec: 46,
      coveragePercent: 96,
      flakinessReduction: '0.4% retry rate',
    },
    featuresList: [
      'cy.intercept for deterministic HTTP response stubbing',
      'Mock WebSocket message broadcasting via window dispatcher',
      'Time-travel debugging and automated screenshot diffing',
      'Zero headless flaky timeouts using Cypress assertion retry chain',
    ],
    sampleCodeSnippet: {
      filename: 'live_notifications.spec.js',
      language: 'javascript',
      code: `describe('Real-Time Notification Pipeline', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/notifications', { fixture: 'empty_notifications.json' }).as('getInitial');
    cy.visit('/dashboard');
    cy.wait('@getInitial');
  });

  it('renders incoming mention banner upon WebSocket dispatch', () => {
    cy.window().then((win) => {
      win.mockSocketMessage({
        type: 'COMMENT_MENTION',
        sender: 'Sarah Dev',
        ticketId: 'QA-204',
        timestamp: Date.now()
      });
    });

    cy.get('[data-testid="notification-badge"]').should('contain', '1');
    cy.get('[data-testid="notification-popover"]')
      .should('be.visible')
      .and('contain', 'Sarah Dev mentioned you in QA-204');
  });
});`,
    },
    cucumberFeature: {
      title: 'Real-Time Notification & Mention Dispatch',
      tags: ['@realtime', '@socket', '@notifications'],
      description: 'Validate instant notification rendering without page reload.',
      scenarios: [
        {
          id: 'sc-4',
          name: 'Receive instant mention alert on active ticket thread',
          tags: ['@realtime', '@p1'],
          status: 'passed',
          totalDurationMs: 820,
          steps: [
            { keyword: 'Given', text: 'user "Alex" is actively viewing defect board "Curated chaos"', status: 'passed', durationMs: 220 },
            { keyword: 'When', text: 'a teammate posts "@Alex please review the reproduction steps"', status: 'passed', durationMs: 280 },
            { keyword: 'Then', text: 'the notification count increments from 0 to 1 immediately', status: 'passed', durationMs: 160 },
            { keyword: 'And', text: 'the audio tone triggers without interrupting ongoing typing', status: 'passed', durationMs: 160 },
          ],
        },
      ],
    },
  },
  {
    id: 'suite-api-mobile',
    name: 'FinTech REST API & Mobile Hybrid Suite',
    framework: 'Postman Newman + REST Assured + Appium',
    badgeColor: '#D29922',
    tagline: 'Contract testing, JWT auth validation, and mobile gesture automation',
    description:
      'Backend contract validation with Postman/Newman CLI alongside Appium cross-platform mobile tests for iOS and Android transaction confirmation flows.',
    repoUrl: 'https://github.com/yuvaraj/fintech-api-mobile-suite',
    ciStatus: 'passing',
    stats: {
      totalTests: 72,
      passRate: 98.6,
      durationSec: 58,
      coveragePercent: 91,
      flakinessReduction: '1.2% retry rate',
    },
    featuresList: [
      'JSON Schema contract validation on all critical REST endpoints',
      'Automated OAuth token refresh & signature header generation',
      'Appium cross-platform mobile touch gestures (swipe, biometrics mock)',
      'Newman CLI automated run in GitHub Actions matrix workflow',
    ],
    sampleCodeSnippet: {
      filename: 'TransferContractTest.java',
      language: 'java',
      code: `given()
    .header("Authorization", "Bearer " + jwtToken)
    .contentType(ContentType.JSON)
    .body("{\\"recipientIban\\":\\"DE89370400440532013000\\",\\"amount\\":250.00}")
.when()
    .post("/api/v2/transfers")
.then()
    .statusCode(201)
    .body("status", equalTo("PENDING_VERIFICATION"))
    .body("referenceId", matchesRegex("^TX-[A-Z0-9]{8}$"))
    .body(matchesJsonSchemaInClasspath("schemas/transfer-schema.json"));`,
    },
    cucumberFeature: {
      title: 'Cross-Platform Fund Transfer & API Verification',
      tags: ['@api', '@mobile', '@fintech'],
      description: 'Verify backend API state aligns with mobile screen transaction ledger.',
      scenarios: [
        {
          id: 'sc-5',
          name: 'Initiate transfer via mobile and assert API database state',
          tags: ['@api', '@smoke'],
          status: 'passed',
          totalDurationMs: 1120,
          steps: [
            { keyword: 'Given', text: 'the user authenticates on Appium mobile container with PIN', status: 'passed', durationMs: 340 },
            { keyword: 'When', text: 'they submit a transfer of $50.00 to account "ACC-9912"', status: 'passed', durationMs: 380 },
            { keyword: 'Then', text: 'the REST API endpoint returns HTTP 201 with matching reference', status: 'passed', durationMs: 210 },
            { keyword: 'And', text: 'the mobile account balance decrements by $50.00 in real time', status: 'passed', durationMs: 190 },
          ],
        },
      ],
    },
  },
];

export const INITIAL_CAREER_MILESTONES: CareerMilestone[] = [
  {
    id: 'mile-4',
    commitHash: 'c4e912a',
    date: '2025 - Present',
    title: 'Associate Test Engineer',
    role: 'Test Automation & Quality Advocate',
    organization: 'FinTech & SaaS Solutions Lab',
    summary:
      'Spearheading automated regression suites, Cucumber BDD scenarios, and CI/CD quality gates. Bridged the manual testing team with automated pipelines.',
    achievements: [
      'Authored 250+ automated Playwright and Selenium test cases covering 94% of core user journeys',
      'Reduced smoke test runtime from 45 minutes of manual clicking to 3.8 minutes in parallel CI',
      'Created automated defect reproduction scripts for critical bug reports, shortening dev fix cycles by 35%',
      'Established zero-flakiness guideline eliminating arbitrary Thread.sleep calls across all test repositories',
    ],
    techStack: ['Playwright', 'Cucumber BDD', 'TypeScript', 'GitHub Actions', 'Docker'],
    type: 'experience',
    flakyInsight: 'Discovered that 80% of CI flakiness was caused by animations completing after locator lookup. Replaced with web-first assertions.',
  },
  {
    id: 'mile-3',
    commitHash: 'b178a99',
    date: '2024',
    title: 'QA Automation Intern & Manual Tester',
    role: 'Quality Assurance Specialist',
    organization: 'Agile Product Studio',
    summary:
      'Executed exploratory testing, sprint test case documentation, API validation with Postman, and authored the initial Java + Selenium framework.',
    achievements: [
      'Documented and executed over 500 manual test cases for sprint releases with zero escape critical defects',
      'Wrote first automated framework using Selenium WebDriver + TestNG with Page Object Model',
      'Integrated Postman collections with Newman in automated nightly test execution jobs',
      'Maintained JIRA defect board and ran weekly defect triage meetings with frontend and backend developers',
    ],
    techStack: ['Selenium WebDriver', 'Java', 'TestNG', 'Postman', 'JIRA', 'SQL'],
    type: 'experience',
    flakyInsight: 'Learned the importance of test isolation: dependent tests that share database state are destined to fail when run concurrently.',
  },
  {
    id: 'mile-2',
    commitHash: 'a902df3',
    date: '2023 - 2024',
    title: 'The Automation Awakening',
    role: 'Self-Directed Engineering Project',
    organization: 'Open Source Testing Community',
    summary:
      'Deep dive into modern test engineering: BDD with Cucumber, locator resilience, headless browser architecture, and distributed test grids.',
    achievements: [
      'Built 4 distinct open-source automation test repositories demonstrating Playwright, Cypress, and Selenium',
      'Practiced writing clear, business-readable Gherkin specifications adhering to the Three Amigos methodology',
      'Learned Docker containerization for running headless browser grids with VNC recording for debug triage',
    ],
    techStack: ['Cucumber BDD', 'Gherkin', 'Cypress', 'Docker', 'Git'],
    type: 'breakthrough',
  },
  {
    id: 'mile-1',
    commitHash: '98fa110',
    date: '2023',
    title: 'Computer Science & Software Foundations',
    role: 'Student & Apprentice',
    organization: 'Engineering Institute',
    summary:
      'Mastered object-oriented programming in Java and TypeScript, data structures, relational database normalization, and web fundamentals.',
    achievements: [
      'Built foundational knowledge in HTTP protocol, DOM rendering cycles, RESTful API architecture, and SQL querying',
      'Discovered passion for test-driven development (TDD) and finding subtle edge cases that others miss',
    ],
    techStack: ['Java', 'TypeScript', 'SQL', 'HTML5/CSS', 'Linux Bash'],
    type: 'learning',
  },
];

export const INITIAL_DEBUG_INCIDENTS: DebuggingIncident[] = [
  {
    id: 'INC-01',
    title: 'Async Race Condition in Multi-Select Dropdown',
    scenarioName: 'Filter transaction ledger by multiple currency codes',
    symptoms:
      'Test passed 9 times out of 10 on local machine, but failed consistently on GitHub Actions headless runner with ElementNotInteractableException.',
    rootCause:
      'The dropdown animation was still expanding (`opacity: 0.6` transition in CSS) when the test script fired the click event. The headless Linux runner executed JavaScript faster than the DOM paint cycle.',
    diagnosticTools: ['Playwright Trace Viewer', 'Console DevTools Network throttling', 'Frame-by-frame video recording'],
    fixApplied:
      'Switched from brittle coordinate click to Playwright locator with auto-wait `toBeVisible()` and target aria role `role="option"`. Removed all manual sleep timers.',
    regressionGuard: 'await page.getByRole("option", { name: "EUR - Euro" }).click({ timeout: 5000 });',
    stackTraceSnippet: `ElementNotInteractableError: element not interactable: [data-testid="currency-dropdown-list"]
  (Session info: chrome-headless-shell=122.0.6261.94)
  at Object.throwDecodedError (node_modules/selenium-webdriver/lib/error.js:522:15)
  at CustomerGridPage.selectCurrency (src/pages/CustomerGridPage.ts:48:21)
  at StepDefinitions.ts:62:30`,
    testFile: 'currency_filter.spec.ts:48',
  },
  {
    id: 'INC-02',
    title: 'StaleElementReferenceException During Pagination Reload',
    scenarioName: 'Verify page 2 record count on dynamic inventory grid',
    symptoms:
      'Selenium test threw StaleElementReferenceException intermittently when asserting table rows immediately after clicking next-page arrow.',
    rootCause:
      'The test held references to old DOM `<tr>` elements from page 1 while the AJAX call replaced the table body with page 2 data, destroying the previous DOM nodes.',
    diagnosticTools: ['Java Thread Dump', 'Chrome Network Panel (XHR inspection)', 'DOM Mutation Observer'],
    fixApplied:
      'Implemented custom ExpectedCondition checking that the previous table container became stale before querying the new table rows, ensuring fresh locator binding.',
    regressionGuard: 'wait.until(ExpectedConditions.stalenessOf(oldTableElement));\nwait.until(ExpectedConditions.visibilityOfAllElements(newRows));',
    stackTraceSnippet: `org.openqa.selenium.StaleElementReferenceException: stale element reference: 
  stale element not found in the current frame
  at org.openqa.selenium.remote.codec.w3c.W3CHttpResponseCodec.createException(W3CHttpResponseCodec.java:185)
  at org.openqa.selenium.remote.RemoteWebElement.execute(RemoteWebElement.java:224)
  at org.openqa.selenium.remote.RemoteWebElement.getText(RemoteWebElement.java:192)
  at pages.InventoryPage.getRowItems(InventoryPage.java:74)`,
    testFile: 'InventoryPage.java:74',
  },
  {
    id: 'INC-03',
    title: 'Silent 401 Unauthorized Caused by Millisecond Clock Drift',
    scenarioName: 'Complete checkout with expiring OAuth token',
    symptoms:
      'API test failed with 401 Unauthorized only on test runners configured in UTC timezone during daylight saving transitions.',
    rootCause:
      'The test generated an assertion with local machine timestamp while the mock auth server evaluated JWT `exp` claim against UTC time without skew allowance.',
    diagnosticTools: ['Postman Console', 'JWT.io token decoder', 'Wireshark packet capture'],
    fixApplied:
      'Standardized test timestamp generation to epoch UTC milliseconds and added a 30-second leeway assertion to the auth mock client.',
    regressionGuard: 'const currentUtcEpoch = Math.floor(Date.now() / 1000);\nexpect(tokenPayload.exp).toBeGreaterThan(currentUtcEpoch + 60);',
    stackTraceSnippet: `AssertionError: expected HTTP 200 OK but received HTTP 401 Unauthorized
  Response Body: {"error": "TokenExpiredError", "message": "jwt expired", "expiredAt": "2026-10-28T09:30:00.000Z"}
  at Object.assertResponse (tests/contracts/auth.test.ts:89:12)`,
    testFile: 'auth_contract.test.ts:89',
  },
];

export const INITIAL_LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'topic-1',
    category: 'Automation Core',
    title: 'Resilient Locator Engineering & DOM Traversal',
    depth: 'Mastered',
    progressPercent: 95,
    description:
      'Replacing brittle, volatile XPath chains (`/html/body/div[2]/div/span[1]`) with resilient semantic user-facing locators (`getByRole`, `getByLabel`, `data-testid`).',
    keySkills: ['Accessibility Roles & ARIA Selectors', 'Custom data-testid conventions', 'CSS Selector specificity', 'Shadow DOM piercing'],
    practicalApplication: 'Zero broken locators during UI redesigns that preserve accessibility attributes.',
    tools: ['Playwright Inspector', 'Chrome DevTools', 'axe-core'],
  },
  {
    id: 'topic-2',
    category: 'BDD & Architecture',
    title: 'Cucumber BDD & Page Object Model (POM)',
    depth: 'Mastered',
    progressPercent: 90,
    description:
      'Structuring test code into clear layers: human-readable Gherkin features, step definition glue code, and encapsulating UI selectors into clean Page Objects.',
    keySkills: ['Gherkin best practices (Declarative vs Imperative)', 'Scenario Outlines with Examples', 'World context sharing', 'Single Responsibility POMs'],
    practicalApplication: 'Allowing product managers and developers to read, audit, and approve test scenarios before writing code.',
    tools: ['Cucumber', 'TypeScript', 'Playwright', 'Allure'],
  },
  {
    id: 'topic-3',
    category: 'Automation Core',
    title: 'Flakiness Root-Cause Eradication',
    depth: 'Practicing',
    progressPercent: 88,
    description:
      'Diagnosing and resolving asynchronous race conditions, dynamic DOM rendering delays, and test isolation leaks that corrupt shared state.',
    keySkills: ['Smart Predicate Waits over Hard Sleeps', 'Deterministic Test Isolation', 'Network mocking & request intercepting', 'CI worker concurrency tuning'],
    practicalApplication: 'Reduced team CI flakiness index from 8.5% down to 1.4% across 400+ automated test cases.',
    tools: ['Playwright Tracing', 'Chrome Tracing', 'Docker', 'TestNG Listeners'],
  },
  {
    id: 'topic-4',
    category: 'API & Performance',
    title: 'REST API Contract & Schema Testing',
    depth: 'Practicing',
    progressPercent: 82,
    description:
      'Validating JSON payloads, HTTP status codes, OAuth flows, and response schema contracts using Postman, Newman, and REST Assured.',
    keySkills: ['JSON Schema Validation', 'Header Injection & Auth Chains', 'Mocking third-party APIs', 'Performance smoke tests with k6'],
    practicalApplication: 'Catching breaking backend API changes before frontend integration in staging environments.',
    tools: ['Postman', 'Newman CLI', 'REST Assured', 'k6'],
  },
  {
    id: 'topic-5',
    category: 'CI/CD & DevOps',
    title: 'Automated CI/CD Pipeline Gates & Dockerization',
    depth: 'Practicing',
    progressPercent: 80,
    description:
      'Running headless browser suites on pull requests, generating interactive test artifacts, and running tests inside hermetic Docker containers.',
    keySkills: ['GitHub Actions matrix workflows', 'Docker multi-stage test images', 'Artifact publishing (videos, traces)', 'Slack test run webhook notifications'],
    practicalApplication: 'Automated smoke tests run on every branch push, blocking merge if regressions occur.',
    tools: ['GitHub Actions', 'Docker', 'Linux Bash', 'Allure CLI'],
  },
  {
    id: 'topic-6',
    category: 'CI/CD & DevOps',
    title: 'Mobile Appium & Cross-Device Automation',
    depth: 'Exploring',
    progressPercent: 65,
    description:
      'Exploring mobile native testing on Android and iOS emulators with Appium, touch gesture automation, and device farm synchronization.',
    keySkills: ['Appium Inspector', 'Mobile locators (UIAutomator2, XCUITest)', 'Handling native permission dialogs', 'Biometrics & offline mode simulation'],
    practicalApplication: 'Validating critical mobile checkout and onboarding flows on simulated device matrices.',
    tools: ['Appium', 'Android Studio Emulator', 'Xcode Simulator', 'Python'],
  },
];

export const INITIAL_BUG_TICKETS: BugTicket[] = [
  {
    id: 'BUG-101',
    title: 'Double-click on checkout submit causes duplicate payment charge',
    severity: 'Critical',
    status: 'Fix Verified',
    module: 'Checkout & Payments',
    discoveredIn: 'Automated Regression Suite (Playwright)',
    reportedBy: 'Yuvaraj (Associate Test Engineer)',
    stepsToReproduce: [
      '1. Navigate to /checkout with 1 item in cart',
      '2. Fill valid test card details in Stripe Elements form',
      '3. Rapidly double-click the "Pay $49.00" submit button within 150ms',
      '4. Inspect backend payment transactions log',
    ],
    expectedResult: 'Submit button disables immediately on first click with spinner; exactly 1 charge created.',
    actualResult: 'Button remained clickable for 300ms before disabling; 2 distinct charge requests dispatched with duplicate reference IDs.',
    automationTestGuard: 'await checkoutPage.doubleClickSubmit();\nawait expect(backend.paymentsCount).toBe(1);',
    comments: [
      {
        id: 'c1',
        author: 'Yuvaraj',
        avatarText: 'YV',
        timeAgo: '3 days ago',
        content: 'Flagged via automated load simulation. Added automated test guard to block duplicate events at form level.',
      },
      {
        id: 'c2',
        author: 'Lead Dev',
        avatarText: 'LD',
        timeAgo: '2 days ago',
        content: 'Merged idempotency key header on the payment API. Fix verified via Playwright regression run.',
      },
    ],
  },
  {
    id: 'BUG-102',
    title: 'Mobile navigation drawer traps focus when opened via keyboard Tab',
    severity: 'High',
    status: 'Automated',
    module: 'Navigation & Accessibility',
    discoveredIn: 'Exploratory & Axe Accessibility Audit',
    reportedBy: 'Yuvaraj (Associate Test Engineer)',
    stepsToReproduce: [
      '1. Open site on 375px viewport (mobile emulation)',
      '2. Press Tab until the hamburger menu button is focused, then press Enter',
      '3. Continue pressing Tab to cycle through menu links',
      '4. Try pressing Tab to reach the close (✕) button or outside modal',
    ],
    expectedResult: 'Focus cycles cleanly within the drawer and ESC key immediately closes the drawer and restores focus to hamburger button.',
    actualResult: 'Focus slipped behind the drawer onto background links; ESC key did not dismiss drawer.',
    automationTestGuard: 'await page.keyboard.press("Escape");\nawait expect(page.getByTestId("mobile-drawer")).toBeHidden();',
    comments: [
      {
        id: 'c3',
        author: 'Yuvaraj',
        avatarText: 'YV',
        timeAgo: '5 days ago',
        content: 'Wrote an automated accessibility check using @axe-core/playwright. Trapped focus container implemented.',
      },
    ],
  },
  {
    id: 'BUG-103',
    title: 'Sorting by "Last Modified" column on data table resets active filters',
    severity: 'Medium',
    status: 'Investigating',
    module: 'CRM Data Grid',
    discoveredIn: 'Selenium TestNG DataProvider Test',
    reportedBy: 'Yuvaraj (Associate Test Engineer)',
    stepsToReproduce: [
      '1. Open Customer Grid and filter by Region="Asia-Pacific"',
      '2. Notice 32 rows matching the filter',
      '3. Click column header "Last Modified" to sort ascending',
    ],
    expectedResult: 'The 32 filtered rows should sort ascending by date.',
    actualResult: 'The grid sorted by date but reset the Region filter back to "All", displaying 240 unfiltered rows.',
    automationTestGuard: 'await grid.filterByRegion("Asia-Pacific");\nawait grid.sortByColumn("Last Modified");\nexpect(await grid.getRowCount()).toBe(32);',
    comments: [
      {
        id: 'c4',
        author: 'Yuvaraj',
        avatarText: 'YV',
        timeAgo: '1 day ago',
        content: 'Isolated issue to query param merge logic in router. Frontend state is dropping filter params on sort change.',
      },
    ],
  },
  {
    id: 'BUG-104',
    title: 'Expired session returns blank screen instead of redirecting to login',
    severity: 'High',
    status: 'Triage',
    module: 'Authentication & Session',
    discoveredIn: 'Nightly Chaos Run',
    reportedBy: 'Yuvaraj (Associate Test Engineer)',
    stepsToReproduce: [
      '1. Log in to dashboard with valid credentials',
      '2. Clear "session_token" cookie in browser storage',
      '3. Click on "Settings" tab',
    ],
    expectedResult: 'User redirected to /login with toast notice: "Your session has expired. Please sign in again."',
    actualResult: 'Uncaught TypeError in console: Cannot read properties of undefined (reading "userRole"). Blank screen.',
    automationTestGuard: 'await page.context().clearCookies();\nawait page.goto("/settings");\nawait expect(page).toHaveURL(/.*\\/login/);',
    comments: [
      {
        id: 'c5',
        author: 'Yuvaraj',
        avatarText: 'YV',
        timeAgo: '4 hours ago',
        content: 'Reproduced consistently in headless Chromium. Auth boundary wrapper needed around route tree.',
      },
    ],
  },
];
