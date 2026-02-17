import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const THRESHOLDS = {
    performance: 90,
    accessibility: 95,
    'best-practices': 90,
    seo: 95,
};

const METRIC_THRESHOLDS = {
    'first-contentful-paint': 1800,
    'largest-contentful-paint': 2500,
    'total-blocking-time': 200,
    'cumulative-layout-shift': 0.1,
    'speed-index': 3000,
};

async function runLighthouse(url) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
        logLevel: 'info',
        output: ['html', 'json'],
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);

    await chrome.kill();

    return runnerResult;
}

function checkThresholds(lhr) {
    const results = {
        passed: true,
        failures: [],
    };

    // Check category scores
    for (const [category, threshold] of Object.entries(THRESHOLDS)) {
        const score = lhr.categories[category]?.score * 100;
        if (score < threshold) {
            results.passed = false;
            results.failures.push({
                type: 'category',
                name: category,
                score: score.toFixed(1),
                threshold,
            });
        }
    }

    // Check specific metrics
    const metrics = lhr.audits.metrics?.details?.items[0];
    if (metrics) {
        for (const [metric, threshold] of Object.entries(METRIC_THRESHOLDS)) {
            const value = metrics[metric];
            if (value > threshold) {
                results.passed = false;
                results.failures.push({
                    type: 'metric',
                    name: metric,
                    value: value.toFixed(0),
                    threshold,
                });
            }
        }
    }

    return results;
}

async function main() {
    const url = 'http://localhost:4173';

    console.log('🚀 Running Lighthouse audit...');
    console.log(`📍 URL: ${url}\n`);

    try {
        const runnerResult = await runLighthouse(url);
        const lhr = runnerResult.lhr;

        // Create reports directory
        const reportsDir = join(process.cwd(), 'lighthouse-reports');
        try {
            mkdirSync(reportsDir, { recursive: true });
        } catch (e) {
            // Directory already exists
        }

        // Save HTML report
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const htmlPath = join(reportsDir, `report-${timestamp}.html`);
        const jsonPath = join(reportsDir, `report-${timestamp}.json`);

        writeFileSync(htmlPath, runnerResult.report[0]);
        writeFileSync(jsonPath, runnerResult.report[1]);

        console.log('📊 Lighthouse Results:\n');

        // Print category scores
        for (const [category, data] of Object.entries(lhr.categories)) {
            const score = (data.score * 100).toFixed(1);
            const threshold = THRESHOLDS[category];
            const emoji = score >= threshold ? '✅' : '❌';
            console.log(`${emoji} ${data.title}: ${score}/100 (threshold: ${threshold})`);
        }

        console.log('\n📈 Key Metrics:\n');

        const metrics = lhr.audits.metrics?.details?.items[0];
        if (metrics) {
            for (const [metric, threshold] of Object.entries(METRIC_THRESHOLDS)) {
                const value = metrics[metric];
                const emoji = value <= threshold ? '✅' : '❌';
                const unit = metric === 'cumulative-layout-shift' ? '' : 'ms';
                console.log(`${emoji} ${metric}: ${value.toFixed(0)}${unit} (threshold: ${threshold}${unit})`);
            }
        }

        // Check thresholds
        const thresholdResults = checkThresholds(lhr);

        console.log(`\n📁 Reports saved to: ${reportsDir}`);
        console.log(`   - HTML: ${htmlPath}`);
        console.log(`   - JSON: ${jsonPath}`);

        if (!thresholdResults.passed) {
            console.log('\n❌ Some thresholds were not met:\n');
            for (const failure of thresholdResults.failures) {
                if (failure.type === 'category') {
                    console.log(`   - ${failure.name}: ${failure.score}/100 (required: ${failure.threshold})`);
                } else {
                    console.log(`   - ${failure.name}: ${failure.value} (max: ${failure.threshold})`);
                }
            }
            process.exit(1);
        } else {
            console.log('\n✅ All thresholds met!');
        }

    } catch (error) {
        console.error('❌ Error running Lighthouse:', error);
        process.exit(1);
    }
}

main();
