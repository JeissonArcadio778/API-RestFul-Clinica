# API REST: sistema de gestión de historias clinicas. 

Este repositorio almacena la solución del reto planteado por Heippi. 

# Funcionamiento en general y puntos importantes: 

Este sistema permite a distintos roles realizar distintas operaciones a seis tipos de objetos que componen la idea del negocio de las Historias Clinicas (HC); estos objestos son:  

    - User: contiene la información personal de un usuario mientras está sujeto una EPS en particular y un ROLE.
    
    - Roles: pueden ser colecciones de usuarios. Estos son: PATIENT, DOCTOR, NURSE, ADMIN. (Cada uno de estos cuenta con permisos distintos a cada operación del sistema).
    
    - EPS: pueden contener distintos tipos de roles. 

    - Specialty: es la especialidad de que tiene cada tipo de HC.  

    - Historia Clinica:  es compuesta por la información del cada tipo de *Specialty* dentro de la clinica. Esta está sujeta a dos roles: PATIENT y DOCTOR. 

## Search: sistema de busquedas por expresiones regulares.

Este sistema conecta el resto de operaciones dentro de la lógica del negocio. Por ejemplo, permite buscar por HC y Specialty, HC y PATIENT, HC y DOCTOR; buscar por correo/ entre Users, entre otros, y todo desde una misma URL. Esto se basa en la busqueda por collection y parameter de sistemas de producción reales. 


# ¿Cómo estás organizado el proyecto? 

Este sistema hace uso de clases y objetos de manera continua, puesto que permite orquestar todo un sistema orientado a la creación y adición de módulos en el mismo. 


# Sintaxis para probar todo el sistema. 

### Creación del primer User Patient: 

Antes de ello, debemos preparar las entidades externas que están implicadas en la operación, tales como roles, EPSs y Specialties para la Medical History. (Ya están preparados dentro de la base de datos, sin emabargo, si desean probar sus respectivos CRUDs, al finalizar les dejaré las instrucciones). 

1. Login: 

Usaremos el token, que es de arquitectura JWT, para la autorización a operaciónes como crear, actualizar y borrar. 

URL: {{url}}/api/auth/login
Método:  POST
```
//request: 

    {
        "email" : "admin1@test.com",
        "password": "123456"
    }

// response:

    {
        "message": "Welcome!!!",
        "userValidations": {
            "cedula": 1000443777,
            "email": "admin1@test.com",
            "role": "ADMIN",
            "status": true
    },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjZWR1bGEiOiIxMDAwNDQzNzc3IiwiaWF0IjoxNjc3NDU5MTU1LCJleHAiOjE2Nzc4OTExNTV9.MC58Svm3sZBVO6W-XzW6Smdo22tBheNhHcWqxSqW8Fw"
}

```
(Despues de creados roles, EPSs, y Specialties)


2. Creación de usuario: 

Usuario a crear HC: Coronel "Aureliano Buendía"

URL: {{url}}/api/users
Método: POST
Header: xtoken :  eyJhbGciOiJIUzI1N...

```
//request: 

    {
        "first_name": "Aureliano",
        "last_name": "Buendia",
        "cedula": "1000777",
        "email" : "test4@test.com", 
        "password": "123456",
        "age": 50,
        "date_of_birth": "2002-05-25",
        "marital_status": "Single",
        "occupation" : "Coronel",
        "gender": "Male",
        "nationality" : "Macondiano",
        "address" : "La casa de Remedios. Macondo",
        "role": "PATIENT",
        "status": true, 
        "eps" : "SISBEN"
    }
// response:

    {
        "message": "New User Created in the DB",

        "New User": {
            "cedula": "1000777",
            "first_name": "Aureliano",
            "last_name": "Buendia",
            "age": 50,
            "date_of_birth": "2002-05-25",
            "marital_status": "Single",
            "occupation": "Coronel",
            "gender": "Male",
            "nationality": "Macondiano",
            "address": "Avenida 35 #55- 78. Macondo",
            "email": "coronelito17@test.com",
            "role": "PATIENT",
            "status": true,
            "eps": "SISBEN"
    }
}
}

```


