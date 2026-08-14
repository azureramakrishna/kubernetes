{{-/*
Common template helpers for aks-app
*/-}}
{{- define "aks-app.name" -}}
{{- .Chart.Name -}}
{{- end -}}

{{- define "aks-app.fullname" -}}
{{- printf "%s-%s" (include "aks-app.name" .) .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
