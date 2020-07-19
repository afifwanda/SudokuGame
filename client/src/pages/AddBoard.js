import React, {useEffect,useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

function AddBoard(){
	const [initialBoard,setInitialBoard] = useState([[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]])
	const [board,setBoardChanged] = useState([[]])
	const [name,setName] = useState("")

	function handleChange(num,row,colindex){
		let solving = initialBoard;
		solving[row][colindex]=Number(num)
		setBoardChanged(solving)
		console.log(board)
	}

	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			name: name,
			board : board
		}
		console.log(data)
		fetch('http://localhost:3001/listBoard',{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify(data)
		})
		.then((response)=>response.json())
		.then((data)=>{
			console.log('success!', data)
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	return(
		<div className="Body">
			<h3>Add Board</h3>
			<div className="NameArea d-flex row">
				<p>Board Name :</p>
				<input type="text" name="name" onChange={(e)=>setName(e.target.value)}></input>
			</div>
			<div className="Board">
				{initialBoard.map((row,rowindex)=>{
					return row.map((col,colindex)=>{
						return <input type="text" 
						name="board" 
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
				<button className="Button" onClick={onSubmit}>Add Board</button>
			</div>
		</div>
	)
}

export default AddBoard