import type { Metadata } from "next";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/utils";
import { sanityClient } from "@/lib/sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";


export const metadata: Metadata = {
    title: "Home",
};

type Post = {
    _id: string;
    title: string;
    thumbnail: SanityImageSource
}


export default async function Home() {
    const query = "*[_type == \"post\"] { _id, title, thumbnail }";
    const posts = await sanityClient.fetch<Post[]>(query);

    return (
        <main>
            <h1>Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        {post.thumbnail && (
                            <Image
                                src={urlFor(post.thumbnail).width(150).height(100).url()}
                                alt={post.title}
                                width={150}
                                height={100}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
};
