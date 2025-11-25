# Authentication Usage Guide

## Quick Reference for Using Auth in Components

### 1. Access Current User & Auth State

```tsx
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { user, isAuthenticated, token } = useAuthStore();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.username}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### 2. Logout Button

```tsx
import { authApi } from '@/api/authApi';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

function LogoutButton() {
  const navigate = useNavigate();
  
  const { mutate: logout, isPending } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      navigate({ to: '/auth/login' });
    },
  });
  
  return (
    <button 
      onClick={() => logout()} 
      disabled={isPending}
    >
      {isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

### 3. Check User Role

```tsx
import { useAuthStore } from '@/store/authStore';

function AdminOnlyFeature() {
  const { user } = useAuthStore();
  
  if (user?.role !== 'admin') {
    return null; // or show "Access Denied"
  }
  
  return <div>Admin-only content</div>;
}
```

### 4. Conditional Rendering Based on Auth

```tsx
import { useAuthStore } from '@/store/authStore';
import { Link } from '@tanstack/react-router';

function Navigation() {
  const { isAuthenticated, user } = useAuthStore();
  
  return (
    <nav>
      {isAuthenticated ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          {user?.role === 'admin' && (
            <Link to="/admin">Admin Panel</Link>
          )}
          <LogoutButton />
        </>
      ) : (
        <>
          <Link to="/auth/login">Login</Link>
          <Link to="/auth/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
```

### 5. Protect a Component (Alternative to Route Protection)

```tsx
import { ProtectedRoute } from '@/components/Auth/ProtectedRoute';

function MyProtectedComponent() {
  return (
    <ProtectedRoute>
      <div>This content requires authentication</div>
    </ProtectedRoute>
  );
}

// For admin-only components
function MyAdminComponent() {
  return (
    <ProtectedRoute requireAdmin>
      <div>This content requires admin role</div>
    </ProtectedRoute>
  );
}
```

### 6. Manual Login (Custom Form)

```tsx
import { authApi } from '@/api/authApi';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

function CustomLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const { mutate: login, isPending, error } = useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onError: (err: Error) => {
      console.error('Login failed:', err.message);
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
```

### 7. Get Token for Manual API Calls

```tsx
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const token = useAuthStore((state) => state.token);
  
  const fetchData = async () => {
    const response = await fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    // ... handle response
  };
  
  return <button onClick={fetchData}>Fetch Data</button>;
}
```

Note: You don't need to manually add the token when using `axiosInstance` - it's automatically added!

### 8. Update User Data

```tsx
import { useAuthStore } from '@/store/authStore';

function UpdateProfile() {
  const setUser = useAuthStore((state) => state.setUser);
  
  const updateUserProfile = () => {
    // After successful API call to update profile
    setUser({
      id: '123',
      username: 'Updated Name',
      email: 'user@example.com',
      role: 'user'
    });
  };
  
  return <button onClick={updateUserProfile}>Update Profile</button>;
}
```

### 9. Programmatic Navigation After Auth Check

```tsx
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

function MyComponent() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/auth/login' });
    }
  }, [isAuthenticated, navigate]);
  
  return <div>Protected content</div>;
}
```

### 10. Check Auth Status Outside Components

```tsx
import { useAuthStore } from '@/store/authStore';

// In a utility function or service
export function isUserAuthenticated() {
  return useAuthStore.getState().isAuthenticated;
}

export function getCurrentUser() {
  return useAuthStore.getState().user;
}

export function getAuthToken() {
  return useAuthStore.getState().token;
}
```

## Common Patterns

### Show Different Content for Admin vs User

```tsx
import { useAuthStore } from '@/store/authStore';

function Dashboard() {
  const { user } = useAuthStore();
  
  return (
    <div>
      <h1>Dashboard</h1>
      {user?.role === 'admin' ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}
```

### Conditional API Calls Based on Auth

```tsx
import { useAuthStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { userApi } from '@/lib/apiClient';

function UserProfile() {
  const { isAuthenticated } = useAuthStore();
  
  const { data, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userApi.profile(),
    enabled: isAuthenticated, // Only fetch if authenticated
  });
  
  if (!isAuthenticated) return <p>Please log in</p>;
  if (isLoading) return <p>Loading...</p>;
  
  return <div>{data?.username}</div>;
}
```

## Important Notes

1. **Token is automatically attached** to all requests made with `axiosInstance`
2. **Auth state persists** across page refreshes (stored in localStorage)
3. **Route protection** is handled by `beforeLoad` hooks in route files
4. **Always check `isAuthenticated`** before accessing `user` properties
5. **Use `useAuthStore.getState()`** to access auth state outside React components
