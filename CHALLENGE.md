Code challenge - Front end

Utilizando la api de Metaweather (https://www.metaweather.com/api/) implementar una sencilla aplicación de Weather forecast.
La aplicación debe contar con: 
Buscador de locaciones. Las sugerencias de locaciones deben desplegarse a medida que el usuario escribe. 
Selector de fechas. Por default, debe estar seleccionada la fecha del día actual.
Una vez que el usuario selecciona una de las opciones disponibles desplegar:
Condiciones climáticas de la fecha seleccionada.
Condiciones climáticas de entre 5 a 10 días posteriores a la fecha seleccionada. Por ejemplo, si se selecciona Londres y fecha 13-Oct-2020, mostrar datos de hasta el 23-Oct-2020 dependiendo de la disponibilidad en la API de Metaweather.
Los datos deben ser recalculados ante cambios de locación o fecha seleccionada.

Consideraciones generales:
Utilizar React.
Evitar el uso de Redux.
Se valora el uso de React Hooks y Typescript.
Tener en cuenta responsive design en la UI.
Hacer uso de Prettier y ESLint aplicando reglas de Airbnb.
Proveer script de ejecución de linter.


Code challenge - Backend

Implementar endpoints de GET, POST, PUT y DELETE para un resource básico `users`. Como resultado, se debe incluir 
Script para ejecutar migrations de sequelize-cli para creación de los esquemas.
Colección Postman que permita ejecutar los endpoints.
Script para ejecutar la aplicación.

Consideraciones generales:
Utilizar Node.
Se puede utilizar algún framework como ser express, koa, hapi.
Utilizar Sequelize como ORM para acceder a la base de datos. 
Utilizar base de datos PostgreSql.
Hacer uso de Prettier y ESLint

Observaciones: se valorarán los tests en ambos challenges :)
