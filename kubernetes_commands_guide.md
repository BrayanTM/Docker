# Guía de Comandos y Ejemplos de Kubernetes

## 📘 Introducción
Esta guía contiene una colección de los comandos más comunes y útiles de **Kubernetes (kubectl)** con ejemplos prácticos para administración, despliegue y monitoreo de clústeres.

---

## ⚙️ Comandos Básicos

### Mostrar la versión de Kubernetes
```bash
kubectl version --short
```

### Mostrar información del clúster
```bash
kubectl cluster-info
```

### Listar nodos del clúster
```bash
kubectl get nodes
```

### Ver recursos en todos los namespaces
```bash
kubectl get all --all-namespaces
```

### Obtener información detallada de un nodo
```bash
kubectl describe node <nombre-del-nodo>
```

---

## 📦 Gestión de Pods

### Listar pods en el namespace actual
```bash
kubectl get pods
```

### Ver pods en todos los namespaces
```bash
kubectl get pods --all-namespaces
```

### Crear un pod
```bash
kubectl run nginx --image=nginx
```

### Ver detalles de un pod
```bash
kubectl describe pod nginx
```

### Ver logs de un pod
```bash
kubectl logs nginx
```

### Acceder a un pod
```bash
kubectl exec -it nginx -- /bin/bash
```

### Eliminar un pod
```bash
kubectl delete pod nginx
```

---

## 🚀 Despliegues (Deployments)

### Crear un deployment
```bash
kubectl create deployment myapp --image=nginx
```

### Escalar un deployment
```bash
kubectl scale deployment myapp --replicas=3
```

### Actualizar la imagen de un deployment
```bash
kubectl set image deployment/myapp nginx=nginx:1.25.0
```

### Ver el estado de los deployments
```bash
kubectl get deployments
```

### Eliminar un deployment
```bash
kubectl delete deployment myapp
```

---

## 🌐 Servicios (Services)

### Crear un servicio tipo ClusterIP
```bash
kubectl expose deployment myapp --type=ClusterIP --port=80
```

### Crear un servicio tipo NodePort
```bash
kubectl expose deployment myapp --type=NodePort --port=80
```

### Crear un servicio tipo LoadBalancer
```bash
kubectl expose deployment myapp --type=LoadBalancer --port=80
```

### Ver servicios activos
```bash
kubectl get svc
```

### Eliminar un servicio
```bash
kubectl delete svc myapp
```

---

## 📂 ConfigMaps y Secrets

### Crear un ConfigMap
```bash
kubectl create configmap app-config --from-literal=APP_MODE=production
```

### Ver ConfigMaps
```bash
kubectl get configmaps
```

### Crear un Secret
```bash
kubectl create secret generic db-secret --from-literal=DB_USER=admin --from-literal=DB_PASS=12345
```

### Ver Secrets (decodificados)
```bash
kubectl get secret db-secret -o jsonpath='{.data}' | base64 --decode
```

---

## 📊 Monitoreo y Estado

### Ver uso de recursos por pod
```bash
kubectl top pod
```

### Ver uso de recursos por nodo
```bash
kubectl top node
```

### Ver eventos recientes
```bash
kubectl get events --sort-by=.metadata.creationTimestamp
```

---

## 🧩 Namespaces

### Listar namespaces
```bash
kubectl get namespaces
```

### Crear un namespace
```bash
kubectl create namespace dev
```

### Cambiar el contexto a un namespace
```bash
kubectl config set-context --current --namespace=dev
```

### Eliminar un namespace
```bash
kubectl delete namespace dev
```

---

## 🔄 Gestión de Archivos YAML

### Aplicar un archivo YAML
```bash
kubectl apply -f deployment.yaml
```

### Eliminar recursos definidos en YAML
```bash
kubectl delete -f deployment.yaml
```

### Ver manifestos YAML de recursos existentes
```bash
kubectl get deployment myapp -o yaml
```

---

## 🧱 Volúmenes y Almacenamiento

### Ver volúmenes persistentes (PV)
```bash
kubectl get pv
```

### Ver claims de volúmenes (PVC)
```bash
kubectl get pvc
```

### Crear un PV desde YAML
```bash
kubectl apply -f pv.yaml
```

---

## 🧰 Otros Comandos Útiles

### Obtener ayuda sobre un comando
```bash
kubectl explain pods
```

### Reiniciar todos los pods de un deployment
```bash
kubectl rollout restart deployment myapp
```

### Revertir una actualización de deployment
```bash
kubectl rollout undo deployment myapp
```

### Ver historial de rollout
```bash
kubectl rollout history deployment myapp
```

---

## 💡 Consejos Prácticos
- Usa `kubectl get all` para obtener una vista general del clúster.
- Agrega el flag `-o wide` para más información (por ejemplo: IP y nodo).
- Combina con `grep` para filtrar resultados:
  ```bash
  kubectl get pods | grep nginx
  ```
- Usa `kubens` y `kubectx` para cambiar namespaces y contextos rápidamente.

---

## 📚 Recursos adicionales
- [Referencia oficial de kubectl](https://kubernetes.io/docs/reference/kubectl/)
- [Cheat Sheet de Kubernetes](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
- [Kubectl Commands Docs](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands)

---

**Autor:** Brayan Tebelán  
**Última actualización:** Noviembre 2025

