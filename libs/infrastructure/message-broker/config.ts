// Configuração isolada, reutilizável
export const rabbitMqConfig = {
  exchanges: [
    {
      name: 'exchange1',
      type: 'topic',
    },
  ],
  uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
  connectionInitOptions: { wait: false },
  channels: {
    'channel-1': {
      prefetchCount: 15,
      default: true,
    },
    'channel-2': {
      prefetchCount: 2,
    },
  },
};
