# Tolerancia-a-Fallos



# Kubernetes Minikube Deployment Guide

Este README documenta el proceso paso a paso para desplegar una aplicación en Kubernetes usando Minikube, crear un servicio, exponerlo, escalar el deployment y actualizar la imagen.

---

## PASO 1: Crear y aplicar el Deployment

### 1.2 Aplicar el Deployment
```bash
kubectl apply -f hello-deployment.yaml
```

### 1.3 Verificar el Deployment y el pod
```bash
kubectl get deployments
kubectl get pods
```

---

## PASO 2: Crear y exponer el Servicio

### 2.1 Crear el Servicio tipo ClusterIP
```bash
kubectl expose deployment hello-deployment --name=hello-service --type=ClusterIP --port=80 --target-port=80
```

### 2.2 Verificar el Servicio
```bash
kubectl get service hello-service
```

### 2.3 Probar el servicio dentro del clúster (Minikube)
```bash
minikube ssh
curl http://<CLUSTER-IP>
```

### 2.4 Cambiar el servicio a NodePort
```bash
kubectl patch service hello-service -p '{"spec":{"type":"NodePort"}}'
```

### 2.5 Verificar puerto asignado
```bash
kubectl get service hello-service
```

### 2.6 Acceder desde navegador o con curl
```bash
minikube ip
```

```bash
curl http://<MINIKUBE-IP>:<NODE-PORT>
```

**Ejemplo:**
```bash
curl http://192.168.49.2:32080
```

---

## PASO 3: Escalar el Deployment

### 3.1 Escalar el Deployment con `kubectl scale`
```bash
kubectl scale deployment hello-deployment --replicas=4
```

### 3.2 Verificar el estado de los pods
```bash
kubectl get pods
```

### 3.3 Verificar el estado del Deployment
```bash
kubectl get deployment hello-deployment
```

---

## PASO 4: Actualizar la imagen del Deployment

### 4.1 Actualizar la imagen del Deployment
```bash
kubectl set image deployment/hello-deployment hello-container=nginx:alpine
```

### 4.2 Observar el proceso de actualización
```bash
kubectl rollout status deployment/hello-deployment
```

### 4.3 Verificar los nuevos pods
```bash
kubectl get pods -o wide
```

### 4.4 Comparar contenido HTTP (con curl)
```bash
curl http://<MINIKUBE-IP>:<NODE-PORT>
```

