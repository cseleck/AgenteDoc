'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al obtener respuesta');
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error.message}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-500 mb-4 shadow-2xl">
            <span className="text-4xl">🤖</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 drop-shadow-lg">
            AI Axiom
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light">
            Powered by <span className="font-semibold">CAT-industry</span>
          </p>
        </div>
        
        {/* Chat Container */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] md:h-[600px] overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
                <div className="bg-gradient-to-tr from-white/20 to-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/30 shadow-xl max-w-md">
                  <div className="text-6xl mb-4">👋</div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    ¡Hola! Bienvenido
                  </h2>
                  <p className="text-white/80 text-base md:text-lg">
                    Soy tu asistente inteligente. Pregúntame lo que quieras y te ayudaré con gusto.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    } animate-slide-up`}
                  >
                    <div
                      className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 md:p-5 shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                          : 'bg-white/95 backdrop-blur-lg text-gray-800 border border-white/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
                          message.role === 'user' 
                            ? 'bg-white/20' 
                            : 'bg-gradient-to-tr from-purple-400 to-pink-400'
                        }`}>
                          {message.role === 'user' ? '👤' : '🤖'}
                        </div>
                        <p className="whitespace-pre-wrap leading-relaxed flex-1 pt-1">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start animate-slide-up">
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-lg border border-white/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center text-lg">
                          🤖
                        </div>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          {/* Input Area */}
          <div className="p-4 md:p-6 bg-white/5 backdrop-blur-md border-t border-white/10">
            <form onSubmit={sendMessage} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="w-full rounded-2xl bg-white/90 backdrop-blur-lg border-2 border-white/30 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-gray-800 placeholder-gray-500 shadow-lg transition-all"
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold px-6 md:px-8 py-4 rounded-2xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-xl disabled:cursor-not-allowed"
              >
                <span className="hidden md:inline">
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </span>
                <span className="md:hidden text-xl">
                  {isLoading ? '⏳' : '➤'}
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 animate-fade-in">
          <p className="text-white/70 text-sm md:text-base font-light">
            Agente especializado en resolución de problemas y optimización lógica. Diseñado para transformar desafíos complejos en soluciones claras y accionables.
          </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </main>
  );
}

// System Prompt Customization
// Nombre del Agente: Axiom
// Rol: Especialista Senior en Resolución de Problemas y Estrategia Lógica.
// Objetivo Principal: Ayudar al usuario a identificar la raíz de cualquier problema y proponer soluciones estructuradas, eficientes y técnicamente viables.
// Directrices de Comportamiento:
// 1. Análisis antes de la Respuesta: Antes de dar una solución, desglosa el problema internamente para asegurar que cubres todos los ángulos.
// 2. Claridad y Precisión: Evita el lenguaje ambiguo. Sé directo, profesional y utiliza un tono de colaboración experta.
// 3. Estructura: Utiliza listas, pasos o viñetas para que la información sea fácil de digerir.
// 4. Pensamiento Crítico: Si el usuario plantea una premisa errónea, corrígela amablemente explicando el porqué lógico.
// 5. Accionabilidad: Cada respuesta debe concluir con un paso sugerido o una solución clara, no solo teoría.
// Restricciones:
// - No divagues en saludos excesivamente largos.
// - Prioriza la utilidad sobre la cortesía exagerada.
// - Si un problema es demasiado complejo, solicita los datos faltantes antes de intentar adivinar.
