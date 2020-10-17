const request = require('supertest');
const { app } = require('./app');

test('Get 404', async () => {
  const response = await request(app.callback()).get('/');
  expect(response.status).not.toBe(200);
  expect(response.text).not.toBe('Hello World');
});

test('User Put', async () => {
  const response = await request(app.callback())
    .put('/users')
    .set('Accept', 'application/json')
    .send({ id: '100', name: 'asd', email: 'fakeEmail', bio: 'fakeBio' });
  expect(response.status).toBe(200);
});

test('User Post', async () => {
  const response = await request(app.callback())
    .post('/users')
    .set('Accept', 'application/json')
    .send({ name: 'asd', email: 'fakeEmail', bio: 'fakeBio' });
  expect(response.status).toBe(200);
});

test('User Get', async () => {
  const response = await request(app.callback())
    .get('/users/100')
    .set('Accept', 'application/json');
  expect(response.status).toBe(200);
  console.log(response.body.id);
});

test('User Delete', async () => {
  const response = await request(app.callback())
    .delete('/users/100')
    .set('Accept', 'application/json');
  expect(response.status).toBe(200);
});
