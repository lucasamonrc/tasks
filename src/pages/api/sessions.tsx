import { NextApiHandler } from 'next';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import supabase from '../../services/supabase';

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(400).json({ status: 'error', message: 'method not allowed' });
  }

  const { email, password } = request.body;

  const { data: user } = await supabase.from('users').select('*').eq('email', email).single();

  if (!user) {
    return response.status(400).json({ status: 'error', message: 'Invalid email or password' });
  }

  const match = await compare(password, user.password);

  if (!match) {
    return response.status(400).json({ status: 'error', message: 'Invalid email or password' });
  }

  const token = sign(user, process.env.JWT_SECRET as string, {
    subject: user.id,
    expiresIn: '7 days',
  });

  return response.status(200).json({ token });
}


export default handler;
