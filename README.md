--Дерево проекта--
my-app/
├── backend/                    # Серверная часть (Node.js + Express + MSSQL)
│   ├── controllers/            # Логика обработки запросов (Controller)
│   │   └── clientController.js
│   ├── models/                 # Модели и работа с БД
│   │   └── clientModel.js
│   ├── routes/                 # API маршруты
│   │   └── clientRoutes.js
│   ├── config/                 # Конфигурации
│   │   └── db.js               # Подключение к MSSQL
│   ├── middlewares/           # (по желанию) логгеры, обработчики ошибок
│   │   └── errorHandler.js
│   ├── app.js                  # Точка входа Express-приложения
│   └── server.js               # Запуск сервера
│
├── frontend/                  # Клиентская часть (Vue.js)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/            # Стили, изображения и т.п.
│   │   ├── components/        # Повторно используемые компоненты
│   │   │   └── ClientList.vue
│   │   ├── views/             # Основные страницы
│   │   │   └── Home.vue
│   │   ├── router/            # Vue Router
│   │   │   └── index.js
│   │   ├── store/             # Vuex или Pinia (если используется)
│   │   │   └── clientStore.js
│   │   ├── App.vue
│   │   └── main.js
│   └── vite.config.js         # (если Vite) или vue.config.js
│
├── .env                       # Переменные окружения
├── .gitignore
├── package.json               # Корневой (можно использовать монорепу или отдельно для backend/frontend)
└── README.md
