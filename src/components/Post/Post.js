import React from 'react';
import classes from "./Post.module.scss"
import TabCreator from "./TabCreator/TabCreator";
import Tab from "./Tab/Tab";

const Post = ({title, tabs, removePost, id, addTextTab, removeTab}) => {

    tabs = tabs.map((element, index) => {
        return (
            <Tab key={element.id} data={element.data} type={element.type} id={element.id} removeTab={removeTab}/>
        )
    })

    return (
        <div className={classes.PostWrap}>
            <div className={classes.Post}>
                <div className={classes.Title}>
                    {title}
                </div>
                {tabs}
                <TabCreator post_id={id} addTextTab={addTextTab}/>
                <div className={classes.Remove} onClick={removePost}>Remove</div>
            </div>
        </div>
    );
};

export default Post;