import { BaseClient } from '../../../src/api.client';
import { validateMatch } from '@amakovskyi/api-auditor';

describe('GET [/] functional', () => {

  test('Empty request', async () => {
    let result = await BaseClient.get('');
    validateMatch(result, {
      status: 'Up',
    });
  });

  test('Message', async () => {
    let result = await BaseClient.get('', { message: 'Hello!' });
    validateMatch(result, {
      status: 'Up',
      message: 'Hello!',
    });
  });

});