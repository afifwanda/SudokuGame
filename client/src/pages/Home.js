import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getBoard} from '../store/action';
import '../App.css'

function Home(){
  const dispatch = useDispatch();
  const listBoard = useSelector(state=>state.reducer.board);
  useEffect(()=>{
    dispatch(getBoard())
  },[dispatch])

  console.log(listBoard)
  return(
    <div className="Body">
      <h1>Welcome to sudoku !</h1>
      <h2>Please choose the sudoku board</h2>
      <div className="CardContainer">
        {listBoard.map((element)=>{
          return <div className="card">{element.name}</div>
        })}
      </div>
    </div>
  )

}

export default Home