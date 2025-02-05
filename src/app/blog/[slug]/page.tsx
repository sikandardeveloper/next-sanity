// app/blog/[slug]/page.tsx
// NOTE: Adjust important statement according to your project structure
import { sanityClient } from "@/lib/sanity";

interface PageProps {
    params: Promise<{ slug: string }>;
}

type Post = {
    title: string;
    description: string;
};

export default async function Post({ params }: PageProps) {
    const { slug } = await params;
    const query = `*[_type == 'post' && slug.current == $slug][0] { 
        title,
        description
    }`;
    const post = await sanityClient.fetch<Post>(query, { slug });

    return (
        <main className="p-5">
            <h1 className="text-3xl font-semibold">{post.title}</h1>
            <p>{post.description}</p>
        </main>
    );
}
