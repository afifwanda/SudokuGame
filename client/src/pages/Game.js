import React, {useEffect,useState, useCallback} from 'react';
import {Link,useParams} from 'react-router-dom';
import '../App.css';

function Game(){
	const selectedBoard = useParams();
	const [initialBoard,setInitialBoard] = useState([])
	const [board,setBoardChanged] = useState([[]])
	const [status,setStatus] = useState('unsolved')


	const fetchData = useCallback(async ()=>{
		try{
		const result = await fetch(
			`http://localhost:3001/listBoard?id=${selectedBoard.id}`
		);
		const number = await result.json()
		setInitialBoard(number[0].board)
		} 
		catch(err){
			console.log(err)
		}
	},[])

	useEffect(() =>{
		fetchData();
	},[]) 

	function handleChange(num,row,colindex){
		let solving = initialBoard;
		solving[row][colindex]=Number(num)
		setBoardChanged(solving)
		console.log(board)
	}

	function clear(){
		window.location.reload()
	}

	const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
  
	const encodeParams = (params) => 
	Object.keys(params)
	.map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
	.join('&');

	const validation = useCallback(async()=>{
		const solvedData = {board}
		try{
				const result = await fetch('https://sugoku.herokuapp.com/validate', {
				method: 'POST',
				body: encodeParams(solvedData),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				const final = await result.json()
				setStatus(final.status)
				console.log(solvedData)
				console.log(final)
		}
		catch(err){
			console.log(err)
		}

	})

	const solve = useCallback(async()=>{
		const solvedData = {board}
		try{
				const result = await fetch('https://sugoku.herokuapp.com/solve', {
				method: 'POST',
				body: encodeParams(solvedData),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				const final = await result.json()
				console.log(final)
				setInitialBoard(final.solution)
				setStatus(final.status)
				setBoardChanged(final.solution)
		}
		catch(err){
			console.log(err)
		}

	}) 

	return(
		<div className="Body">
			<h2>Play Now !</h2>
			<div className="ButtonArea">
				<button className="Button mr-2" onClick={()=>solve()}>Solve</button>
				<button className="Button mr-2 Yellow" onClick={()=>clear()}>Clear</button>
				<div className="Validate">
					<button className="Button" onClick={()=>validation()}>Validate</button>
					<input type="text" className="ValidationBox ml-2" value={status}></input>
				</div>
			</div>
			<div className="Board">
				{initialBoard.map((row,rowindex)=>{
					return row.map((col,colindex)=>{
						return <input type="text" 
						name="" 
						className="BoardInput" 
						placeholder={row[colindex] == 0? " ":row[colindex]}
						disabled={row[colindex] != 0? true:false}
						maxLength = {1}
						onChange={(e) => handleChange(e.target.value,Number(rowindex),Number(colindex))}
						/>
					})
				})

				}
			</div>
			<div className="ButtonArea">
				<Link to={"/"}><button className="Button Yellow">Back Home</button></Link>
			</div>
		</div>
	)

}

export default Game