import React from 'react';
import classes from "./Category.module.scss";

const Category = ({title, id, removeCategory, selectCategory}) => {
    return (
        <div className={classes.Category}>
            <div className={classes.Text} onClick={()=>{selectCategory(id, title)}}>
                {title}
            </div>
            <div className={classes.Remove} onClick={()=>{removeCategory(id)}}>Remove</div>
        </div>
    );
};

export default Category;