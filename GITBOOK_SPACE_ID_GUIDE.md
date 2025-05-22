# How to Find Your GitBook Space ID

This guide will help you locate your GitBook Space ID, which is required to run the documentation generator.

## What is a GitBook Space ID?

A GitBook Space ID is a unique identifier for your documentation space in GitBook. It's found in the URL of your GitBook space and is required for the API to know where to create content.

## Step-by-Step Instructions

### 1. Log in to GitBook

First, go to [GitBook](https://app.gitbook.com/) and log in to your account.

### 2. Create a Space (if you don't have one)

If you don't already have a space:

1. Click the **+ New** button in the top-right corner
2. Select **Space**
3. Choose a template (or start from scratch)
4. Give your space a name (e.g., "Ghost Integration Documentation")
5. Click **Create**

### 3. Find Your Space ID

Once you have a space:

1. Open your space in GitBook
2. Look at the URL in your browser's address bar
3. The Space ID is the string of characters after `/s/` in the URL

For example, if your URL is:
```
https://app.gitbook.com/s/abcd1234efgh5678ijkl
```

Then your Space ID is: `abcd1234efgh5678ijkl`

### 4. Use the Space ID in this project

You can use this Space ID in two ways:

1. **Using the setup script**:
   ```
   npm run setup
   ```
   Then enter the Space ID when prompted.

2. **Manually update the .env file**:
   Edit the `.env` file and replace `YOUR_SPACE_ID_HERE` with your actual Space ID.

## Screenshots

The GitBook Space ID is found in the URL of your space:

```
https://app.gitbook.com/s/YOUR_SPACE_ID_IS_HERE/page/some-page
```

## Troubleshooting

- **"Space not found" error**: Double-check that you've copied the entire Space ID correctly.
- **Access issues**: Ensure you're using an API token with write access to the space.
- **No spaces available**: If you don't see any spaces, you may need to create one first.

## Need more help?

Refer to the [GitBook documentation](https://docs.gitbook.com/) for more information about spaces and API access.
