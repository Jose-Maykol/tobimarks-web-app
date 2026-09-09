# Profile And Settings Specification

## Purpose

Permite consultar la identidad del usuario y controlar las preferencias de automatizacion de IA que se aplican al guardar nuevos marcadores.

## Requirements

### Requirement: Display user profile

The profile view SHALL display the authenticated user's display name, email, and avatar when available.

#### Scenario: Profile data is available

- **WHEN** the user profile has loaded
- **THEN** the view displays the user's name, email, and avatar, using the initial of the name when no avatar is available

#### Scenario: Profile data is loading

- **WHEN** the user profile has not loaded yet
- **THEN** the view displays a loading placeholder for the name and a fallback value for the email

### Requirement: Configure automatic AI actions

The profile view SHALL allow a user to independently enable or disable automatic tag assignment and automatic collection organization.

#### Scenario: AI preference is toggled

- **WHEN** the user changes one preference switch
- **THEN** the application sends only that preference to the API and updates the displayed user settings after success

#### Scenario: AI preference update succeeds

- **WHEN** the API accepts a preference change
- **THEN** the application shows a success message and preserves the other preference value

#### Scenario: AI preference update fails

- **WHEN** the API rejects a preference change
- **THEN** the application shows an error message and does not apply the rejected value to the displayed settings

### Requirement: Manage tags from profile

The profile view SHALL provide access to the global tag create, edit, and delete operations.

#### Scenario: User creates or edits a tag from profile

- **WHEN** the user opens the tag form from the profile and submits it
- **THEN** the tag list is refreshed and the form closes after a successful operation
