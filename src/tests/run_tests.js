/* global process */
import { runMrvIntelligenceTests } from './mrv_intelligence.test.js';

async function main() {
  console.log('--- RUNNING MRV INTELLIGENCE (MEMBER 2) TEST SUITE ---');
  try {
    const results = await runMrvIntelligenceTests();
    let passedCount = 0;
    let failedCount = 0;

    results.forEach((r, idx) => {
      if (r.passed) {
        console.log(`[PASS] ${idx + 1}. ${r.name}`);
        passedCount++;
      } else {
        console.error(`[FAIL] ${idx + 1}. ${r.name} - ${r.error}`);
        failedCount++;
      }
    });

    console.log(`\nTEST SUMMARY: ${passedCount} passed, ${failedCount} failed (${results.length} total)`);
    if (failedCount > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test execution failed with unhandled exception:', err);
    process.exit(1);
  }
}

main();
