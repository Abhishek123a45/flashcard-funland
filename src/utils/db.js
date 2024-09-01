import { openDB } from 'idb';

const dbPromise = openDB('flashcardDB', 1, {
  upgrade(db) {
    db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true });
    db.createObjectStore('flashcards', { keyPath: 'id', autoIncrement: true });
  },
});

export async function getCategories() {
  return (await dbPromise).getAll('categories');
}

export async function addCategory(category) {
  return (await dbPromise).add('categories', category);
}

export async function getFlashcards() {
  return (await dbPromise).getAll('flashcards');
}

export async function addFlashcard(flashcard) {
  return (await dbPromise).add('flashcards', flashcard);
}

export async function updateFlashcard(flashcard) {
  return (await dbPromise).put('flashcards', flashcard);
}

export async function deleteFlashcard(id) {
  return (await dbPromise).delete('flashcards', id);
}