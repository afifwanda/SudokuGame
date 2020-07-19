import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import {getBoard} from '../store/action';
import '../App.css';

function Home(){
  const dispatch = useDispatch();
  const listBoard = useSelector(state=>state.reducer.board);
  useEffect(()=>{
    dispatch(getBoard())
  },[dispatch])
  
  return(
    <div className="Body">
      <h1>Welcome to sudoku !</h1>
      <h2>Please choose the sudoku board</h2>
      <div className="CardContainer">
        {listBoard.map((element)=>{
          return <Link to={`/game/${element.id}`}> 
          <div className="Card">{element.name}</div>
          </Link>
        })}
      </div>
      <div className="AddButton">Add Board</div>
    </div>
  )

}

export default Home