# SoundCloud Track Downloader

A robust Node.js/NestJS service for downloading SoundCloud tracks with metadata preservation.

## Features

- **Track Downloads**: Download tracks with original quality
- **Metadata Extraction**: Preserves title, artist, duration, genre, release date
- **Organized Storage**: Creates artist/track folder structure
- **Retry Logic**: Exponential backoff for failed downloads
- **User Agent Rotation**: Prevents rate limiting
- **UUID Filenames**: Prevents filename collisions

## API Endpoints

### POST /soundcloud/download

Downloads a SoundCloud track and returns metadata.

**Request Body:**
```json
{
  "url": "https://soundcloud.com/artist/track-name"
}
```

**Response:**
```json
{
  "success": true,
  "path": "/downloads/Artist_Name/Track_Title/uuid_track.mp3",
  "metadata": {
    "title": "Track Title",
    "artist": "Artist Name",
    "duration": "3:45",
    "genre": "Electronic",
    "releaseDate": "2024-01-01",
    "waveformUrl": "https://...",
    "downloadUrl": "https://..."
  }
}
```

## Directory Structure

Downloads are organized as:
```
downloads/
├── Artist_Name/
│   └── Track_Title/
│       ├── metadata.json
│       └── uuid_track.mp3
└── Another_Artist/
    └── Another_Track/
        ├── metadata.json
        └── uuid_track.mp3
```

## Usage

1. **Start the server:**
   ```bash
   cd backend
   npm run start:dev
   ```

2. **Test with curl:**
   ```bash
   curl -X POST http://localhost:3000/soundcloud/download \
     -H "Content-Type: application/json" \
     -d '{"url": "https://soundcloud.com/artist/track"}'
   ```

3. **Test with the provided script:**
   ```bash
   node backend/soundcloud/test-soundcloud.js
   ```

## Requirements

- Node.js 16+
- Playwright (automatically installs Chromium)
- Valid SoundCloud URLs with downloadable tracks

## Error Handling

- Invalid URLs return 400 error
- Download failures retry up to 3 times with exponential backoff
- Network timeouts handled gracefully
- Detailed error messages for debugging

## Legal Notice

This tool is for educational purposes. Ensure you have permission to download tracks and comply with SoundCloud's Terms of Service and copyright laws.
