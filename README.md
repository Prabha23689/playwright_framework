# ParaBank Playwright Automation Framework

## Overview

This repository contains an enterprise-ready Playwright + TypeScript automation framework for the ParaBank demo site:

- https://parabank.parasoft.com

The framework is designed for scalability, maintainability, CI/CD, and cross-browser execution.

## Folder Structure

- `src/`
  - `pages/` — Page objects for ParaBank workflows
  - `components/` — Reusable UI components
  - `config/` — Environment and framework configuration
  - `core/` — Base classes, fixtures, factories
  - `data/` — Test data and builder patterns
  - `helpers/` — Utility helpers
  - `utils/` — Shared utility classes
- `tests/` — Test suites split by test type
- `.github/workflows/` — GitHub Actions CI pipeline
- `azure-pipelines/` — Azure DevOps pipeline
- `Docker/` — Containerization support

## Execution Commands

Install dependencies:

```bash
npm install
```

Run full Playwright suite:

```bash
npm test
```

Run Chrome headed tests:

```bash
npm run test:chrome:headed
```

Run smoke tests:

```bash
npm run test:smoke
```

Generate and view Playwright HTML report:

```bash
npm run report:html:serve
```

Generate Allure report:

```bash
npm run report:allure
```

Open generated Allure report:

```bash
npm run report:allure:open
```

## Environment Management

Use `.env`, `.env.dev`, `.env.qa`, `.env.stage`, `.env.prod` to manage environments. The framework loads the selected environment automatically based on `ENVIRONMENT` or `NODE_ENV`.

## CI/CD

- GitHub Actions workflows:
  - `.github/workflows/playwright-ci.yml` — current CI pipeline with `workflow_dispatch`, multi-browser matrix, and Allure/artifact upload.
  - `.github/workflows/playwright.yml` — legacy Playwright pipeline.
- Azure DevOps pipeline: `azure-pipelines/azure-pipelines.yml`
- Docker container: `Docker/Dockerfile`
- Docker Compose: `Docker/docker-compose.yml`

## Framework Patterns

- Page Object Model (POM)
- Component Object Pattern
- Factory Pattern
- Builder Pattern
- Dependency Injection via Playwright fixtures

## Key Features

- Multi-browser support
- Parallel execution
- Headless and headed mode
- Retry mechanism
- Screenshots, videos, trace collection
- Allure and HTML reporting
- Environment selection
- Data-driven test support
- Accessibility and visual testing hooks

## Adding a New Test

1. Create/reuse a page object in `src/pages/`
2. Add test data in `src/data/testdata/`
3. Create a new spec under `tests/`
4. Use tags like `@smoke`, `@regression`, `@negative`
5. Run with `npm test -- --grep @tag`

## Cleanup Summary

- `npm ci` is the recommended install step for CI.
- GitHub Actions requires `BASE_URL` and `ENVIRONMENT` repository secrets.
- CI artifacts are uploaded as `playwright-reports`; downloaded copies can be stored locally under `ci-artifacts/playwright-reports/`.
- If a personal access token was exposed during setup, revoke it immediately in GitHub settings.
