# AI Document Analyzer Backend

A production-ready backend for an AI-powered document analysis application.

## Features

- OAuth2 authentication with Google, Microsoft, and Dropbox
- Document processing (PDF, DOCX, XLSX)
- AI-powered document analysis using Mistral-7B
- Vector embeddings with FAISS
- Secure token storage and encryption
- Rate limiting and request validation
- Role-based access control

## Prerequisites

- Node.js 18.x
- Python 3.8+
- MongoDB
- AWS Account (for deployment)
- OAuth credentials for Google, Microsoft, and Dropbox
- Hugging Face API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd ai && pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and fill in your credentials
4. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

Run the test suite:
```bash
npm test
```

For test coverage:
```bash
npm run test:coverage
```

## Deployment

1. Install the Serverless Framework:
   ```bash
   npm install -g serverless
   ```

2. Configure AWS credentials:
   ```bash
   serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET
   ```

3. Deploy to AWS Lambda:
   ```bash
   npm run deploy
   ```

## API Endpoints

### Authentication
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/microsoft` - Microsoft OAuth
- `POST /api/auth/dropbox` - Dropbox OAuth

### Documents
- `POST /api/files/upload` - Upload document
- `GET /api/files/list` - List documents
- `GET /api/files/:id` - Get document
- `DELETE /api/files/:id` - Delete document

### AI Analysis
- `POST /api/process` - Process document
- `POST /api/query` - Query documents

## Security

- All sensitive data is encrypted at rest
- OAuth tokens are encrypted before storage
- Rate limiting on all endpoints
- JWT-based authentication
- Role-based access control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT 