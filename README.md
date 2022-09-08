# 07-restserver-Node-express
This a rest server with express

# Webserver + restserver

Recordar instalar 

``````
npm i

``````

para reconstruir los módulos de node 

# JWT: Json Web Token

Hacer que el login regrese un JWT. Pero esto no es tan seguro, es muy usado, pero es una autenticación pasiva. Cada uno usa un token y se usa pa validarse. 

La idea es tener una autenticación pasiva. 

Heard

PayLoad -- supervolatil (Nunca usarlo para almacenarlo cosas sensible, es fácil de ver: passwords, ids)

Importante cerrar sesión. 

Validar que el JWT no ha sido alterado. 

Lo usaremos de una manera general: solo grabamos el uuid, para validar la info del backend


# Introducción a los tokens 

Esos numeros seriales que nos llegan al cel. Verificación en dos pasos. 

JWT: usemos un tipo de token diferente. 

¿Por qué usar tokens? 

- Variable de sesión: se cree cuando se autentica. Vive del lado del backend. Lo relaciona con cada uno de los usuarios. Pero hace que los computos no sean eficientes. Después de 10mil user. 

Para eso se usan los Tokens. 

Se divivde en tres partes: 

Header Info del aloritomo encript y el tipo de token

Payload: infromación que queremos que esté en el token, es fácil sacar esa infro

Firma: verifica si el token es valido. Se firma, debe pasar validaciones. 

Este token es para cada pc unico. Si se quieren conectar a Backend. Pedimos token. 
