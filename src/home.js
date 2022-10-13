import React, { useState, useEffect } from "react";

const Home = ()=> {
    const [name, setName] = useState("");
    const [toggle, setToggle] = useState(true);
    const [list, setList] = useState([]);

    let completeList = [];

    const handleSubmit = (e)=> {
        e.preventDefault();
        const newName = {id: new Date().getTime().toString(), title: name};
        setList([...list, newName]);
        setName("");
    }

    const removeTodo = (id) => {
        const newList = list.filter((item)=> item.id !== id);
        setList(newList);
    }

    const complete = (e)=> {
        const select = e.currentTarget.parentElement;
        select.classList.add("active");

        const newList = {id: new Date().getTime().toString(), title: e.currentTarget.parentElement.textContent};
        
        completeList.push(newList);
    }

    const displayCompleted = ()=> {
        if (completeList.length > 0) {
            
        }
    }

    const displayActive = ()=> {
        if (completeList.length > 0) {
            
        } 
    }

    const clearCompleted = ()=> {
        if (completeList.length > 0) {
           
        }
    }

    useEffect(()=>{
        const selectors = document.querySelectorAll("#selectors");

        selectors.forEach((selector)=>{
            selector.addEventListener("click", (e)=>{
                let currentItem = e.currentTarget;

                selectors.forEach((item)=>{
                    if (currentItem === item) {
                        item.classList.add("color");
                    } else {
                        item.classList.remove("color");
                    }
                })
            });
        });
    },[list]);

    useEffect(()=>{
        {toggle ? document.body.style.backgroundColor = "hsl(235, 21%, 11%)" : 
            document.body.style.backgroundColor = "hsl(0, 0%, 98%)"
        }
    },[toggle]);

    return(
        <main className={`${toggle ? "dark" : "light"}`} style={{ 
            backgroundImage: `${toggle ? 
                `url(${process.env.PUBLIC_URL + '/images/bg-desktop-dark.jpg'})` :
                `url(${process.env.PUBLIC_URL + '/images/bg-desktop-light.jpg'})`
            }`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "50vh",
            }}>
            <section>
                <article className="text">
                    <h1>TODO</h1> 

                    <span onClick={()=>setToggle(!toggle)}>
                        {toggle ? 
                            <img  src="/images/icon-sun.svg" /> :
                            <img src="/images/icon-moon.svg" />
                        }
                    </span>
                </article>
            
            
                <form onSubmit={handleSubmit}>
                    <div className="circle"></div>
                    <input type="text"
                        value={name} 
                        placeholder="Create a new todo..."
                        onChange={(e)=>setName(e.target.value)} 
                    />
                </form>

                <article className="form-list" style={{ display: list.length===0 ? "none": "block" }}>
                    {list.map((item)=>{
                        const { id, title } = item;
                        return(
                            <React.Fragment key={id}>
                                <div className="list">
                                    <input type="radio" onClick={complete} /> {title} 

                                    <img src="/images/icon-cross.svg" onClick={()=>removeTodo(id)} />
                                </div><hr />
                            </React.Fragment>
                        );
                    })}

                    <div className="end">
                        <p>{list.length} items left</p>
                        <p className="color all" id="selectors">All</p>
                        <p onClick={displayActive} id="selectors">Active</p>
                        <p onClick={displayCompleted} id="selectors">Completed</p>
                        <p onClick={clearCompleted} id="selectors">Clear Completed</p>
                    </div>
                </article>

                <div className="sm-screen" style={{ display: list.length===0 ? "none": "flex" }}>
                    <p className="all" id="selectors">All</p>
                    <p onClick={displayActive} id="selectors">Active</p>
                    <p onClick={displayCompleted} id="selectors">Completed</p>
                </div>
                    
                <p className="para">
                    Drag and drop to reorder list
                </p>

            </section>
        </main>
    );
}

export default Home;