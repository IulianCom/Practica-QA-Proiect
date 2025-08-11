import { test } from '@playwright/test';
import { getPosts, createPost, updatePost, deletePost } from '../helpers/api.helper';

test.describe('Testare API', () => {

  test('GET - obține lista de postări', async ({ request }) => {
    const posts = await getPosts(request);
    console.log('Primele 3 postări:', posts.slice(0, 3));
  });

  test('POST - creează o postare nouă', async ({ request }) => {
    const newPost = await createPost(request, {
      title: 'Postare nouă',
      body: 'Conținut de test',
      userId: 1
    });
    console.log('Postare creată:', newPost);
  });

  test('PUT - actualizează o postare', async ({ request }) => {
    const updatedPost = await updatePost(request, 1, {
      title: 'Titlu actualizat',
      body: 'Conținut modificat',
      userId: 1
    });
    console.log('Postare actualizată:', updatedPost);
  });

  test('DELETE - șterge o postare', async ({ request }) => {
    const status = await deletePost(request, 1);
    console.log('Status ștergere:', status);
  });

});
