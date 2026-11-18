const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'HTML5',
  'CSS3',
  'CSS Modules',
  'styled-components',
  'MobX',
  'Zustand',
  'Redux',
  'Jest',
  'Playwright',
  'Vite',
  'Webpack',
  'FSD',
  'Node.js',
  'REST API',
  'Websockets',
  'Git',
  'Docker',
  'Nginx',
  'Архитектурные паттерны',
  'ООП',
  'Next.js',
  'Frontend',
  'React.js',
  'Разработка ПО',
  'CI/CD',
  'NestJS',
  'Golang',
];

export const PROFILE = {
  email: 'kv.melnikov@bk.ru',
  firstName: 'Константин',
  lastName: 'Мельников',
  urls: [
    'https://github.com/M-kos?tab=repositories',
    'https://www.linkedin.com/in/konstantin-melnikov-frontend-developer/',
  ],
  description:
    'Senior frontend разработчик с 6+ годами опыта разработки сложных веб-приложений.\nОсновная специализация — React и TypeScript, архитектура frontend-приложений и\nпостроение масштабируемых интерфейсов. Имею опыт разработки систем с высокой\nнагрузкой и сложной бизнес-логикой.\nАктивно участвую в проектировании архитектуры, принимаю технические решения и\nпровожу code review. Уделяю большое внимание качеству кода, покрытию тестами и\nподдерживаемости системы.',
  experience: [
    {
      achievements: [
        'Инициировал переход на FSD и внедрение кодогенерации.',
        'Настроил HTTP-кэширование статических ресурсов через Nginx, сократив время загрузки приложения на 20–40% по ключевым метрикам.',
      ],
      company: 'Бюро 1440',
      endDate: '2026-09-30T00:00:00.000Z',
      position: 'Senior Frontend разработчик',
      startDate: '2026-06-25T00:00:00.000Z',
    },
    {
      achievements: [
        'Инициировал и реализовал рефакторинг frontend-архитектуры',
        'Реализовал проксирование API через Nginx',
      ],
      company: 'Primo RPA',
      endDate: '2026-04-10T00:00:00.000Z',
      position: 'Senior Frontend разработчик',
      startDate: '2025-02-17T00:00:00.000Z',
    },
    {
      achievements: [
        'Спроектировал и разработал сложную, динамическую форму для заказа приложений',
        'Разрабатывал функциональность VK Cloud Marketplace',
      ],
      company: 'VK Cloud',
      endDate: '2024-12-06T00:00:00.000Z',
      position: 'Senior Frontend разработчик',
      startDate: '2022-10-24T00:00:00.000Z',
    },
  ],
  projects: [
    {
      name: 'VK Cloud',
      url: 'https://cloud.vk.ru/',
    },
  ],
  skills: skills.map((s) => ({ name: s })),
};
