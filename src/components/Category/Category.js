import React from 'react';
import classes from "./Category.module.scss";

const Category = ({title, id, openCategory}) => {
    return (
        <div className={classes.Category} onClick={()=>{openCategory(id)}}>
            {title}
        </div>
    );
};

export default Category;