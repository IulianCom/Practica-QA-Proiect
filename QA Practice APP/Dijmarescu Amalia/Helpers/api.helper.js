import { APIRequestContext } from '@playwright/test';

// Încearcă să ia URL din variabila de mediu API_BASE_URL, altfel default localhost
const BASE_URL = process.env.API_BASE_URL || 'http://localhost:8887/posts';

export async function getPosts(request) {
  const response = await request.get(BASE_URL);
  if (!response.ok()) throw new Error('Failed to get posts');
  return response.json();
}

export async function createPost(request, data) {
  const response = await request.post(BASE_URL, { data });
  if (!response.ok()) throw new Error('Failed to create post');
  return response.json();
}

export async function updatePost(request, postId, data) {
  const response = await request.put(`${BASE_URL}/${postId}`, { data });
  if (!response.ok()) throw new Error('Failed to update post');
  return response.json();
}

export async function deletePost(request, postId) {
  const response = await request.delete(`${BASE_URL}/${postId}`);
  if (!response.ok()) throw new Error('Failed to delete post');
  return response.status();
}
