
# IMC Study Hub - Implementation Plan

## Overview
A modern study resource platform for IMC Krems students, featuring module-based navigation, notes library, past papers repository, and practice quizzes. Built with React, Vite, Tailwind CSS, and TypeScript.

---

## Design & Style
- **Color Scheme**: Blue & White Academic theme (professional navy blues, clean whites, subtle grays)
- **Layout**: Collapsible sidebar + top bar navigation (Notion-inspired)
- **Approach**: Desktop-first with responsive mobile support
- **Typography**: Clean, readable fonts with good hierarchy

---

## Phase 1: Foundation & Layout

### Core Setup
- Configure routing with React Router for all 10 pages
- Create sidebar navigation component (collapsible)
- Create top bar with global search and user menu
- Set up blue & white color palette in Tailwind config

### Mock Data Structure
Create TypeScript data models and mock content:
- **6 Modules**: Web Technologies, Databases, R Programming, Marketing Fundamentals, Project Management, Statistics
- **15 Notes**: Distributed across modules with markdown content
- **12 Past Papers**: Various semesters, exam types, with/without solutions
- **Practice Sets & Q&A data**

---

## Phase 2: Main Pages

### Home Page (/)
- Hero section with prominent search bar
- Quick filter chips (WebTech, Databases, R Programming, etc.)
- 4-panel responsive grid:
  - Trending Notes
  - Latest Uploads  
  - Upcoming Assessments
  - Top Practice Sets
- Community disclaimer footer

### Modules Directory (/modules)
- Grid/list of module cards showing title, semester, lecturers, difficulty, tags
- Filter bar: semester dropdown, tag multi-select
- Sort options: Most Popular, Recently Updated

### Notes Library (/notes)
- Search bar + filter sidebar
- Note cards with title, module, author, upvotes, views, tags
- Filter by module, topic, semester, format

### Past Papers Repository (/papers)
- Strong filtering: semester, assessment type, solutions availability
- Paper cards with download, discuss actions
- Mark as attempted functionality

---

## Phase 3: Detail Pages

### Module Hub (/modules/:moduleId)
- Module header with full metadata
- Tabbed interface:
  - **Overview**: Learning outcomes, resources
  - **Notes**: Notes filtered to this module
  - **Past Exams**: Papers for this module
  - **Practice**: Start Quiz UI (mock)
  - **Flashcards**: Coming soon placeholder
  - **Q&A**: Mock discussion threads

### Note Viewer (/notes/:noteId)
- 3-column layout:
  - Left: Table of contents (auto-generated from headings)
  - Center: Markdown content renderer
  - Right: Actions (Upvote, Bookmark, Download, Report)

### Paper Detail (/papers/:paperId)
- Paper metadata and topics covered
- Action buttons: Download, Mark Attempted, Discuss
- Related notes section

---

## Phase 4: Interactive Features

### Practice Hub (/practice)
- Module → Topic selection flow
- 5 mock questions (MCQ + short answer)
- Answer submission with explanation reveal

### Upload Page (/upload)
- Tabbed form: Notes | Past Paper | Practice Questions | Flashcards
- Form fields: module, semester, topic, type, tags, file placeholder
- Toast notification on submit

### Login Page (/login)
- Mock OAuth buttons (Google, Email)
- Sets fake user in local state
- Shows user avatar in navbar when "logged in"

---

## Phase 5: Core Functionality

### Global Search
- Searches across modules, notes, and papers
- Dropdown results with categorized sections
- Navigate to results on selection

### Persistence (localStorage)
- Upvoted items
- Bookmarked notes
- Attempted papers
- User login state

### Components Built
- Navbar, Sidebar, SearchBar, FilterBar
- ModuleCard, NoteCard, PaperCard
- Tabs, MarkdownViewer, Toast notifications
- Quiz components, Form components

---

## Future-Ready Structure
- Comments throughout code indicating Firebase integration points
- Data fetching patterns ready for API replacement
- Auth context prepared for real authentication

---

## Result
A fully navigable demo with realistic IMC Krems content, clean academic styling, and all core interactions working with local state - ready for future backend integration.
