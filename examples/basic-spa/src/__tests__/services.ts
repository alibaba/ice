import requestsService from '../services/requests';

test('services requests', async () => {
  const data = await requestsService.test();
  expect(data).not.toBeNull();
});
