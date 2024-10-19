beforeAll(() => {
  process.env.API_PATH = 'https://nf-api.onrender.com/api/v1';
});

jest.mock('../src/js/storage/save.js', () => ({
  save: jest.fn(),
}));
jest.mock('../src/js/storage/remove.js', () => ({
  remove: jest.fn(),
}));

import { login } from 'src/js/api/auth/login.js';
import { logout } from 'src/js/api/auth/logout.js';
import { save } from '../src/js/storage/save.js';
import { remove } from '../src/js/storage/remove.js';

global.fetch = jest.fn();

describe('Auth functionality', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login stores a token and profile when provided with valid credentials', async () => {
    const mockProfile = {
      accessToken: 'testToken',
      name: 'John Doe',
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockProfile),
    });

    const profile = await login('test@example.com', 'password123');

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.API_PATH}/social/auth/login`,
      {
        method: 'post',
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    expect(save).toHaveBeenCalledWith('token', 'testToken');
    expect(save).toHaveBeenCalledWith('profile', { name: 'John Doe' });

    expect(profile).toEqual({ name: 'John Doe' });
  });

  test('login throws an error when credentials are invalid', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    });

    await expect(login('wrong@example.com', 'wrongPassword')).rejects.toThrow(
      'Unauthorized'
    );
  });

  test('logout removes token and profile from storage', () => {
    logout();

    expect(remove).toHaveBeenCalledWith('token');
    expect(remove).toHaveBeenCalledWith('profile');
  });
});
