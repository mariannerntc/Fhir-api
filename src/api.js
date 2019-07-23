import axios from 'axios';

const fhirApi = axios.create({
  baseURL: 'http://hapi.fhir.org/baseDstu3',
  timeout: 5000,
  headers: {'Content-Type': 'application/fhir+json'}
});

export {
  fhirApi
};
