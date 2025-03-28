export const Messages = {
    Server: {
        Success: "Servidor encendido en el puerto",
        Error: "Error en el servidor.",
        NotKey: "Api key invalida."
    },
    Index: {
        Success: "API Conectada.",
        Error: "API Error."
    },
    Auth: {
        Login: {
            NotFound: "Usuario no existe.",
            Unauthorized: "Contraseña incorrecta.",
            Success: "Inicio de sesión exitoso.",
            Error: "Error al iniciar sesión."
        },
        Register: {
            UsernameUnique: "El nombre de usuario ya está registrado.",
            Success: "Registro exitoso.",
            Error: "Error al registrar el usuario."
        }
    },
    Token: {
        CreateTokenSuccess: "Tokens creados.",
        CreateTokenError: "Error al crear los tokens.",
        NoAuthorizationHeader: "Header autorizado no encontrado.",
        NoAuthorization: "No autorizado.",
        Validate: "Información autorizada.",
        Invalid: "Token invalido.",
    },
    Database: {
        ConnectionSuccess: "Conexión a la BD exitosa.",
        ConnectionError: "Conexión a la BD fallida.",
    },
    Validation: {
        Key: "Api key invalida.",
        Common: {
            FieldRequired: "Algunos de los campos es nulo.",
        },
        Login: {
            InvalidUsernameFormat: "El formato del nombre de usuario es incorrecto.",
            PasswordLength: "La contraseña no cumple con las longitudes."
        },
        Register: {
            UsernameFormat: "El nombre de usuario debe tener de 5 a 10 caracteres, mínimo 1 mayúscula y 2 números (No aceptan caracteres especiales ni espacios).",
            PasswordFormat: "La contraseña debe tener de 7 a 15 caracteres, mínimo 1 mayúscula, 1 número y 1 carácter especial (No espacios).",
            NameFormat: "El nombre solo acepta letras en mayúsculas o minúsculas, entre 3 a 30 caracteres (Si acepta espacios).",
            LastnameFormat: "El apellido solo acepta letras en mayúsculas o minúsculas, entre 3 a 30 caracteres (Si acepta espacios)."
        }
    }
};

export const MessagesStatus = {
    OK: "OK",
    ERROR: "ERROR",
    INVALIDATED: "INVALIDATED",
    UNAUTHORIZED: "UNAUTHORIZED",
    NOTFOUND: "NOTFOUND",
    FORBIDDEN: "FORBIDDEN",
    NOTJWTACCESS: "NOTJWTACCESS",
    NOTHEADERAUTH: "NOTHEADERAUTH",
    INFOSUCCESS: "INFOSUCCESS",
    INFOPLUSSUCCESS: "INFOPLUSSUCCESS",
    NOTJWTREFRESH: "NOTJWTREFRESH",
    NOTCREDENTIALS: "NOTCREDENTIALS"
}