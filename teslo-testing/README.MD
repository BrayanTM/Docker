# Digital Ocean DB

### Habilitar el esquema público para nuestro nuevo usuario

#### Desde el usuario administrador (default)

```
ALTER DATABASE "teslodb" OWNER TO "teslo-user";
GRANT ALL ON SCHEMA public TO "teslo-user";
```