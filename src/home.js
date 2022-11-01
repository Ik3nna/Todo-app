import React, { useState, useEffect } from "react";

const getLocalStorage = ()=> {
    let list = localStorage.getItem("list");
  
    if(list) {
      return JSON.parse(list);
    }
    else {
      return []
    }
}

const Home = ()=> {
    const [name, setName] = useState("");
    const [toggle, setToggle] = useState(true);

    const [list, setList] = useState([getLocalStorage()]);
    const [completeList, setCompleteList] = useState([]);
    const [activeList, setActiveList] = useState([getLocalStorage()]);
    const [displayActive, setDisplayActive] = useState(false);
    const [displayCompleted, setDisplayCompleted] = useState(false);
    const [check, setCheck] = useState(false);
    
    const handleSubmit = (e)=> {
        e.preventDefault();
        const newName = {id: new Date().getTime().toString(), title: name, completed: false};
        
        if (newName.title === "") {
            setList([]);
        } else {
            setList([...list, newName]);
            setName("");
        }
    }

    const removeTodo = (id) => {
        const newList = list.filter((item)=> item.id !== id);
        setList(newList);
    }

    const handleComplete = (e)=> {
        const select = e.currentTarget.parentElement;
        select.classList.add("active");
        
        list.map((item)=>{
            if (item.title === select.textContent) {
                let x = {...item, completed: item.completed = true}
                return x;
            }
            return item
        });

        setCompleteList(list.filter((item)=>
            item.completed === true
        ));

        setDisplayActive(false)
    }

    const showAll = ()=> {
        setActiveList(list);
        setDisplayCompleted(false);
        setDisplayActive(true);
    }

    const showActive = ()=> {
        let filteredList = list.filter((item)=>
            item.completed === false
        )
        setDisplayCompleted(false);
        setActiveList(filteredList);
        setDisplayActive(true);
        setCompleteList([]);
    }

    const showCompleted = ()=> {
        let filteredList = list.filter((item)=>
            item.completed === true
        );
        setDisplayCompleted(true);
        setCompleteList(filteredList);
        setDisplayActive(false);
        setActiveList(list);
        setCheck(true);
    }

    const clearCompleted = ()=> {
        let filteredList = list.filter((item)=>
            item.completed === false
        );
        setList(filteredList);
        setActiveList(filteredList);
        setDisplayActive(true);
        setCompleteList([]);
        setDisplayCompleted(false);
    }

    useEffect(()=>{
        localStorage.setItem("list",JSON.stringify(list));

        setActiveList(list)

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
        toggle ? document.body.style.backgroundColor = "hsl(235, 21%, 11%)" : 
        document.body.style.backgroundColor = "hsl(0, 0%, 98%)"
        
    },[toggle]);

    useEffect(()=>{
        const checked = document.querySelectorAll("#checkbox");
        checked.forEach((item)=>
            item.checked = true
        );
    },[check])

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
                            <img  src="/images/icon-sun.svg" alt="icon-sun" /> :
                            <img src="/images/icon-moon.svg" alt="icon-moon" />
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
                    {(displayCompleted ? completeList : activeList).map((item)=>{
                        const { id, title } = item;
                        return(
                            <React.Fragment key={id}>
                                <div className="list">
                                    <input type="checkbox" id="checkbox" onClick={handleComplete} />{title} 

                                    <img src="/images/icon-cross.svg" alt="icon-cross" onClick={()=>removeTodo(id)} />
                                </div><hr />
                            </React.Fragment>
                        );
                    })}

                    <div className="end">
                        <p>{completeList.length === 0 ? activeList.length : (activeList.length - completeList.length)} items left</p>
                        <p onClick={showAll} className="color all" id="selectors">All</p>
                        <p onClick={showActive} id="selectors">Active</p>
                        <p onClick={showCompleted} id="selectors">Completed</p>
                        <p onClick={clearCompleted} id="selectors">Clear Completed</p>
                    </div>
                </article>

                <div className="sm-screen" style={{ display: list.length===0 ? "none": "flex" }}>
                    <p onClick={showAll} className="color all" id="selectors">All</p>
                    <p onClick={showActive} id="selectors">Active</p>
                    <p onClick={showCompleted} id="selectors">Completed</p>
                </div>
                    
            </section>
        </main>
    );
}

export default Home;
