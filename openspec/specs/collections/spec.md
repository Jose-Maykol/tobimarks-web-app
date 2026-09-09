# Collections Specification

## Purpose

Permite agrupar marcadores relacionados en colecciones nombradas y navegar desde una coleccion hasta sus marcadores filtrables.

## Requirements

### Requirement: Create collections

The application SHALL allow a user to create a collection with a required name and optional description, icon, and color.

#### Scenario: Collection creation succeeds

- **WHEN** the user submits a non-empty collection name and the API succeeds
- **THEN** the application refreshes collection data, closes the form, restores the default icon and color for the next creation, and reports success

#### Scenario: Collection name is empty

- **WHEN** the user submits the create collection form without a name
- **THEN** the application SHALL not send the create operation

### Requirement: View collections

The application SHALL display the user's collections with their name, visual configuration, and bookmark count, and SHALL provide a details view for each collection.

#### Scenario: User opens a collection

- **WHEN** the user selects a collection card or collection entry in the sidebar
- **THEN** the application navigates to that collection's details view

#### Scenario: Collection has no bookmarks

- **WHEN** a collection's bookmark list is empty
- **THEN** the details view displays an empty-state message and offers filter guidance when filters are active

### Requirement: Update collections

The application SHALL allow a user to change a collection's name, description, icon, or color.

#### Scenario: Collection changes are submitted

- **WHEN** the user changes at least one collection field and saves
- **THEN** the application updates the collection, refreshes collection data, closes the form, and reports success

#### Scenario: Collection is unchanged

- **WHEN** the user submits the edit form without a name change or any visual or description change
- **THEN** the application closes the form without sending an update

### Requirement: Delete collections without deleting bookmarks

The application SHALL require confirmation before deleting a collection and SHALL preserve its bookmarks while removing their collection assignment.

#### Scenario: Collection deletion is confirmed

- **WHEN** the user confirms collection deletion and the API succeeds
- **THEN** the application refreshes the collection list and reports that the collection was deleted

#### Scenario: Collection deletion is cancelled

- **WHEN** the user cancels the deletion confirmation
- **THEN** the application SHALL not call the delete operation

### Requirement: Filter bookmarks within a collection

The collection details view SHALL support the same favorite, tag, access-period, and sort controls as the global bookmark list, scoped to the current collection.

#### Scenario: Collection filter changes

- **WHEN** the user changes a filter in a collection details view
- **THEN** the application refreshes only the bookmark results for that collection using the selected values
