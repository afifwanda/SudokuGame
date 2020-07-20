import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {swal} from 'sweetalert'
import '../App.css';

function AddBoard(){
	const [initialBoard,setInitialBoard] = useState([[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]])
	const [board,setBoardChanged] = useState([[]])
	const [name,setName] = useState("")
	const [alert,setAlert] = useState(false)

	function handleChange(num,row,colindex){
		let solving = initialBoard;
		solving[row][colindex]=Number(num)
		setBoardChanged(solving)
		console.log(board)
	}

	const onAlert = (e) =>{
		e.preventDefault();
		setAlert(false)
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
			console.log('success!', data);
			setAlert(true);
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	return(
		<>
			<div className="Body">
				{
					alert ? <div class="alert alert-success d-flex row justify-content-around" role="alert">
				  	<p onClick={onAlert}>Board successfully added! click to close alert</p>
					</div> : <></>
				}
				<h2>Add Board</h2>
				<div className="ButtonArea">
					<div className="TextBox"><p>Board Name :</p></div>
					<input type="text" name="name" className="ValidationBox" onChange={(e)=>setName(e.target.value)} required></input>
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
					<button className="Button mr-4" onClick={onSubmit}>Add Board</button>
					<Link to={"/"}><button className="Button Yellow">Back Home</button></Link>
				</div>
			</div>
		</>
	)
}

export default AddBoard