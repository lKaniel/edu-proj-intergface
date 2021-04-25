import React, {useState} from 'react';
import classes from "./PostsList.module.scss";
import PostCreator from "../PostCreator/PostCreator";
import Post from "../Post/Post";

const PostsList = ({posts, active, swapActive, addPost, removePost, tabs, addTextTab, removeTab}) => {

    posts = posts.map((element, index) => {
        return (
            <Post key={element.id} tabs={element.id === posts[active]?.id ? tabs : []} title={element.title} removePost={()=>{removePost(element.id)}} id={element.id} addTextTab={addTextTab} removeTab={removeTab}/>
        )
    })

    const length = posts.length + 1;
    console.log(length)

    return (
        <>
            <div className={classes.Button} onClick={()=>{swapActive(-1)}}/>
            <div className={classes.Button + " " + classes.right} onClick={()=>{swapActive(1)}}/>
            <div
                className={classes.PostsList}
                style={{
                    marginLeft: -active * 100 + "vw", width: length * 100 + "vw"
                }}>
                {posts}
                <PostCreator swapActive={swapActive} addPost={addPost}/>
            </div>
        </>
    );
}

export default PostsList;