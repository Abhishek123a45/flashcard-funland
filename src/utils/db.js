import { openDB } from 'idb';

// Open the IndexedDB database and create object stores if they don't exist
const dbPromise = openDB('flashcardDB', 1, {
  upgrade(db) {
    // Ensure that object stores are created only if they don't exist
    if (!db.objectStoreNames.contains('categories')) {
      db.createObjectStore('categories', { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains('flashcards')) {
      db.createObjectStore('flashcards', { keyPath: 'id', autoIncrement: true });
    }
  },
});

// Get all categories
export async function getCategories() {
  try {
    const db = await dbPromise;
    return await db.getAll('categories');
  } catch (error) {
    console.error('Failed to get categories:', error);
    throw error;
  }
}

// Add a new category
export async function addCategory(category) {
  try {
    const db = await dbPromise;
    const id = await db.add('categories', { name: category });
    return { id, name: category };
  } catch (error) {
    console.error('Failed to add category:', error);
    throw error;
  }
}

// Get all flashcards
export async function getFlashcards() {
  try {
    const db = await dbPromise;
    return await db.getAll('flashcards');
  } catch (error) {
    console.error('Failed to get flashcards:', error);
    throw error;
  }
}

// Add a new flashcard
export async function addFlashcard(flashcard) {
  try {
    const db = await dbPromise;
    const id = await db.add('flashcards', flashcard);
    return { id, ...flashcard };
  } catch (error) {
    console.error('Failed to add flashcard:', error);
    throw error;
  }
}

// Update an existing flashcard
export async function updateFlashcard(flashcard) {
  try {
    const db = await dbPromise;
    await db.put('flashcards', flashcard);
    return flashcard;
  } catch (error) {
    console.error('Failed to update flashcard:', error);
    throw error;
  }
}

// Delete a flashcard by ID
export async function deleteFlashcard(id) {
  try {
    const db = await dbPromise;
    await db.delete('flashcards', id);
    return id;
  } catch (error) {
    console.error('Failed to delete flashcard:', error);
    throw error;
  }
}