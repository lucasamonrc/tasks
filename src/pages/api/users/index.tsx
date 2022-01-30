import { NextApiHandler } from 'next';
import { hash } from 'bcrypt';

import supabase from '../../../services/supabase';

const handler: NextApiHandler = async (request, response) => {
  if (request.method !== 'POST') {
    return response.status(400).json({ status: 'error', message: 'method not allowed' });
  }

  const { name, email, password } = request.body;

  try {
    const { data: existingUser } = await supabase.from('users').select('*').eq('email', email).single();

    if (existingUser) {
      return response.status(400).json({ status: 'error', message: 'this email is already registered' });
    }

    const hashedPassword = await hash(password, 10);

    const { data: user, error: createError } = await supabase
      .from('users')
      .insert({ name, email, password: hashedPassword })
      .single();

    if (createError) {
      console.error('create error:');
      throw createError;
    }

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    console.error(err);
    return response.status(500).json({ status: 'error', message: 'server error' });
  }
}


export default handler;
