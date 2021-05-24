import React from 'react';
import classes from "./MiniPost.module.scss";

const MiniPost = ({title, removePost, id, selectPost}) => {
    return (
        <div className={classes.MiniPost}>
            <div className={classes.Text} onClick={()=>{selectPost(id, title)}}>
                {title}
            </div>
            <div className={classes.Remove} onClick={()=>{removePost(id)}}>Remove</div>
        </div>
    );
};

export default MiniPost;