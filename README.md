# 07-restserver-Node-express: 

This a rest server with express. CRUD. 

# Webserver

Recordar instalar para reconstruir módulos de node: 

``````
npm i

``````
# RestServer o ApiRest o RestFul: 

APP Web en el lado del web. Tenemos unos métodos/rutas que hacen una serie manipulación de datos, lógica, etc. Que puede ser consumido mediante el protocolo HTTP por cualquier tipo de cliente, web, móvil. 

- Logins
- Busquedas
- Almancenaminetos

# Métodos más comunes: 

   - GET: Traer  
   - POST: Crear 
   - PUT: Actualizar
   - DELETE: Borrar 

Normalmente se devuelven los datos mediante XML o JSON, aunque es mejor JSON; pesa menos. 

# ¿Qué es HTTP? 

"Hypertext Transfer Protocol". Es el nombre de un protocolo usado prar realizar peticiones a recursos o servicios. 

# JWT: Json Web Token. Autenticación de NODE con JSON. 

Hacer que el login regrese un JWT. Pero esto no es tan seguro, es muy usado, pero es una autenticación pasiva. Cada uno usa un token y se usa para validar un usuario en un sistema.  

# Introducción a los tokens -> JWT

Ejemplo de uso diario: Esos numeros seriales que nos llegan al cel. "Verificación en dos pasos". Eso es un token. 

JWT: Son un tipo de token, pero un poco diferente. Es un tipo de auth pasiva del lado del cliente. 

# Pregunta del millón: ¿Por qué usar tokens? 

Antes de, entendamos algunos conceptos: 

- Variable de sesión: se cree cuando se autentica. Vive del lado del backend. Lo relaciona con cada uno de los usuarios. Pero hace que los computos no sean eficientes. Después de 10mil users. ¿Qué pasa? Sobre Carga. 

Para eso se usan los Tokens, para ser más optimos. 

Un JWT se divivde en tres partes: 

- Header: Info del aloritomo encript y el tipo de token: JWT

- Payload: Infromación que queremos que esté en el token, es fácil sacar esa info. No guardar información sensible! 

- Firma: verifica si el token es valido. Se firma, debe pasar validaciones. 

Este token es para cada PC unico. Si se quieren conectar a Backend. Pedimos token (Que se da cuándo se hace un login)

Nota: 
El cliente puede ver el token y manipularlo si tiene el conocimiento.
Hay maneras de trabajar con tokens aun sin firma.
Si la firma no coincide, es porque fue manipulado por el user.

# Usos más importantes: 
Podemos manipular la fecha para hacerlo que expire en determinada fecha. 

# Debemos proteger las rutas 
 Solo se puede ejecutar si tiene Json Web Token Válido. Por ejemplo, no se puede permitir que cualquier persona entre a la ruta de borrar usuario. 

 # Introducción a los WEB SOCKETS: 

 {Problemática qué solucionan los Web Sockets: desde un pc (cliente) se hace un petición a un servidor. ¿Y si hay alguna actualización? El servidor por sí solo no le envia la info al cliente (Hasta que se haga una nueva solicitud}. 

¿Cómo funcionan entonces los mensajes privados? El servidor debe enviar notificaciones al servidor al usuario con estos mensajes. Los sockets son eso: *mantener una comunicación cliente servidor*
 
 - ¿Qué son los Web Sockets? 

 Permiten mantener una comunicación ACTIVO ACTIVO entre cliente y servidor. (Se pueden enviar Strings, Bools, Objects...). 

    - Se envita usar peticiones GET constantemente. Porque ahora estas están activas con el servidor y el servidor activos con estos.

 - ¿Para qué sirven los Web Sockets?
 
 Algunas cosas: 

    - Notificaciones cuándo los usuarios se desconectan. Cuando un nuevo usuario se conecta. Cuando un usuario se vuelva a conectar. 
    
    Más importante: *podemos disparar eventos personalizados*

    CHAT: nuevos mensajes
    Garficas: actualizaciones

