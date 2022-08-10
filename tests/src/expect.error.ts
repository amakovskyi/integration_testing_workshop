import { ApiException } from './api.exception';
import { validateMatch } from '@amakovskyi/api-auditor';

export function expectError(fn: () => Promise<any>, statusCode?: number, message?: string): (() => Promise<any>) {
  return async () => {
    try {
      await fn();
      fail('Test should fail with error');
    } catch (e) {
      if (e instanceof ApiException) {
        if (statusCode == null) {
          throw e;
        }
        if (message == null) {
          validateMatch(e.data, { statusCode });
        } else {
          validateMatch(e.data, { statusCode, message });
        }
      } else {
        throw e;
      }
    }
  };

}