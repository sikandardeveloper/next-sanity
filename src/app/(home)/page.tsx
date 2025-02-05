import Link from "next/link";
import type { Metadata } from "next";
import { sanityClient } from "@/lib/sanity";

export const metadata: Metadata = {
    title: "Home",
};

type Post = {
    slug: string;
    title: string;
    description: string;
};

export default async function Home() {
    const query = `*[_type == 'post'] {
        "slug": slug.current,
        title,
        description
    }`;
    const posts = await sanityClient.fetch<Post[]>(query);

    return (
        <main className="m-5">
            <h1>Posts</h1>
            <ul className="list-decimal ml-5">
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link
                            href={`/blog/${post.slug}`}
                            className="text-blue-600 hover:underline"
                        >
                            {post.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
