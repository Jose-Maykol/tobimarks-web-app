# Authentication Specification

## Purpose

Permite a los usuarios iniciar una sesion en Tobimarks con Google y mantener el acceso autorizado a las operaciones de la aplicacion.

## Requirements

### Requirement: Google sign-in

The application SHALL allow a user to authenticate with a Google credential and SHALL navigate the user to the dashboard after the credential is accepted by the API.

#### Scenario: Successful Google sign-in

- **WHEN** Google returns a credential and the API accepts it
- **THEN** the application stores the returned access token and navigates to `/`

#### Scenario: Google returns no credential

- **WHEN** the Google login callback has no credential
- **THEN** the application SHALL not send an authentication request or navigate to the dashboard

### Requirement: Authorized API requests

The application SHALL use the stored access token as a Bearer token for API requests that are not part of the login flow.

#### Scenario: Request with an available session

- **WHEN** an API request is sent while an access token exists
- **THEN** the request includes an `Authorization` header using the Bearer scheme

#### Scenario: Expired or rejected session

- **WHEN** a non-login API request receives HTTP 401
- **THEN** the application navigates the user to `/login`
