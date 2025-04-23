import { User } from '../../models/User';
import bcrypt from 'bcrypt';

describe('User Model', () => {
  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123'
    };

    const user = new User(userData);
    await user.save();

    expect(user.email).toBe(userData.email);
    expect(user.name).toBe(userData.name);
    expect(user.password).not.toBe(userData.password); // Password should be hashed
  });

  it('should hash password before saving', async () => {
    const password = 'password123';
    const user = new User({
      email: 'test2@example.com',
      name: 'Test User 2',
      password
    });

    await user.save();
    const isMatch = await bcrypt.compare(password, user.password);
    expect(isMatch).toBe(true);
  });

  it('should compare passwords correctly', async () => {
    const password = 'password123';
    const user = new User({
      email: 'test3@example.com',
      name: 'Test User 3',
      password
    });

    await user.save();
    const isMatch = await user.comparePassword(password);
    expect(isMatch).toBe(true);

    const isWrongMatch = await user.comparePassword('wrongpassword');
    expect(isWrongMatch).toBe(false);
  });

  it('should store OAuth tokens', async () => {
    const user = new User({
      email: 'test4@example.com',
      name: 'Test User 4',
      password: 'password123',
      googleToken: 'google-token',
      microsoftToken: 'microsoft-token',
      dropboxToken: 'dropbox-token'
    });

    await user.save();
    const foundUser = await User.findById(user._id);

    expect(foundUser?.googleToken).toBe('google-token');
    expect(foundUser?.microsoftToken).toBe('microsoft-token');
    expect(foundUser?.dropboxToken).toBe('dropbox-token');
  });
}); 