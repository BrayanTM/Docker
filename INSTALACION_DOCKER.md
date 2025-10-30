# Instalación de Docker

## Docker Engine
1. Preparar el repositorio `apt` de Docker
	```bash
	# Add Docker's official GPG key:
	sudo apt-get update
	sudo apt-get install ca-certificates curl
	sudo install -m 0755 -d /etc/apt/keyrings
	sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
	sudo chmod a+r /etc/apt/keyrings/docker.asc

	# Add the repository to Apt sources:
	echo \
  	"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  	$(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  	sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
	sudo apt-get update
	```

2. Instalar el paquete de Docker
	```bash
	sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
	```

3.  Verificar la instalación de Docker
	```bash
	docker --version
	sudo docker run hello-world
	```

## Docker Build

1. Instalar Docker Build como Pluggin
   ```bash
	sudo apt update
	sudo apt install docker-buildx-plugin -y
   ```
2. Verificar la Instalación
   ```bash
   docker buildx version
   ```

## Docker Compose

1. Instalar Docker Compose como Plugin
   ```bash
   sudo apt install docker-compose-plugin -y
   ```
3. Verificar la instalación
   ```bash
   docker compose version
   ```

## Configurar Compose sin `sudo`

1. Permitir Docker sin `sudo`
   ```bash
	sudo usermod -aG docker $USER
	newgrp docker
   ```
3. Verificar
   ```bash
   docker run hello-world
   ```

## Iniciar sesión con Docker Desktop para Linux
> Docker Desktop para Linux almacena `pass` las credenciales en archivos cifrados con `GPG`. Antes de iniciar sesión en Docker Desktop con su ID de Docker , debe inicializar `[nombre de la cuenta pass]`. Docker Desktop muestra una advertencia si passno está configurado.

1. **Generar una clave GPG.** Puede inicializar la contraseña usando una clave GPG. Para generar una clave GPG, ejecute:
	```bash
 	gpg --generate-key
	```
	Ingrese su nombre y correo electrónico una vez que se le solicite.

	Una vez confirmado, GPG crea un par de claves. Busque la publínea que contiene su ID de GPG, por ejemplo:
	```bash
	...
	pubrsa3072 2022-03-31 [SC] [expires: 2024-03-30]
 	3ABCD1234EF56G78
	uid          Molly <molly@example.com>
	```

2. Copia el ID de GPG y úsalo para inicializarpass
	```bash
 	pass init <your_generated_gpg-id_public_key>
 	```

	Debería ver un resultado similar a este:

	```bash
	mkdir: created directory '/home/molly/.password-store/'
	Password store initialized for <generated_gpg-id_public_key>
	````

Una vez inicializado pass, puede iniciar sesión y extraer sus imágenes privadas. Cuando Docker CLI o Docker Desktop usan credenciales, es posible que se le solicite la contraseña que configuró durante la generación de la clave GPG.

```bash
docker pull molly/privateimage
Using default tag: latest
latest: Pulling from molly/privateimage
3b9cc81c3203: Pull complete 
Digest: sha256:3c6b73ce467f04d4897d7a7439782721fd28ec9bf62ea2ad9e81a5fb7fb3ff96
Status: Downloaded newer image for molly/privateimage:latest
docker.io/molly/privateimage:latest
```