import { test, describe } from 'node:test';
import assert from 'node:assert';
import { verifyAdminPassword } from '../src/config/firebase.js';

describe('Firebase Cloud CMS & Admin Security Test Suite', () => {
  test('Admin Password verification', () => {
    // Correct default password
    assert.strictEqual(verifyAdminPassword('noman@admin2026'), true);
    assert.strictEqual(verifyAdminPassword(' noman@admin2026 '), true, 'Should trim spaces');

    // Incorrect passwords
    assert.strictEqual(verifyAdminPassword('wrongpassword'), false);
    assert.strictEqual(verifyAdminPassword('admin'), false);
    assert.strictEqual(verifyAdminPassword(''), false);
  });
});
