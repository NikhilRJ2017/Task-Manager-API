# Welcome to Task-Manager-API!

Link to api documentation: https://task-manager-api-18.herokuapp.com/


# Steps to install locally

Before installing npm modules and run the project, create '.env' file to the project with following entries: 

	-MONGO_DB_URI="add value"
	-JWT_SECRET_KEY= "add value"
	-JWT_ALGO="add value"
	-JWT_LIFETIME="add value"
	-PORT="add value" (optional, default is 6000)


Now, add following commands to the project:
>npm install &&
>npm install nodemon -D &&
>npm start

App runs on the port 6000 or else provide port value in .env file