*Nota*: La '_id' de eps es su propio nombre es mayusculas, eso es debido a la naturaleza del reto. Enseñar eficiencia. Esto también sucede con el usuario, la llave definida para este su propia cédula.

3. Creación de la Medical History: 

URL: {{url}}/api/medical_history
Método: POST
Header: xtoken :  eyJhbGciOiJIUzI1N...

```
//request: 

    {
        "user": "1000777", 
        "specialty": "ANESTHESIOLOGY",
        "reason_for_hospitalization": "Anestesia. Y fuertes dolores de debajo de la axila.",
        "current_disease": " Paciente femenino (de 50 años de edad) sin antecedentes. Es tramitado a cirgua",
        "personal_history": [{
            "habits": "Señala que cada 15 días toma alcohol (copas de vino o tragos de whisky) en reuniones sociales, entre amigos o familiares. Específicamente los fines de semana",
            "smoker": "Niega. No es fumador, ni lo fue en la adolescencia. Indica que nunca le ha llamado la atención unirse a vicios. ",
            "drugs": "Niega consumo"
        }],
        "physiological_habits" : [
            {
                "feeding": "Realiza las 3 comidas diarias (desayuno, almuerzo y cena) una sola merienda, por la tarde",
                "sleep": "sufre de insomnio, ocasionalmente",
                "exercise" : "practica como deporte fútbol de campo y fútbol sala, desde los 10 años de edad. Por lo tanto, ha sido un deportista activo. Actualmente enseña a un grupo de niños en una escuela especializada y en campamentos durante las vacaciones escolares.",
                "allergies": "Informa que es alérgico al polvo. Presenta estornudos recurrentes cuando limpian a su alrededor o arregla su closet de ropa personal. "
            }
        ],
        "family_history": "Padre: Falleció hace 10 años por la enfermedad cáncer de colon. Padeció unos 3 años con la misma",
        "consultation_findings": "Se le enviaron examenes médicos como gastronolosé",
        "medical_orders": "Insulina 300gr por 7 dias. Reposo. ",
        "status": true
    }
   
// response:

    {
        "message": "Medical History Created",
        "New medical history": {
            "uid": "63fc0737be604236f61c9686",
            "user": "1000777",
            "specialty": "ANESTHESIOLOGY",
            "doctor": "1000443777",
            "reason_for_hospitalization": "Anestesia. Y fuertes dolores de debajo de la axila.",
            "current_disease": " Paciente femenino (de 50 años de edad) sin antecedentes. Es tramitado a cirgua",
            "family_history": "Padre: Falleció hace 10 años por la enfermedad cáncer de colon. Padeció unos 3 años con la misma",
            "personal_history": [
                {
                    "habits": "Señala que cada 15 días toma alcohol (copas de vino o tragos de whisky) en reuniones sociales, entre amigos o familiares. Específicamente los fines de semana",
                    "smoker": "Niega. No es fumador, ni lo fue en la adolescencia. Indica que nunca le ha llamado la atención unirse a vicios. ",
                    "drugs": "Niega consumo",
                    "_id": "63fc0737be604236f61c9687"
                }
            ],
            "physiological_habits": [
                {
                    "feeding": "Realiza las 3 comidas diarias (desayuno, almuerzo y cena) una sola merienda, por la tarde",
                    "sleep": "sufre de insomnio, ocasionalmente",
                    "exercise": "practica como deporte fútbol de campo y fútbol sala, desde los 10 años de edad. Por lo tanto, ha sido un deportista activo. Actualmente enseña a un grupo de niños en una escuela especializada y en campamentos durante las vacaciones escolares.",
                    "allergies": "Informa que es alérgico al polvo. Presenta estornudos recurrentes cuando limpian a su alrededor o arregla su closet de ropa personal. ",
                    "_id": "63fc0737be604236f61c9688"
                }
            ],
            "consultation_findings": "Se le enviaron examenes médicos como gastronolosé",
            "medical_orders": "Insulina 300gr por 7 dias. Reposo. ",
            "physical_test": [],
            "laboratory_exams": [],
            "createdAt": "2023-02-27T01:28:23.047Z",
            "updatedAt": "2023-02-27T01:28:23.047Z"
        }
    }

```

