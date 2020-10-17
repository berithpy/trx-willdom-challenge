const { entityResponse } = require('./utils');

test('EntityResponse formatter', async () => {
  const entity = 'test';
  const content = 'content';
  const er = entityResponse(entity, content);
  expect(er[entity]).toBeDefined();
  expect(er[entity]).toBe(content);
});
