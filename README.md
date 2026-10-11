# Fix The Text

Made for messages that deserve more than a tiny text box.

**Live site:** [https://kishon-g.github.io/fix-the-text/](https://kishon-g.github.io/fix-the-text/)

Fix The Text is a simple web editor for writing and formatting messages before sending them. Instead of remembering where to put asterisks or underscores in a cramped chat input, you write in a rich text editor, see how it looks in a chat bubble, and copy the formatted text.

## Features

- Rich text editor with toolbar support for bold, italic, strikethrough, inline code, lists, and quotes
- Live chat bubble preview alongside a raw syntax view

## Supported Platforms

- **WhatsApp**

## Local Setup

```bash
git clone https://github.com/kishon-g/fix-the-text.git
cd fix-the-text
npm install
```

Create a `.env` file if you want the feedback form and GitHub header button to work locally:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
REPOSITORY_URL=https://github.com/kishon-g/fix-the-text
```

Run the dev server:

```bash
npm run dev
```

## License

[MIT](LICENSE)