4. Busqueda por _id de Medical History: 

URL: {{url}}/api/medical_history/63fbd907ff1fd51105d17e45
Método: GET

```
// Response 

{
            "uid": "63fc0737be604236f61c9686",
            "user": {
                "_id": "1000777",
                "cedula": 1000777,
                "first_name": "Aureliano",
                "last_name": "Buendia",
                "age": 50,
                "date_of_birth": "2002-05-25",
                "marital_status": "Single",
                "occupation": "Coronel",
                "gender": "Male",
                "nationality": "Macondiano",
                "address": "Avenida 35 #55- 78. Macondo",
                "email": "coronelito17@test.com",
                "password": "$2a$10$3B7xOCeiumK/agXtEkB/QujHayiWBQPChskPmRfEy3/Hb2lFYriui",
                "role": "PATIENT",
                "status": true,
                "eps": "SISBEN"
            },
            "specialty": {
                "_id": "ANESTHESIOLOGY",
                "status": true
            },
            "doctor": {
                "_id": "1000443777",
                "email": "admin1@test.com",
                "status": true
            },
            "reason_for_hospitalization": "Anestesia. Y fuertes dolores de debajo de la axila.",
            "current_disease": " Paciente femenino (de 50 años de edad) sin antecedentes. Es tramitado a cirgua",
            "family_history": "Padre: Falleció hace 10 años por la enfermedad cáncer de colon. Padeció unos 3 años con la misma",
            "personal_history": [
                {
                    "habits": "Señala que cada 15 días toma alcohol (copas de vino o tragos de whisky) en reuniones sociales, entre amigos o familiares. Específicamente los fines de semana",
                    "smoker": "Niega. No es fumador, ni lo fue en la adolescencia. Indica que nunca le ha llamado la atención unirse a vicios. ",
                    "drugs": "Niega consumo",
                    "_id": "63fc0737be604236f61c9687"
                }
            ],
            "physiological_habits": [
                {
                    "feeding": "Realiza las 3 comidas diarias (desayuno, almuerzo y cena) una sola merienda, por la tarde",
                    "sleep": "sufre de insomnio, ocasionalmente",
                    "exercise": "practica como deporte fútbol de campo y fútbol sala, desde los 10 años de edad. Por lo tanto, ha sido un deportista activo. Actualmente enseña a un grupo de niños en una escuela especializada y en campamentos durante las vacaciones escolares.",
                    "allergies": "Informa que es alérgico al polvo. Presenta estornudos recurrentes cuando limpian a su alrededor o arregla su closet de ropa personal. ",
                    "_id": "63fc0737be604236f61c9688"
                }
            ],
            "consultation_findings": "Se le enviaron examenes médicos como gastronolosé",
            "medical_orders": "Insulina 300gr por 7 dias. Reposo. ",
            "physical_test": [],
            "laboratory_exams": [],
            "createdAt": "2023-02-27T01:28:23.047Z",
            "updatedAt": "2023-02-27T01:28:23.047Z"
        }
    ]
}

```

(Aquí es el mismo proceso, sé pueden actualizar, consultar y eliminar las HC)

5. Consulta por una única URL: 

Como mencioné en los fundamentos aquí se pueden hacer busquedas de varias maneras: 
URL: {{url}}/api/search/medical_history/1000777 (documento Doctor/ type of Specialty) 
Método: GET

```
//Response

(Mismo reponse del punto 4)

```

Muchas, muchas gracias por la oportunidad. Sé que ya me pasé en tiempo, pero lo que me he divertido y aprendido haciendo este proyecto es más que suficiente para tener en calma en alma =)

# Anexo: 

Enviaré un documento con todos los endpoints a probar, en estos no solo encontraran data lista para usar sino todo bien organizado para su fácil uso. 

