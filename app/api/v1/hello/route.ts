import { NextResponse } from 'next/server';

// This function handles GET requests to /api/hello
export async function GET(request: Request) {
    // 1. Securely access the API key from the server's environment
    const apiKey = process.env.TEACHABLE_API_KEY;

    if (!apiKey) {
        // Handle the case where the key is missing
        return NextResponse.json(
            { error: 'API key is not configured.' },
            { status: 500 }
        );
    }

    // 2. For security, we'll just confirm the key is loaded
    //    Never send your full API key back in a response!
    const keyLoaded = apiKey.length > 0;
    const keyPreview = apiKey.substring(0, 4) + '...';

    // 3. Send a success response
    return NextResponse.json({
        message: 'Hello from the API!',
        teachableKeyLoaded: keyLoaded,
        keyPreview: keyPreview,
    });
}

// You can also add POST, PUT, DELETE functions here