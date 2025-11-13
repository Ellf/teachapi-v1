import PaginationControls from '@/app/components/PaginationControls';


export const dynamic = 'force-dynamic';

// --- TYPES ---

type User = {
    id: number;
    email: string;
    name: string;
};

type ApiResponse = {
    users: User[];
    meta: {
        page: number;
        total: number;
        number_of_pages: number;
    };
};

// --- DATA FETCHING ---

async function getUsers(page: number) {
    // We must use the FULL URL here because this runs on the server
    const apiUrl = `http://localhost:3333/api/v1/users?page=${page}`;

    const res = await fetch(apiUrl, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    return res.json() as Promise<ApiResponse>;
}

// --- PAGE COMPONENT ---

export default async function HomePage({
                                           searchParams,
                                       }: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {

    // Safely read the 'page' from the URL, default to '1'
    const pageParam = searchParams.page;
    const page = Array.isArray(pageParam) ? pageParam[0] : pageParam;
    const currentPage = Number(page) || 1;

    // Fetch the data for the *current* page
    const data = await getUsers(currentPage);

    const totalPages = data.meta.number_of_pages;

    return (
        <main className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Teachable Users</h1>
            <p className="mb-4">
                Displaying page {data.meta.page} of {data.meta.number_of_pages} (
                {data.meta.total} total users).
            </p>

            {/* --- PAGINATION CONTROLS (TOP) --- */}
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.users.map((user) => (
                    <div
                        key={user.id}
                        className="p-4 border border-gray-200 rounded-lg shadow"
                    >
                        <h2 className="font-semibold text-lg">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                ))}
            </div>

            {/* --- PAGINATION CONTROLS (BOTTOM) --- */}
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
            />
        </main>
    );
}