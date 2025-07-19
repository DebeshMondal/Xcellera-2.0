import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';

const clerkFrontendApi = "pk_test_ZXRoaWNhbC1zY3VscGluLTU0LmNsZXJrLmFjY291bnRzLmRldiQ"

function AdminRoute({ children }) {
  const { user } = useUser();
  const adminEmail = 'debeshmondal05@gmail.com';
  if (!user || user.primaryEmailAddress.emailAddress !== adminEmail) {
    return <div className="p-8 text-red-600">Access Denied</div>;
  }
  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkFrontendApi}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/admin" element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } />
        </Routes>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);