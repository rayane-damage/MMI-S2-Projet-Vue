import PocketBase from 'pocketbase'

// export const pb = new PocketBase(import.meta.env.VITE_URL_POCKETBASE) as TypedPocketBase
// export const pb = new PocketBase('http://127.0.0.1:8090');
export const pb = new PocketBase('https://to-gather.mathisliegeon.fr:443');
// Copier ici les fonctions developpées en R214 | Système d'information
// export const userData = await pb.collection('users').getFullList();