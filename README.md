# k8s-guide-app

This is a small demo Node.js app that documents Kubernetes commands and provides a simple API useful for CI/CD demos to AKS.

Local run:

```
npm install
npm start
```

Docker build (local):

```
docker build -t myacr.azurecr.io/aks-app:local .
```

GitHub Actions: the workflow (`.github/workflows/ci-aks.yml`) expects these repository secrets:

- `AZURE_CREDENTIALS` — service principal JSON (for `azure/login`).
- `ACR_NAME` — your ACR name (e.g. myacr).
- `ACR_LOGIN_SERVER` — login server (e.g. myacr.azurecr.io).
- `AKS_RESOURCE_GROUP` — resource group containing your AKS cluster.
- `AKS_CLUSTER_NAME` — AKS cluster name.

The workflow builds and pushes the image to ACR, then uses `az aks get-credentials` + `kubectl` to deploy the app with best-practice manifests in `/k8s`.
