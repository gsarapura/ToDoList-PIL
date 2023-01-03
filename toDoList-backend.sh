#!/bin/bash
sudo xampp start
source ~/repos/ToDoList-PIL/env/bin/activate
cd ~/repos/ToDoList-PIL/backend/
python manage.py runserver
