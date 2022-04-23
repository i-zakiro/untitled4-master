import {useMemo} from "react";

export const useSortedPost = (sort, posts) => {
    const sortedPost = useMemo(() => {
        // console.log('function used');
        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
        }
            return posts;
    }, [posts, sort]);

    return sortedPost;
}

export const usePosts = (sort, posts, query) => {

    const sortedPost = useSortedPost(sort, posts);

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter(post => post.title.toLowerCase().includes(query.toLowerCase()));
    }, [sortedPost, query]);

    return sortedAndSearchedPosts;

}