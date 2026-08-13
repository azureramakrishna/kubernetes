const express = require('express');
const helmet = require('helmet');
const os = require('os');

const app = express();
app.use(helmet());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/health', (req, res) => {
  res.status(200).json({status: 'ok', host: os.hostname()});
});

app.get('/api/commands', (req, res) => {
  const commands = [
    {cmd: 'kubectl apply -f <file>', desc: 'Apply resources from a manifest file'},
    {cmd: 'kubectl get pods -n <ns>', desc: 'List pods in a namespace'},
    {cmd: 'kubectl describe pod <pod>', desc: 'Show detailed state for a pod'},
    {cmd: 'kubectl logs <pod> [-c container]', desc: 'Fetch logs from a pod/container'},
    {cmd: 'kubectl exec -it <pod> -- /bin/sh', desc: 'Execute a shell inside a pod'},
    {cmd: 'kubectl port-forward svc/my-service 8080:80', desc: 'Forward local port to a service'},
    {cmd: 'kubectl rollout status deployment/my-deploy', desc: 'Watch rollout status'},
    {cmd: 'kubectl scale deployment/my-deploy --replicas=3', desc: 'Scale a deployment'},
    {cmd: 'kubectl autoscale deployment/my-deploy --min=2 --max=10 --cpu-percent=70', desc: 'Create an HPA'},
    {cmd: 'kubectl set image deployment/my-deploy mycontainer=myimage:tag', desc: 'Update deployment image (zero-downtime)'}
  ];
  res.json({commands});
});

app.get('/api/manifest-example', (req, res) => {
  const example = {
    deployment: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: aks-app',
    service: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: aks-app-svc'
  };
  res.json(example);
});

app.get('/api/info', (req, res) => {
  res.json({app: 'k8s-guide-app', version: '0.1.0', node: process.version});
});

app.listen(PORT, () => {
  console.log(`k8s-guide-app listening on port ${PORT}`);
});
