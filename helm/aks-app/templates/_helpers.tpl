{{-/*
Common template helpers for aks-app
*/-}}

{{- define "aks-app.name" -}}
{{- if .Values.nameOverride }}
{{- .Values.nameOverride }}
{{- else }}
{{- .Chart.Name }}
{{- end }}
{{- end -}}

{{- define "aks-app.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride }}
{{- else }}
{{- printf "%s-%s" (include "aks-app.name" .) .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- end }}
{{- end -}}
