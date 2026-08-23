/* eslint-disable no-unused-vars */
/**
 * Authentication service — mock implementation
 * Replace with Supabase Auth later
 */

export async function loginUser(email, password) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return { success: true, message: 'Login successful' };
}

export async function logoutUser() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { success: true };
}

export async function resetPassword(email) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, message: 'Reset link sent to ' + email };
}

export async function getCurrentUser() {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return null; // Will return user object from Supabase later
}
