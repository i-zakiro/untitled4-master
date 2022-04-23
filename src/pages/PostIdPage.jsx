import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import Loader from "../Components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])

    const [fetchPostsById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })

    const [fetchCommentsById, isCommLoading, CommentsError] = useFetching(async (id) => {
        const response = await PostService.fetchCommentsById(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostsById(params.id);
    }, []);

    useEffect(() => {
        fetchCommentsById(params.id);
    }, []);



    return (
        <div>
            <h1>u open posts page ID is = {params.id}</h1>
            {isLoading
                ?   <Loader />
                :   <div>{post.id}. {post.title}</div>
            }
            <h1>
                Comments
            </h1>
            {isCommLoading
                ?   <Loader />
                :   comments.map((comm) =>
                    <div style={{marginTop: 15}} key={comm.id}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                )
            }
        </div>
    );
};

export default PostIdPage;