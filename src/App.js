import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import PostsList from "./components/PostsList/PostsList";
import Header from "./components/Header/Header";

function App() {

    const [state, setState] = useState({
        posts: [],
        tabs: [],
        active: 0
    })

    const getData = useCallback(async () => {
        let request = `http://timewars.online:4000/getposts`;
        const posts = (await axios.get(request)).data;
        let tabs = []
        try {
            request = `http://timewars.online:4000/getpost?id=${posts[state.active].id}`;
            tabs = (await axios.get(request)).data;
        }catch (e){}

        setState((prev) => {
            return {
                ...prev,
                posts: posts,
                tabs: tabs
            }
        })
    }, [state.active])

    useEffect(() => {
        getData()
    }, [getData]);

    const swapActive = useCallback((amount) => {
        setState((prev) => {
            if (prev.active + amount >= 0) {
                return {
                    ...prev,
                    active: prev.active + amount
                }
            } else {
                return {
                    ...prev,
                    active: 0
                }
            }
        })
    },[])

    const addPost = useCallback(async (title)=>{
        const response = await axios.post("http://timewars.online:4000/addpost",{
            title
        });
        getData();
        return response
    },[swapActive])

    const removePost = useCallback(async (id)=>{
        const response = await axios.post("http://timewars.online:4000/removepost",{
            id
        });
        getData()
        return response
    },[swapActive])

    const addTextTab = useCallback(async (post_id, text)=>{
        const response = await axios.post("http://timewars.online:4000/addtexttab",{
            post_id,
            text
        });
        getData();
        return response
    },[getData])

    const removeTab = useCallback( async (id) => {
        const response = await axios.post("http://timewars.online:4000/removetab",{
            id
        });
        getData();
        return response
    },[])


    return (
        <div className="App">
            <Header/>
            <PostsList
                posts={state.posts}
                active={state.active}
                swapActive={swapActive}
                addPost={addPost}
                tabs={state.tabs}
                removePost={removePost}
                addTextTab={addTextTab}
                removeTab={removeTab}
            />
        </div>
    );
}

export default App;
