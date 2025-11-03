# Guía de Instalación de Kubernetes en Linux y Windows

## 📘 Introducción
Kubernetes es una plataforma de orquestación de contenedores que automatiza el despliegue, la gestión y la escalabilidad de aplicaciones en contenedores. Esta guía cubre los pasos necesarios para instalar Kubernetes en **Linux** (Ubuntu/Debian y CentOS/RHEL) y **Windows 10/11**.

---

## 🐧 Instalación en Linux

### 1. Requisitos previos
- Sistema operativo: Ubuntu 20.04+ o CentOS 7+
- Acceso root o privilegios `sudo`
- Docker, Containerd o CRI-O instalado
- Al menos 2 GB de RAM y 2 CPUs
- Conectividad a Internet

### 2. Configurar el entorno
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl
```

Desactiva el swap:
```bash
sudo swapoff -a
sudo sed -i '/ swap / s/^/#/' /etc/fstab
```

Habilita los módulos necesarios:
```bash
cat <<EOF | sudo tee /etc/modules-load.d/k8s.conf
overlay
br_netfilter
EOF

sudo modprobe overlay
sudo modprobe br_netfilter

cat <<EOF | sudo tee /etc/sysctl.d/k8s.conf
net.bridge.bridge-nf-call-iptables  = 1
net.ipv4.ip_forward                 = 1
net.bridge.bridge-nf-call-ip6tables = 1
EOF

sudo sysctl --system
```

### 3. Instalar containerd (recomendado)
```bash
sudo apt install -y containerd
sudo mkdir -p /etc/containerd
containerd config default | sudo tee /etc/containerd/config.toml >/dev/null
sudo systemctl restart containerd
sudo systemctl enable containerd
```

### 4. Instalar Kubernetes (kubeadm, kubelet, kubectl)
Agrega el repositorio oficial:
```bash
sudo curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.30/deb/Release.key | sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/kubernetes-apt-keyring.gpg

echo "deb [signed-by=/etc/apt/trusted.gpg.d/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.30/deb/ /" | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt update
sudo apt install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

### 5. Inicializar el clúster
```bash
sudo kubeadm init --pod-network-cidr=10.244.0.0/16
```

Configura el acceso al clúster:
```bash
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

### 6. Instalar red de pods (CNI)
Ejemplo con **Flannel**:
```bash
kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
```

### 7. Verificar el clúster
```bash
kubectl get nodes
kubectl get pods -A
```

---

## 🪟 Instalación en Windows

### 1. Requisitos previos
- Windows 10/11 Pro o Enterprise (con WSL2 habilitado)
- Docker Desktop instalado
- Soporte para Hyper-V y virtualización activada en BIOS

### 2. Habilitar WSL2 y Ubuntu
Ejecuta en PowerShell como administrador:
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
wsl --install -d Ubuntu
```

Reinicia el sistema y actualiza WSL:
```powershell
wsl --update
```

### 3. Instalar Docker Desktop
Descarga desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
Durante la instalación:
- Habilita **WSL2 backend**
- Activa **Kubernetes** desde **Settings → Kubernetes → Enable Kubernetes**

### 4. Verificar instalación
Una vez que Docker Desktop haya iniciado Kubernetes, ejecuta:
```powershell
kubectl version --client
kubectl get nodes
```

Si ves un nodo llamado `docker-desktop`, el clúster está activo.

### 5. Desplegar un ejemplo
```powershell
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=LoadBalancer
kubectl get svc
```

Abre el navegador y visita la dirección IP mostrada para probar el despliegue.

---

## 🧩 Notas y Consejos
- Usa `minikube` si deseas un entorno local ligero:
  ```bash
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
  minikube start --driver=docker
  ```
- En Windows, también puedes usar **kind** o **Rancher Desktop** como alternativas.
- Para reiniciar todos los servicios en Linux:
  ```bash
  sudo systemctl restart kubelet
  sudo systemctl restart containerd
  ```

---

## ✅ Verificación final
Ejecuta:
```bash
kubectl cluster-info
kubectl get all --all-namespaces
```
Si ambos comandos devuelven información del clúster, la instalación ha sido exitosa.

---

## 📚 Recursos adicionales
- [Documentación oficial de Kubernetes](https://kubernetes.io/docs/setup/)
- [Instalación con kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/)
- [Docker Desktop Kubernetes](https://docs.docker.com/desktop/kubernetes/)

---

**Autor:** Brayan Tebelán  
**Última actualización:** Noviembre 2025

