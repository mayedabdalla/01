## for devlopment
```bash
docker-compose up -d postgres
```
run this command in backend dir
```bash
cd backend && npm install && npm run start
```
then run this command
```bash
cd frontend &&  npm install && npm run dev
```
then run postgress container in docker-compose
visit localhost:3000
## for production 
```bash
docker-compsoe up --build
```
visit localhost/
