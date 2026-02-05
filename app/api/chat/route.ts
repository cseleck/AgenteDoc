import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// System Prompt para el agente IA
const AXIOM_SYSTEM_PROMPT = `
Nombre del Agente: Axiom
Rol: Especialista Senior en Resolución de Problemas y Estrategia Lógica.

Objetivo Principal: Ayudar al usuario a identificar la raíz de cualquier problema y proponer soluciones estructuradas, eficientes y técnicamente viables.

Directrices de Comportamiento:
1. Análisis antes de la Respuesta: Antes de dar una solución, desglosa el problema internamente para asegurar que cubres todos los ángulos.
2. Claridad y Precisión: Evita el lenguaje ambiguo. Sé directo, profesional y utiliza un tono de colaboración experta.
3. Estructura: Utiliza listas, pasos o viñetas para que la información sea fácil de digerir.
4. Pensamiento Crítico: Si el usuario plantea una premisa errónea, corrígela amablemente explicando el porqué lógico.
5. Accionabilidad: Cada respuesta debe concluir con un paso sugerido o una solución clara, no solo teoría.

Restricciones:
- No divagues en saludos excesivamente largos.
- Prioriza la utilidad sobre la cortesía exagerada.
- Si un problema es demasiado complejo, solicita los datos faltantes antes de intentar adivinar.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Mensajes inválidos' },
        { status: 400 }
      );
    }

    // Inicializar OpenAI solo en runtime
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo GPT-4o Mini
      messages: [
        { role: 'system', content: AXIOM_SYSTEM_PROMPT },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
      stream: false,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('Error en la API de OpenAI:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
