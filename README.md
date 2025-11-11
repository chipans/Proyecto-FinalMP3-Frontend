## Proyeto Final 

# Backend (Laravel)

## Crear el proyecto Laravel en la carpeta Backend:
composer create-project laravel/laravel Backend
cd Backend

## Instalar Laravel Sanctum:

composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider"
php artisan migrate


# Frontend (React)

npx create-react-app frontend
cd Frontend

## Instalar librerías necesarias:
# Axios: Para manejar las peticiones HTTP.
# React Router: Para manejar las rutas (/login, /dashboard).

npm install axios react-router-dom

### 🚀 1. Levantar el Backend (Laravel) 
## /// Laravel development server started: http://127.0.0.1:8000

cd Backend
php artisan serve

### 🖥️ 2. Levantar el Frontend (React)
## /// React serve started: http://localhost:3000

cd frontend
npm start# Proyecto-FinalMP3-Frontend
