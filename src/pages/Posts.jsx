import React, {useEffect, useRef, useState} from "react";
import {usePosts} from "../hooks/useHooks";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../Components/UI/button/MyButton";
import MyModal from "../Components/UI/MyModal/MyModal";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import PostList from "../Components/PostList";
import Pagination from "../Components/UI/pagination/Pagination";
import Loader from "../Components/UI/Loader/Loader";
import useObserver from "../hooks/useObserver";
import MySelect from "../Components/UI/select/MySelect";

function Posts() {

    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(filter.sort, posts, filter.query);
    const lastElement = useRef();


    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    })

   useObserver(lastElement, page < totalPages, isPostLoading, () => {setPage(page + 1)})

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    const changePage = (page) => {
        setPage(page);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }


    return (
        <div className="App">
            <button onClick={fetchPosts}>GET POSTS</button>
            <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
                Create new user
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <MySelect 
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue='set posts limit'
                options={[
                    {value: 5, name: '5 posts'},
                    {value: 10, name: '10 posts'},
                    {value: 25, name: '25 posts'},
                    {value: -1, name: 'all posts'},
                ]}
            />

            {postError && <h1>{postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Posts JS'}/>

            <div ref={lastElement} style={{height: 20, background: 'red'}}></div>

            {isPostLoading && 
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader/></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;
