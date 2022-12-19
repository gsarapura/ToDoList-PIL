# ToDoList-PIL

## Back 
- Base de datos MariaDB.

### Requerimientos:
- Python >=3.10: https://www.python.org/
Asegurarse de que esté en PATH.
- Pip: https://pip.pypa.io/en/stable/installation/
Sea la instalación por ensurepip o get-pip.py, asegurarse de que pip esté en PATH.
- mysqlclient: https://pypi.org/project/mysqlclient/
- Xampp o cualquier otro administrador de bases de datos relacionales: https://www.apachefriends.org/download.html
### Paso previo:
- Asegurarse de importar "todolist.sql" (carpeta: backend) o crear una.
### Instalación local:
- Clonar repositorio:
``` sh
git clone https://github.com/gustavolens/ToDoList-PIL.git 
```
- Dentro de la carpeta, crear entorno virtual:
``` sh
python -m venv env 
```
- Activar el entorno virtual (Linux):
``` sh
source env/bin/activate 
``` 
- Activar el entorno virtual (Windows):
``` sh
env\Scripts\activate 
```
- Ingresar a la carpeta backend e instalar dependencias:
``` sh
pip install -r requirements.txt 
``` 
### Ejecutar proyecto:
- Antes, modificar archivo settings.py, configurar acorde a usuario, contraseña y nombre de BD:
- Realizar migraciones de modelos:
``` sh
python manage.py migrate
``` 
- Luego, ejecutar Django:
``` sh
python manage.py runserver
``` 

## Front

### Requerimientos:
- Nodejs (se recomienda nvm): https://nodejs.dev/en/
### Proyecto creado con React + Vite:
``` sh
npm create vite@latest
```
## Framework CSS:
- Bootstrap 5: https://getbootstrap.com/
### Bibliotecas:
- Axios para trabajar apis: https://axios-http.com/
- React Router para enrutamiento: https://reactrouter.com/en/main
### Instalación local:
- Ir a la carpeta front y ejecutar:
``` sh
npm install 
```
### Ejecutar proyecto:
``` sh
npm run dev 
```
