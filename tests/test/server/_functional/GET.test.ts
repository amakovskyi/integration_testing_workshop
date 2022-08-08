import { BaseClient } from '../../../src/api.client';
import { validateMatch } from 'api-auditor';

describe('GET [/] functional', () => {

  test('It should work', async () => {
    let result = await BaseClient.get('');
    validateMatch(result, 'Hello from test server!')
  });

});