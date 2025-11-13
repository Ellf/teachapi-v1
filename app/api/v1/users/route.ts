import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // 1. Get the secret API key from environment variables
    const apiKey = process.env.TEACHABLE_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { error: 'API key is not configured.' },
            { status: 500 }
        );
    }

    // 2. Define the Teachable API endpoint and options
    const { search } = new URL(request.url);
    const teachableBaseUrl = 'https://developers.teachable.com/v1/users';
    const teachableUrl = `${teachableBaseUrl}${search}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            apiKey: apiKey, // Securely insert the key
        },
        // Optional: Add caching configuration
        next: {
            revalidate: 60, // Cache the result for 60 seconds
        },
    };

    try {
        // 3. Make the API call
        const response = await fetch(teachableUrl, options);

        // 4. Handle a bad response from Teachable
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Teachable API Error:', errorData);
            return NextResponse.json(
                { error: 'Failed to fetch from Teachable', details: errorData },
                { status: response.status }
            );
        }

        // 5. Send the successful data back to your client
        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        // 6. Handle network errors (e.g., fetch failed)
        console.error('Network Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}