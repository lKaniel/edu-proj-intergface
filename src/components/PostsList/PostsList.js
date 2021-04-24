import React, {useState} from 'react';
import classes from "./PostsList.module.scss";

const PostsList = ({posts, active}) => {


    return (
        <div className={classes.PostsList} style={{marginLeft: active * 100 + "vw"}}>

        </div>
    );
};

export default PostsList;