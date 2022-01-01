import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

function App() {
	const [ state, setState ] = useState({ message: '', name: '' });
	const [ chat, setChat ] = useState([]);

	const socketRef = useRef();

	const roomjoin = (roomName, userName) => {
		console.log(roomName+ ' ' + userName);
		socketRef.current.emit('room_join', {roomName, userName});
	};
	

	useEffect(
		() => {
			socketRef.current = io.connect('http://localhost:4000');
			socketRef.current.on('message', ({ name, message }) => {
				setChat([ ...chat, { name, message } ]);
			});
			socketRef.current.on('user_join', function(data) {
				setChat([ ...chat, { name: 'ChatBot', message: `${data} has joined the chat` } ]);
			});
			// socketRef.current.on('user_leave', function(data) {
			// 	console.log('data', data);
			// 	//setChat([ ...chat, { name: 'ChatBot', message: data } ]);
			// });
			return () => {
				socketRef.current.disconnect();
			};
		},
		[ chat ]
	);
	const userjoin = (name) => {
		socketRef.current.emit('user_join', name);
	};

	const onSubmit = (e) => {
		console.log(document.getElementById('username_input').value);
		console.log(document.getElementById('room-selector').value);
		console.log(document.getElementById('roomMessage').value);
		e.preventDefault();
		setState({ name: document.getElementById('username_input').value });
		userjoin(document.getElementById('username_input').value);
		setRoom({name: document.getElementById('username_input').value, message: document.getElementById('roomMessage').value, roomName: document.getElementById('room-selector').value});
		roomjoin(document.getElementById('room-selector').value, document.getElementById('username_input').value, document.getElementById('roomMessage').value);
		// userName.value = '';
	}

	// submit message to chat room
	const onMessageSubmit = (e) => {
		let msgEle = document.getElementById('message');
		console.log([ msgEle.name ], msgEle.value);
		setState({ ...state, [msgEle.name]: msgEle.value });
		socketRef.current.emit('message', { name: state.name, message: msgEle.value });
		e.preventDefault();
		setState({ message: '', name: state.name });
		msgEle.value = '';
		msgEle.focus();
		
	};


	// chat message UI
	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		));
	};


	return (
		<div>
			{state.name && (
				<div className='card'>
					<div className='render-chat'>
						<h1>Chat Log</h1>
						{renderChat()}
					</div>
					
					<form onSubmit={onMessageSubmit}>
						<h1>Messenger</h1>
						<div>
							<input name='message' id='message' variant='outlined' label='Message' />
						</div>
						<button>Send Message</button>
					</form>	
				</div>
			)}


			{!state.name && (
				<form
					className='form'
					onSubmit={(e) => {
						console.log(document.getElementById('username_input').value);
						e.preventDefault();
						setState({ name: document.getElementById('username_input').value });
						userjoin(document.getElementById('username_input').value);
						// userName.value = '';
					}}
				>
					<div className='form-group'>
						<label>
							User Name:
							<br />
							<input id='username_input' />
						</label>
					</div>
					<br />

					<form action="">
						<select id="room-selector">
							<option value="room1">Room 1</option>
							<option value="room2">Room 2</option>
							<option value="room3">Room 3</option>
						</select>
						{/* <button type='submit'> Click to join</button> */}
						{/* <input id="m" autocomplete="off" /><button>Send</button> */}
					</form>

					<br />
					<br />
					<button type='submit'> Click to join</button>
				</form>
			)}
			
		</div>
	);
}

export default App;
