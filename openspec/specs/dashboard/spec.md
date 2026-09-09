# Dashboard Specification

## Purpose

Ofrece una vista resumida del contenido del usuario mostrando los totales actuales de marcadores, colecciones y tags.

## Requirements

### Requirement: Display content summary

The dashboard SHALL display the user's total bookmarks, total collections, and total tags.

#### Scenario: Summary loads successfully

- **WHEN** the dashboard summary is returned by the API
- **THEN** the three total values are displayed in their corresponding cards

#### Scenario: Summary is loading

- **WHEN** the dashboard is waiting for the summary response
- **THEN** each total card displays a loading placeholder

#### Scenario: Summary fails

- **WHEN** the dashboard summary request fails
- **THEN** each total card displays an error state instead of a total
