# Role-Based Access Control (RBAC) System

## Overview

EtharaFlow now features a comprehensive role-based access control system that manages user permissions based on their assigned role.

## Roles

### 1. **Admin** 👨‍💼

**Full System Access**

- ✅ Create projects
- ✅ View all projects
- ✅ Create tasks
- ✅ Update task status
- ✅ View dashboard with full statistics
- ✅ Full project management capabilities

### 2. **Member** 👤

**Limited Access**

- ❌ Cannot create projects (restricted access)
- ✅ Can view existing projects
- ❌ Cannot create tasks (restricted access)
- ✅ Can update task status (update existing tasks)
- ✅ Can view dashboard
- ✅ Can view assigned tasks

## Features Implemented

### Backend (Node.js/Express)

#### 1. **Role Middleware** (`roleMiddleware.js`)

```javascript
const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "You do not have permission"));
    }
    next();
  };
};
```

#### 2. **Protected Routes**

- **POST /api/projects** - Admin only
- **POST /api/tasks** - Admin only
- **PATCH /api/tasks/:id/status** - All authenticated users
- **GET /api/projects** - All authenticated users
- **GET /api/tasks** - All authenticated users

#### 3. **User Model with Role**

```javascript
role: {
  type: String,
  enum: ["admin", "member"],
  default: "member"
}
```

### Frontend (React)

#### 1. **AuthContext** (`context/AuthContext.jsx`)

Manages:

- User authentication state
- User information (name, email, role)
- Login/logout functionality
- Token management

#### 2. **ProtectedRoute** (`components/ProtectedRoute.jsx`)

- Protects pages from unauthorized access
- Redirects unauthenticated users to login
- Prevents users with wrong roles from accessing pages
- Shows loading state while checking authentication

#### 3. **Layout Component Updates** (`components/Layout.jsx`)

- Displays user role badge
- Shows user information in sidebar
- Conditionally hides admin-only menu items
- Displays role-specific indicators

#### 4. **Signup with Role Selection** (`pages/Signup.jsx`)

- Users can select their role (Admin/Member) during signup
- Clear descriptions of each role's capabilities
- Validation for role selection

#### 5. **Role-Based UI Elements**

- **Projects Page**: Members see "Admin Only" message for create functionality
- **Tasks Page**: Members see "Admin Only" message for task creation
- **Dashboard**: Shows role badge and user information
- **Sidebar**: Admin-only menu items hidden from Members

## User Flow

### Signup Flow

1. User fills in name, email, password, and confirm password
2. User selects role (Admin or Member)
3. If role is Admin, user enters the admin signup PIN
4. Backend verifies the admin PIN before creating the admin account
5. Account is created with selected role
6. User receives confirmation message
7. User redirected to login page

### Login Flow

1. User enters credentials
2. Backend validates credentials
3. JWT token created with user role
4. User role stored in AuthContext
5. User redirected to dashboard
6. Role badge displayed in sidebar

### Access Control Flow

1. User attempts to access protected route
2. ProtectedRoute component checks authentication
3. If not authenticated, redirects to login
4. If authenticated, displays route content
5. Role-based UI elements shown/hidden accordingly

## API Integration

### Authentication Token

- JWT tokens include user role
- Token stored in localStorage
- Role extracted on each app load
- Used for frontend authorization

### Example Token Payload

```json
{
  "id": "user_id_123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin"
}
```

## Environment Setup

### Frontend `.env` file

```
VITE_API_URL=https://ethara-ai-assessment-lf1a.onrender.com/api
```

### Backend `.env` file

```
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection
ADMIN_SIGNUP_PIN=your-admin-pin
```

## Testing the RBAC System

### Test Case 1: Admin User

1. Sign up with role = "Admin"
2. Login with admin credentials
3. Navigate to Projects page - "New Project" button visible
4. Navigate to Tasks page - "New Task" button visible
5. All features fully accessible

### Test Case 2: Member User

1. Sign up with role = "Member"
2. Login with member credentials
3. Navigate to Projects page - "Admin Only" message displayed
4. Navigate to Tasks page - "Admin Only" message displayed
5. Can update task status but cannot create new tasks

### Test Case 3: Unauthorized Access

1. Try accessing `/projects` or `/tasks` without login
2. Should redirect to login page
3. Token validated before rendering protected routes

## Security Features

1. **Backend Validation**: Every API endpoint checks user role
2. **Frontend Protection**: Routes guarded with ProtectedRoute
3. **JWT Validation**: Token verified on every request
4. **Type Safety**: Role enum ensures only valid roles exist
5. **Error Handling**: Clear error messages for permission denials

## Future Enhancements

- [ ] More granular roles (Project Manager, Viewer)
- [ ] Permission inheritance
- [ ] Dynamic role assignment by admins
- [ ] Audit logging for access control
- [ ] Role-based dashboard views
- [ ] Team/Department role hierarchies

## Troubleshooting

### Issue: Can't create projects after signup

**Solution**: Ensure you selected "Admin" role during signup. Members cannot create projects.

### Issue: "Access Denied" error

**Solution**: Your user role doesn't have permission for this action. Contact an admin.

### Issue: Not redirecting to login

**Solution**: Clear browser cache and localStorage, then reload.

### Issue: Role not displaying in sidebar

**Solution**: Check if token is properly stored in localStorage and contains role information.

## Files Modified

### Backend

- `src/middleware/roleMiddleware.js` - Role checking middleware
- `src/routes/projectRoutes.js` - Added role protection
- `src/routes/taskRoutes.js` - Added role protection
- `src/models/User.js` - Role field in schema
- `src/services/authService.js` - Role handling in signup

### Frontend

- `src/context/AuthContext.jsx` - User and auth state management
- `src/components/ProtectedRoute.jsx` - Route protection
- `src/components/Layout.jsx` - Role-based UI display
- `src/pages/Login.jsx` - Auth context integration
- `src/pages/Signup.jsx` - Role selection in form
- `src/pages/Projects.jsx` - Role-based feature visibility
- `src/pages/Tasks.jsx` - Role-based feature visibility
- `src/App.jsx` - Auth provider and protected routes

---

**Version**: 1.0  
**Last Updated**: April 30, 2026
