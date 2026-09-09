# Navigation Specification

## Purpose

Proporciona la estructura de navegacion de la aplicacion, acceso a las vistas principales y controles globales de tema y menu responsive.

## Requirements

### Requirement: Navigate between application areas

The application SHALL provide navigation to the dashboard, bookmarks, collections, collection details, and profile views.

#### Scenario: User selects a primary navigation item

- **WHEN** the user selects Dashboard, Marcadores, Colecciones, or Perfil
- **THEN** the application navigates to the corresponding route and marks the active area

#### Scenario: User selects a collection shortcut

- **WHEN** the user selects a collection from the sidebar list
- **THEN** the application navigates to `/collections/:id`

### Requirement: Create content from the navigation shell

The navigation shell SHALL provide actions to open the create bookmark form and the create collection form.

#### Scenario: User starts creating a bookmark

- **WHEN** the user selects "Nuevo Marcador"
- **THEN** the create bookmark form is opened

#### Scenario: User starts creating a collection

- **WHEN** the user selects the add action beside "Tus Colecciones"
- **THEN** the create collection form is opened

### Requirement: Switch application theme

The application SHALL allow the user to switch between light and dark themes and persist the selected theme through the configured theme provider.

#### Scenario: User toggles the theme

- **WHEN** the user selects the theme toggle
- **THEN** the application switches from light to dark or from dark to light and updates the toggle icon

### Requirement: Use the sidebar on small screens

The application SHALL provide an overlay sidebar that can be opened and closed on small screens without changing the current route.

#### Scenario: Sidebar is opened on a small screen

- **WHEN** the user selects the menu button
- **THEN** the sidebar opens over the page with a dismissible backdrop

#### Scenario: Navigation closes the small-screen sidebar

- **WHEN** the user selects a navigation item or the dismiss control
- **THEN** the sidebar closes
