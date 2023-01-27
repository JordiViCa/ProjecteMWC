# ProjecteMWC

## FRONTEND

Versió node: 16.14.2

Versió Angula CLI: 13.1.4

Versió npm: 8.3.0

Versió Angular: 13.1.3

# Crides FRONTEND -> BACKEND

Client = Usuari normal

Admin = Treballador

Dades amb format json



> ### Crida get usuari actual
> Crida que retorna totes les dades de l'usuari actual
ruta: /current-user
Se li ha de pasar el token generat en el login per el header

> ### Crida get usuaris clients
> Crida que retorni llistat de noms de tots els clients
ruta: /client/llistar

> ### Crida post per registrar usuari
> Crida que registre usuari
ruta: /register/usuari
L'usuari pot ser client o admin

> ### Crida post per donar de baixa client
> Crida post que dona de baixa un client


> ### Crida per token al fer login
> Crida que retorna un token si login ok, sino retorna un string vuit
ruta: /login/usuari
L'usuari pot ser client o admin

> ### Crida check token actual
> Crida que verifica que el token actual es valid, retorna bool


> ### Crida get info client concret
> Crida que retorna tota la info d'un client concret


> ### TODO: Mirar com fer chatbox
> S'ha de mirar com funciona un chatbox i que es necesita


> ### Crida put upload document client
> Crida put per pujar x document


> ### Crida put per editar dades client
> Crida put que modifica les dades del client
