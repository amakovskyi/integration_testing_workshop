import { BaseClient } from '../../../src/api.client';

describe('GET [/] functional', () => {

  test('It should work', async () => {
    let result = await BaseClient.get('');
    expect(result).toEqual('Hello from test server!');
  });

});