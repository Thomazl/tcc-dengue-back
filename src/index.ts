import express, { Request, Response } from 'express';
import * as firebaseAdmin from 'firebase-admin';
import * as serviceAccount from '../config/firebase-connect.json'; // Credenciais do Firebase

// Inicializando o Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount as firebaseAdmin.ServiceAccount),
});

// Inicializando o Firestore
const db = firebaseAdmin.firestore();

// Inicializando o Express
const server = express();
server.use(express.json()); // Para trabalhar com JSON

// Modelo de dados
interface UserInfo {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  idade: number;
  endereco: string;
  receberEmail: boolean;
}

// Validação simples (opcional, mas recomendado)
const validateUserInfo = (data: any): data is UserInfo => {
  return (
    typeof data.nome === 'string' &&
    typeof data.email === 'string' &&
    typeof data.telefone === 'string' &&
    typeof data.cpf === 'string' &&
    typeof data.idade === 'number' &&
    typeof data.endereco === 'string' &&
    typeof data.receberEmail === 'boolean'
  );
};

// Endpoint para salvar informações do usuário no Firestore
server.post('/save-user', async (req: Request, res: Response): Promise<Response> => {
  cconst userInfo = req.body;

  // Validação simples
  if (!validateUserInfo(userInfo)) {
    return res.status(400).json({ message: 'Dados inválidos!' });
  }

  try {
    // Salvando no Firestore
    const docRef = await db.collection('users').add(userInfo);
    
    // Retorna o ID do documento salvo
    return res.status(201).json({ message: 'Usuário salvo com sucesso!', docId: docRef.id });
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return res.status(500).json({ message: 'Erro interno ao salvar o usuário.' });
  }
});

// Iniciando o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
