import React, {useState} from 'react';
import classes from "./PostsList.module.scss";
import PostCreator from "../PostCreator/PostCreator";
import Post from "../Post/Post";
import MiniPost from "../MiniPost/MiniPost";

const PostsList = ({posts, selectPost, addPost, removePost}) => {
    posts = posts.map((element, index) => {
        return (
            <MiniPost key={element.id} removePost={()=>{removePost(element.id)}} id={element.id} title={element.title} selectPost={selectPost}/>
        )
    })

    return (
        <>
            <div
                className={classes.PostsList}>
                {posts}
                <PostCreator addPost={addPost}/>
            </div>
        </>
    );
}

export default PostsList;