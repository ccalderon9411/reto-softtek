import { model } from 'dynamoose';
import { PersonaSchema } from '../schemas/persona.schema';

export const PersonaModel = model('Persona', PersonaSchema);
