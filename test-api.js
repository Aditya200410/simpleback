const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

async function testAPI() {
  try {
    console.log('🧪 Testing Cyber Atix API...\n');

    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${API_BASE}/health`);
    console.log('✅ Health check:', healthResponse.data.message);

    // Test user registration
    console.log('\n2. Testing user registration...');
    const registerData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Password123'
    };

    try {
      const registerResponse = await axios.post(`${API_BASE}/auth/register`, registerData);
      console.log('✅ Registration successful:', registerResponse.data.message);
      
      const token = registerResponse.data.token;
      console.log('🔑 Token received:', token.substring(0, 20) + '...');

      // Test token verification
      console.log('\n3. Testing token verification...');
      const verifyResponse = await axios.get(`${API_BASE}/auth/verify`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Token verification successful');

      // Test profile access
      console.log('\n4. Testing profile access...');
      const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('✅ Profile access successful:', profileResponse.data.user.email);

    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes('already exists')) {
        console.log('⚠️  User already exists, testing login instead...');
        
        // Test login
        console.log('\n2. Testing user login...');
        const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
          email: 'test@example.com',
          password: 'Password123'
        });
        console.log('✅ Login successful:', loginResponse.data.message);
        
        const token = loginResponse.data.token;
        console.log('🔑 Token received:', token.substring(0, 20) + '...');

        // Test token verification
        console.log('\n3. Testing token verification...');
        const verifyResponse = await axios.get(`${API_BASE}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Token verification successful');

        // Test profile access
        console.log('\n4. Testing profile access...');
        const profileResponse = await axios.get(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('✅ Profile access successful:', profileResponse.data.user.email);
      } else {
        throw error;
      }
    }

    console.log('\n🎉 All tests passed! API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

// Run tests
testAPI();
