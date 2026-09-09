# Bookmarks Specification

## Purpose

Permite guardar, consultar y administrar enlaces, incluyendo su organizacion, favoritos y actividad de acceso.

## Requirements

### Requirement: Create bookmarks

The application SHALL allow a user to create a bookmark by submitting a valid URL and SHALL report the loading, success, or failure state of the operation.

#### Scenario: Bookmark creation succeeds

- **WHEN** the user submits a non-empty URL in the create bookmark form and the API succeeds
- **THEN** the application closes the form, refreshes the visible bookmark list when applicable, and reports success

#### Scenario: Bookmark URL is missing or invalid

- **WHEN** the user submits the form without a valid required URL
- **THEN** the form prevents the create operation and keeps the form available for correction

### Requirement: List and filter bookmarks

The application SHALL display the user's bookmarks and SHALL support filtering by favorite state, selected tags, and access period, as well as sorting by creation date, access count, or last access.

#### Scenario: User changes a bookmark filter

- **WHEN** the user selects a favorite filter, one or more tags, or an access period
- **THEN** the application refreshes the list using the selected filter values

#### Scenario: User changes the sort order

- **WHEN** the user selects recent, oldest, most accessed, or last accessed
- **THEN** the application refreshes the list using the corresponding sort field and direction

#### Scenario: User clears active filters

- **WHEN** the user selects "Limpiar filtros"
- **THEN** the application restores all filters to all bookmarks, newest first, with no access-period or tag filter

#### Scenario: No bookmarks match

- **WHEN** the loaded bookmark list is empty
- **THEN** the application displays an empty-state message and indicates that filters can be adjusted when filters are active

### Requirement: Manage bookmark metadata

The application SHALL allow a user to edit a bookmark title and its selected tags, and SHALL allow the user to delete a bookmark.

#### Scenario: Bookmark metadata is updated

- **WHEN** the user submits a new title or tag selection
- **THEN** the application sends the updated metadata, refreshes bookmark queries after success, and closes the edit form

#### Scenario: Bookmark is deleted

- **WHEN** the user confirms the delete action and the API succeeds
- **THEN** the application refreshes bookmark queries and reports that the bookmark was deleted

### Requirement: Track bookmark interactions

The application SHALL allow a user to toggle favorite state, copy the URL, and open the URL while registering the access.

#### Scenario: Favorite state changes

- **WHEN** the user toggles the favorite control
- **THEN** the application updates the favorite state through the API and shows a success message

#### Scenario: Favorite update fails

- **WHEN** the favorite API operation fails
- **THEN** the application restores the previous favorite state and shows an error message

#### Scenario: URL is copied

- **WHEN** the user selects the copy action
- **THEN** the bookmark URL is written to the clipboard and the application reports success

#### Scenario: Bookmark is opened

- **WHEN** the user selects the open action
- **THEN** the URL opens in a new browser tab and the application registers one access for the bookmark

### Requirement: Assign bookmarks to collections

The application SHALL allow a user to assign a bookmark to another collection or remove its collection assignment.

#### Scenario: Bookmark is assigned

- **WHEN** the user chooses an available collection
- **THEN** the application assigns the bookmark, refreshes bookmark and collection data, and closes the assignment form

#### Scenario: Bookmark is removed from a collection

- **WHEN** the user selects "Quitar de colección"
- **THEN** the application removes the assignment, refreshes bookmark and collection data, and closes the assignment form
