# Tags Specification

## Purpose

Permite crear y mantener etiquetas globales para clasificar marcadores y utilizarlas en la edicion y filtrado de contenido.

## Requirements

### Requirement: Manage tags

The application SHALL allow a user to create, edit, and delete tags, each with a name and color.

#### Scenario: Tag is created

- **WHEN** the user submits a tag name and color
- **THEN** the application creates the tag, refreshes tag data, closes the form, and reports success

#### Scenario: Tag is edited

- **WHEN** the user edits a tag name or color and submits the form
- **THEN** the application updates the tag, refreshes tag data, closes the form, and reports success

#### Scenario: Tag is deleted

- **WHEN** the user selects the delete action for a tag and the API succeeds
- **THEN** the application refreshes tag data and removes the tag from the displayed management list

### Requirement: Select tags for bookmarks

The application SHALL allow a user to select or deselect tags while editing a bookmark and SHALL use selected tags when updating the bookmark.

#### Scenario: Tag selection changes

- **WHEN** the user clicks a tag in the bookmark editor
- **THEN** the application toggles that tag in the selected set without changing the other selected tags

#### Scenario: Bookmark has no available tags

- **WHEN** the bookmark editor has no global tags
- **THEN** the tag selector is not displayed and the bookmark can still be updated by title

### Requirement: Filter bookmarks by tags

The application SHALL expose available tags as bookmark-list filters and SHALL indicate which tags are selected.

#### Scenario: User filters by a tag

- **WHEN** the user selects a tag in the bookmark filters
- **THEN** the application refreshes the list with that tag included in the active filter set
