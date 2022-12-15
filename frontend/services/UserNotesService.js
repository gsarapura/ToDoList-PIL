import axios from 'axios';

export async function getUserNotes() {
  try {
    const response = await axios.get('http://localhost:8000/note/note-user/1/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

