# Role-Based System Setup & Testing Guide

## Quick Start

### 1. Update Frontend Environment

Make sure your `.env` file has the correct API URL:

```
VITE_API_URL=https://ethara-ai-assessment-lf1a.onrender.com/api
```

### 2. Run Frontend

```bash
cd frontend
npm run dev
```

### 3. Run Backend (if local)

```bash
cd backend
npm start
```

## Testing the System

### Create Test Admin User

1. Go to http://localhost:5174/signup
2. Fill in the form:
   - **Name**: Admin User
   - **Email**: admin@test.com
   - **Password**: password123
   - **Role**: Admin (Full Access) ⭐ Select this
3. Click "Create Account"
4. Go back to login and sign in with these credentials

### Create Test Member User

1. Go to http://localhost:5174/signup
2. Fill in the form:
   - **Name**: Member User
   - **Email**: member@test.com
   - **Password**: password123
   - **Role**: Member (Limited Access) ⭐ Select this
3. Click "Create Account"
4. Go back to login and sign in with these credentials

## Feature Comparison

### Admin Can ✅

- Navigate to Projects page and see "New Project" button
- Navigate to Tasks page and see "New Task" button
- Create projects
- Create tasks
- Update task status

### Member Cannot ✅

- See "New Project" button (replaced with info message)
- See "New Task" button (replaced with info message)
- Create projects
- Create tasks
- ✅ BUT can update task status for existing tasks

## Sidebar Features

### Admin View

- Dashboard
- Projects ✅
- Tasks

### Member View

- Dashboard
- Tasks
  (Projects menu hidden)

## Visual Indicators

### Role Badge

Look in the sidebar at the bottom to see your role displayed:

- **Admin** badge (purple)
- **Member** badge (blue)

Your name and email are also shown for easy identification.

## Common Workflows

### Workflow 1: Admin Creating a Project and Task

1. Login as admin
2. Navigate to "Projects" in sidebar
3. Click "New Project"
4. Fill in project details
5. Navigate to "Tasks" in sidebar
6. Click "New Task"
7. Assign task to the project
8. Set due date and status

### Workflow 2: Member Updating Task Status

1. Login as member
2. Navigate to "Tasks" in sidebar
3. View all tasks (see info message about creation)
4. Click status buttons to update task status
5. Changes are reflected immediately

### Workflow 3: Member Trying Unauthorized Action

1. Login as member
2. Try accessing project creation
3. See message: "Only administrators can create projects"
4. Try accessing task creation
5. See message: "Only administrators can create tasks"

## API Testing with Curl

### Test Admin Project Creation

```bash
curl -X POST https://ethara-ai-assessment-lf1a.onrender.com/api/projects \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "This is a test",
    "memberEmails": []
  }'
```

### Test Member Project Creation (Should Fail)

```bash
curl -X POST https://ethara-ai-assessment-lf1a.onrender.com/api/projects \
  -H "Authorization: Bearer YOUR_MEMBER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "This is a test",
    "memberEmails": []
  }'
```

Expected: 403 Forbidden - "You do not have permission to perform this action"

## Troubleshooting

### Issue: Role selection not showing in signup

**Fix**: Make sure Lucide icons are installed

```bash
npm install lucide-react
```

### Issue: Member can still create projects

**Fix**:

1. Clear localStorage in browser DevTools
2. Sign out and sign back in
3. Verify backend is running and has roleMiddleware

### Issue: Projects menu not hidden for members

**Fix**:

1. Check if role is properly loaded in AuthContext
2. Verify token contains role information
3. Clear cache and reload page

### Issue: "Access Denied" on all pages

**Fix**:

1. Make sure you're logged in
2. Check if token is expired
3. Try logging in again
4. Check if API endpoint is correct in `.env`

## Debugging Tips

1. **Check Browser Console**: Look for any error messages
2. **Check Network Tab**: Verify API requests are going to correct URL
3. **Check localStorage**:
   - Open DevTools
   - Go to Application → localStorage
   - Look for "token" key
4. **Check AuthContext**:
   - Add `console.log(user)` in any component using `useAuth()`
   - Verify role is present in user object

## Next Steps

After testing:

1. ✅ Deploy backend to Render
2. ✅ Update frontend `.env` with backend URL
3. ✅ Test RBAC with deployed backend
4. ✅ Create admin users for team members
5. ✅ Create member users for team members
6. ✅ Monitor usage and permissions

---

**Need Help?** Check RBAC_GUIDE.md for detailed documentation.
