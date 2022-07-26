import { ApiException } from './api.exception';
import { validateContent } from './content.validation';

export function expectError(fn: () => Promise<any>, statusCode: number = 400, message?: string): (() => Promise<any>) {
  return async () => {
    try {
      await fn();
      fail('Test should fail with error');
    } catch (e) {
      if (e instanceof ApiException) {
        if (message == null) {
          validateContent(e.data, { statusCode });
        } else {
          validateContent(e.data, { statusCode, message });
        }
      } else {
        throw e;
      }
    }
  };

}